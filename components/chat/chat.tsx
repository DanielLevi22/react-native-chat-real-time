import React, { useEffect, useRef } from 'react';
import { KeyboardAvoidingView, View, FlatList, StyleSheet, Platform } from 'react-native';
import { Message } from '../message/message';

interface ChatProps {
  messages: { sender: 'Desktop' | 'Mobile'; message: string }[];
}

export function Chat({ messages}: ChatProps) {
  const flatListRef = useRef<FlatList>(null);

  useEffect(() => {
    if (flatListRef.current) {
      flatListRef.current.scrollToEnd({ animated: true });
    }
  }, [messages]);

  return (
    <KeyboardAvoidingView
    style={{ flex: 1 }}
    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    keyboardVerticalOffset={Platform.OS === 'android' ? 80 : 0}

    >
      <View style={styles.container}>
        <FlatList
          ref={flatListRef}
          data={messages}
          renderItem={({ item }) => <Message author={item.sender} message={item.message} />}
          keyExtractor={(item, index) => index.toString()}
          style={styles.messageList}
          contentContainerStyle={styles.messageListContent}
        />


      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
    justifyContent: 'flex-end',
  },
  messageList: {
    flex: 1,
  },
  messageListContent: {
    paddingBottom: 30,
    paddingHorizontal: 12,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
});
