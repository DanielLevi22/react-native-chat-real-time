import React from 'react';
import { useRef } from 'react';
import { KeyboardAvoidingView, View, FlatList, StyleSheet } from 'react-native';
import { InputMessage } from '../input-message/input-message';
import { Message } from '../messsage/message';

interface ChatProps {
  messages: { sender: 'Desktop' | 'Mobile'; message: string }[];
  onSendMessage: () => void;
  inputMessage: string;
  setInputMessage: React.Dispatch<React.SetStateAction<string>>;
}
export function Chat({ messages, onSendMessage, inputMessage, setInputMessage }: ChatProps) {
  const flatListRef = useRef<FlatList>(null);

  return (
    <KeyboardAvoidingView style={{ flex: 1 }}>
      <View style={styles.container}>
        <FlatList
          ref={flatListRef}
          data={messages}
          renderItem={({ item }) => <Message author={item.sender} message={item.message} />}
          keyExtractor={(item, index) => index.toString()}
          style={styles.messageList}
          contentContainerStyle={styles.messageListContent}
        />
        <InputMessage
          onSendMessage={onSendMessage}
          inputMessage={inputMessage}
          setInputMessage={setInputMessage}
        />
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
  },
  messageList: {
    flex: 1,
  },
  messageListContent: {
    paddingBottom: 50,
    paddingHorizontal: 10,
  },

});
