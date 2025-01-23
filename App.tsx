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

interface Message {
  id: number;
  sender: 'Desktop' | 'Mobile';
  message: string;
}

function App(): React.JSX.Element {
  const [inputMessage, setInputMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const isDarkMode = useColorScheme() === 'dark';

  const ws = useRef<WebSocket | null>(null);

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    flex: 1,
  };


  function handleSendMessage() {
    const data = {
      type: 'sendMessage',
      messageData: {
        sender: 'Mobile',
        message: inputMessage,
      },
    };

    if (ws.current && ws.current.readyState === WebSocket.OPEN) {
      ws.current.send(JSON.stringify(data));
      setInputMessage('');
    } else {
      console.error('WebSocket não está pronto para enviar mensagens.');
    }
  }

  useEffect(() => {
    ws.current = new WebSocket('ws://localhost:3000');
    // ws.current = new WebSocket('ws://10.0.2.2:3000');

    ws.current.onopen = () => {
      console.log('WebSocket está aberto e pronto para comunicação.');
      // Solicita mensagens ao conectar
      ws.current?.send(JSON.stringify({ type: 'fetchMessages' }));
    };

    ws.current.onmessage = (event) => {
      try {
        console.log('Mensagem recebida do servidor:', event.data);
        const data = JSON.parse(event.data);

        if (data.type === 'allMessages') {
          // Atualiza o histórico de mensagens
          setMessages(data.messages);
        } else if (data.type === 'newMessage') {
          // Adiciona nova mensagem recebida
          setMessages((prevMessages) => [...prevMessages, data.responseData]);
        } else if (data.type === 'error') {
          console.error('Erro recebido do servidor:', data.message);
        } else {
          console.warn('Tipo de mensagem desconhecido:', data.type);
        }
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
