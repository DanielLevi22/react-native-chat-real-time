import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Color } from '../../styles/global';



interface ButtonProps {
  onSendMessage: () => void;
}
export function Button( { onSendMessage}: ButtonProps) {
  return (
    <TouchableOpacity style={styles.button} onPress={onSendMessage}>
        <Text style={styles.buttonText}>Enviar</Text>
    </TouchableOpacity>
  );
}



const styles = StyleSheet.create({
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
    textAlign: 'center',
  },
});
