import React, { useEffect, useState, useRef } from 'react';
import {
  Alert,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  useColorScheme,
} from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { Color } from './styles/global';
import { Chat } from './components/chat/chat';
import { InputText } from './components/input-text/input-message';
import { Button } from './components/button/button';

interface Message {
  id: number;
  sender: 'Desktop' | 'Mobile';
  message: string;
}

function App(): React.JSX.Element {
  const [inputMessage, setInputMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isConnected, setIsConnected] = useState(false);
  const [inputIpText, setInputIpText] = useState('');
  const isDarkMode = useColorScheme() === 'dark';

  const ws = useRef<WebSocket | null>(null);

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    flex: 1,
  };

  const connectWebSocket = (ip: string) => {
    ws.current = new WebSocket(`ws://${ip}:3000`);

    ws.current.onopen = () => {
      console.log('WebSocket conectado.');
      setIsConnected(true);
      ws.current?.send(JSON.stringify({ type: 'fetchMessages' }));
    };

    ws.current.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        if (data.type === 'allMessages') {
          setMessages(data.messages);
        } else if (data.type === 'newMessage') {
          setMessages((prevMessages) => [...prevMessages, data.responseData]);
        }
      } catch (error) {
        console.error('Erro ao processar mensagem:', error);
      }
    };

    ws.current.onerror = (error: any) => {
      console.error('Erro no WebSocket:', error);
      setIsConnected(false);
    };

    ws.current.onclose = () => {
      console.log('WebSocket desconectado.');
      setIsConnected(false);
    };
  };

  function handleSendIpChange() {
    const ipRegex = /^(25[0-5]|2[0-4][0-9]|[0-1]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[0-1]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[0-1]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[0-1]?[0-9][0-9]?)$/;

    try {
      if (ipRegex.test(inputIpText)) {
        connectWebSocket(inputIpText);
        setInputIpText('');
      } else {
        throw new Error('IP inválido');
      }
    } catch (error) {
     return Alert.alert('Erro', 'Não foi possível conectar ao servidor. Tente novamente.');
    }
  }

  function handleSendMessage() {
    if (inputMessage.trim() === '') {
      Alert.alert('Mensagem vazia', 'Digite uma mensagem antes de enviar.');
      return;
    }

    const data = {
      type: 'sendMessage',
      messageData: {
        sender: 'Mobile',
        message: inputMessage,
      },
    };

    if (ws.current && ws.current.readyState === WebSocket.OPEN) {
      ws.current.send(JSON.stringify(data));
      setInputMessage(''); // Limpar o campo de mensagem após enviar
    } else {
      Alert.alert('WebSocket não está conectado.');
    }
  }

  useEffect(() => {
    return () => {
      ws.current?.close();
    };
  }, []);

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <View style={styles.container}>
        <View style={styles.inputContainer}>
          {!isConnected ? (
            <View style={styles.serverContainer}>
              <Text style={styles.statusText}>Desconectado do servidor</Text>
              <Text style={styles.description}>Digite o IP da Máquina do Servidor</Text>

              <View style={styles.inputContainerServe}>
                <InputText
                  inputText={inputIpText}
                  setInputText={setInputIpText}
                  placeholder="xxx.xxx.xxx.xx"
                />
                <Button onSendMessage={handleSendIpChange} />
              </View>
            </View>
          ) : (
            <>
              <Text style={styles.TitleText}>Chat em Tempo Real</Text>
              <View style={styles.chatContainer}>
                <Chat messages={messages} />
              </View>

              <View style={styles.inputContainerServe}>
                <InputText
                  inputText={inputMessage}
                  setInputText={setInputMessage}
                  placeholder="Digite sua mensagem"
                />
                <Button onSendMessage={handleSendMessage} />
              </View>
            </>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.white,
  },
  inputContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  input: {
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 8,
    padding: 16,
    marginVertical: 10,
  },
  chatContainer: {
    flex: 1,
    marginVertical: 20,
  },
  message: {
    fontSize: 16,
    marginVertical: 4,
  },
  statusText: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 600,
    marginVertical: 10,
  },
  serverContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  TitleText: {
    textAlign: 'center',
    fontSize: 24,
    marginVertical: 10,
    fontWeight: 'bold',
    color: Color.black,
  },
  description: {
    fontSize: 18,
    textAlign: 'center',
    marginVertical: 10,
  },
  buttonContainer: {
    marginVertical: 10,
  },
  inputContainerServe: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
});

export default App;
