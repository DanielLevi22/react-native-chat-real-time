import React from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Color } from '../../styles/global';

interface InputMessageProps {
  onSendMessage: () => void;
  inputMessage: string;
  setInputMessage: React.Dispatch<React.SetStateAction<string>>;
}

export function InputMessage({ onSendMessage, inputMessage, setInputMessage }: InputMessageProps) {
  return (
    <View style={styles.container}>
      <TextInput style={styles.input} placeholder="Digite uma mensagem" value={inputMessage} onChangeText={setInputMessage} />
      <TouchableOpacity style={styles.button} onPress={onSendMessage}>
        <Text style={styles.buttonText}>Enviar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 4,
    marginRight: 10,
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: Color.black,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 4,

  },
  buttonText: {
    color: Color.white,
    fontWeight: 'semibold',
    fontSize: 16,
  },
});
