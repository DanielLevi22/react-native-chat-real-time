import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';

interface MessageProps {
  author: 'Desktop' | 'Mobile';
  message: string;
}

export function Message({ author, message }: MessageProps) {
  return (
    <View style={author === 'Desktop' ? styles.Desktop : styles.Mobile}>
      <Text style={styles.messageText}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  Desktop: {
    backgroundColor: '#f9e4cb',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-start',
    borderRadius: 8,
    marginVertical: 8,
    maxWidth: 300,
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  Mobile: {
    backgroundColor: '#f2f2f2',
    alignItems: 'center',
    alignSelf: 'flex-end',
    borderRadius: 8,
    marginVertical: 8,
    maxWidth: 300,
    paddingVertical: 8,
    paddingHorizontal: 12,
  },

  messageText: {
    color: Colors.textPrimary,
    fontSize: 16,
  },
});
