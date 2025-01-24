# Instruções para Baixar e Instalar o Projeto React Native
Abaixo estão os passos para baixar e configurar o projeto React Native em sua máquina. Além disso, também será explicado como baixar e instalar o build do projeto para testes.
## 1. Clonar o Repositório
O primeiro passo é clonar o repositório do projeto. Para isso, siga os passos abaixo:
1. **Abra o terminal** ou o **prompt de comando** em sua máquina.
2. **Clone o repositório** utilizando o comando Git:

   ```bash
   git clone https://github.com/DanielLevi22/react-native-chat-real-time
   ```
3. Acesse o diretório do projeto clonado:

   ```bash
   cd react-native-chat-real-time
   ```
## 2. Instalar Dependências
Após clonar o repositório, o próximo passo é instalar todas as dependências do projeto. Para isso, execute o seguinte comando:
```bash
npm install
```
Isso instalará todas as bibliotecas e pacotes necessários para o funcionamento do aplicativo.
## 3. Configurar o Ambiente de Desenvolvimento
Antes de rodar o aplicativo, você precisa configurar o ambiente de desenvolvimento para React Native. Abaixo estão as instruções para configurar o ambiente em **Windows**, **macOS** e **Linux**.
### Windows
1. Baixe e instale o **Node.js** a partir do site oficial: [https://nodejs.org](https://nodejs.org).
2. Instale o **Android Studio** para configurar o emulador Android. Durante a instalação, selecione a opção para instalar o **Android SDK**.
3. Defina as variáveis de ambiente necessárias (como o caminho para o SDK do Android) conforme as instruções da [documentação oficial do React Native](https://reactnative.dev/docs/environment-setup).
### macOS
1. Baixe e instale o **Node.js** a partir do site oficial: [https://nodejs.org](https://nodejs.org).
2. Instale o **Xcode** a partir da **App Store**.
3. Instale o **Android Studio** para configurar o emulador Android, caso queira testar no Android.
4. Configure as variáveis de ambiente conforme a documentação do [React Native para macOS](https://reactnative.dev/docs/environment-setup).
### Linux
1. Baixe e instale o **Node.js**:

   ```bash
   sudo apt update
   sudo apt install nodejs
   sudo apt install npm
   ```
2. Instale o **Android Studio** e configure o ambiente conforme as instruções da [documentação do React Native](https://reactnative.dev/docs/environment-setup).
## 4. Rodar o Aplicativo no Emulador ou Dispositivo
Agora que o ambiente está configurado, você pode rodar o aplicativo no **emulador Android** ou em um **dispositivo físico**.
### Para Android:
Se você tiver o **Android Studio** instalado, execute o seguinte comando para iniciar o aplicativo:
```bash
npx react-native run-android
```
Isso irá compilar o projeto e abrir o aplicativo no emulador Android ou dispositivo conectado via USB.
### Para iOS (se estiver usando macOS):
Se você estiver usando um Mac e deseja rodar no iOS, execute:
```bash
npx react-native run-ios
```
Isso abrirá o aplicativo no simulador iOS.
## 5. Baixar o Build do Projeto
Caso prefira testar o aplicativo diretamente sem compilar o código, você pode baixar os builds prontos para **Android (APK)** ou **Desktop (EXE)**:
- **Android (APK)**: O arquivo APK estará disponível no link do drive abaixo.
- **Desktop (EXE)**: O arquivo EXE estará disponível para Windows disponível no link do drive abaixo ou no repositorio oficial em releases. 
- **Desktop (EXE)**: O arquivo AppImage estará disponível para Linux disponível no link do drive abaixo ou no repositorio oficial em releases.   

**Link para os builds:**
  [Google Drive Builds](https://drive.google.com/drive/folders/1TenJtWgueqIFJopleKt_CK4dEgP3dB9w?usp=sharing)



# Instruções de Uso Conectar ao Servidor 

No fluxo anterior, para conectar o aplicativo Mobile ao servidor WebSocket, você precisaria do IP da máquina central (que executa o servidor WebSocket). Agora, foi adicionado um campo de entrada no aplicativo Mobile que permite ao usuário inserir o IP da máquina central manualmente.

## Passos para Conectar:

### 1.1. Abrir o Aplicativo Mobile

- Inicie o aplicativo Mobile (React Native) no dispositivo ou emulador.

### 1.2. Inserir o IP da Máquina Central

- Na tela inicial do aplicativo, há um campo de entrada onde você deve inserir o **IP da máquina central** (onde o servidor WebSocket está rodando).
- Se estiver usando a rede local, é necessário inserir o **IP local** da máquina que está rodando o servidor.
- O formato do IP deve ser algo como `192.168.0.X`, dependendo da sua rede local.

### 1.3. Descobrir o IP da Máquina Central

Dependendo do sistema operacional onde o servidor WebSocket (aplicativo Desktop) está sendo executado, siga as instruções abaixo para encontrar o **IP local** da máquina:

#### Windows

1. Abra o **Prompt de Comando** (pressione `Windows + R`, digite `cmd` e pressione Enter).
2. No prompt de comando, digite o comando abaixo:

   ```bash
   ipconfig
   ```

#### Linux
> 
1. Abra o **Terminal**.
2. Digite o seguinte comando:

   ```bash
   ifconfig
    ```
 
3. Encontre a interface de rede ativa (geralmente `eth0` ou `wlan0` para conexões com fio ou sem fio) e procure o valor de **inet**. Este será o IP da sua máquina local, por exemplo, `192.168.x.x`.
 
    Caso o comando `ifconfig` não funcione, você pode tentar o comando `ip a`:

    ```bash
    ip a
   ```
 
    Na saída, procure o endereço IP na interface de rede ativa.
 
 #### macOS
 
 1. Abra o **Terminal**.
 2. Digite o comando abaixo:

   ```bash
   ifconfig
   ```
 
3. Encontre a interface ativa (geralmente `en0` para Ethernet ou `en1` para Wi-Fi) e procure pelo campo **inet**. Esse será o seu IP local, por exemplo, `192.168.x.x`.
 
 ### 1.4. Conectar ao Servidor
 
 - Após descobrir o **IP da máquina central**, insira-o no campo de entrada no aplicativo Mobile.
- Após inserir o IP, clique no botão **"Conectar"**.
- O aplicativo tentará se conectar ao servidor WebSocket usando o IP informado.
- Se a conexão for bem-sucedida, você verá a interface de chat e poderá começar a enviar e receber mensagens em tempo real.


 
 ## Nota Importante

 Caso o aplicativo Mobile não consiga se conectar, siga os passos abaixo:

1. **Verifique o IP**: Certifique-se de que o IP inserido está correto. Se estiver usando um IP diferente (por exemplo, de uma rede externa), a conexão não será possível.
2. **Verifique a Rede Local**: O aplicativo Mobile deve estar na mesma rede local que o servidor. Ambos os dispositivos (desktop e mobile) devem estar conectados à mesma rede Wi-Fi ou via cabo de rede.
3. **Firewall ou Configuração de Rede**: Caso o IP esteja correto, verifique se há algum bloqueio de firewall ou configuração de rede impedindo a comunicação entre os dispositivos. Certifique-se de que o servidor WebSocket no Desktop está permitindo conexões na porta utilizada.
