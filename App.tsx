import React, { useEffect, useState, useRef } from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  useColorScheme,
} from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { Chat } from './components/chat/chat';
import { Color } from './styles/global';

function App(): React.JSX.Element {
  const [inputMessage, setInputMessage] = useState('');
  const [messages, setMessages] = useState<{ id: number; sender: 'Desktop' | 'Mobile'; message: string }[]>([]);
  const isDarkMode = useColorScheme() === 'dark';

  const ws = useRef<WebSocket | null>(null);

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    flex: 1,
  };

  function handleSendMessage() {
    const data = {
      sender: 'Mobile' as 'Desktop' | 'Mobile',
      message: inputMessage,
    };

    if (ws.current) {
      ws.current.send(JSON.stringify(data));
    }

    setInputMessage('');
  }

  useEffect(() => {
    ws.current = new WebSocket('ws://192.168.100.20:3000');

    ws.current.onopen = () => {
      console.log('WebSocket está aberto e pronto para comunicação.');
    };

    ws.current.onmessage = (event) => {
      try {
        console.log('Mensagem recebida do servidor:', event.data);
        const data = JSON.parse(event.data);
        console.log('Dados processados:', data);
        setMessages(prevMessages => [...prevMessages, data]);
      } catch (error) {
        console.error('Erro ao processar a mensagem recebida:', error);
      }
    };

    ws.current.onerror = (error) => {
      console.error('Erro no WebSocket:', error);
    };

    ws.current.onclose = () => {
      console.log('Conexão WebSocket fechada');
    };

    return () => {
      if (ws.current) {
        ws.current.close();
      }
    };
  }, []);

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <View style={styles.container}>
        <View style={styles.TitleContainer}>
          <Text style={styles.chatTitle}>Chat Real Time</Text>
        </View>
        <Chat
          onSendMessage={handleSendMessage}
          inputMessage={inputMessage}
          setInputMessage={setInputMessage}
          messages={messages}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.white,
  },
  TitleContainer: {
    paddingTop: 20,
  },
  chatTitle: {
    fontFamily: 'Roboto-Regular',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default App;
