import React from 'react';
import {  TextInput, StyleSheet } from 'react-native';

interface InputTextProps {

  inputText: string;
  setInputText: React.Dispatch<React.SetStateAction<string>>;
  placeholder: string
}

export function InputText({ inputText, setInputText, placeholder }: InputTextProps) {
  return (

      <TextInput style={styles.input} placeholder={placeholder} value={inputText} onChangeText={setInputText} />

  );
}

const styles = StyleSheet.create({
  input: {
    flex: 1,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 4,
    marginRight: 10,
    paddingHorizontal: 10,
  },

});
