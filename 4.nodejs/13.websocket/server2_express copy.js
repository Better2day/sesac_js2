const express = require('express');
const expressWs = require('express-ws');
const path = require('path');

const port = 3000;

const app = express();
expressWs(app);

// 나에게 접속하는 사용자를 관리할 자료구조
const wsClients = new Map();
// 예.  user1, 0x4842983479218734 (웹소켓 주소)
// 예.  user2, 0x4492376487234349 (웹소켓 주소)

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'chat_client.html'));
});

// 웹소켓을 처리하는 EP(Endpoint)
app.ws('/chat', (ws, req) => {
  const clientIp = req.socket.remoteAddress;
  console.log('Client: ', clientIp);

  ws.on('message', (message) => {
    const messageString = message.toString('utf8');
    console.log('받은 메시지: ', messageString);

    const parsedMessage = JSON.parse(messageString);
    // console.log(parsedMessage);
    const username = parsedMessage.username;
    const content = parsedMessage.content;

    if (username && !wsClients.has(username)) {
      wsClients.set(username, ws); // 새로운 사용자면 목록에 추가
      console.log(`새로운 사용자 접속: ${username}, ${ws}`);
    }

    // ws.send(messageString);
    if (parsedMessage.type !== 'session') {
      wsClients.forEach((client, clientId) => {
        console.log(`client.username: ${client}`);
        if (client.readyState === ws.OPEN) {
          const messageResponse = {
            type: 'response',
            content: content,
            sender: username,
          }
          console.log(`보낸 메시지: ${JSON.stringify(messageResponse)}`);
          client.send(JSON.stringify(messageResponse));
        }
      });
    } else if (parsedMessage.type === 'session') {
      wsClients.forEach((client, clientId) => {
        console.log(`client.username: ${client}`);
        if (client.readyState === ws.OPEN) {
          const messageResponse = {
            type: 'newuser',
            content: `${username}님이 입장하셨습니다.`,
          }
          // console.log(`보낸 메시지: ${JSON.stringify(messageResponse)}`);
          client.send(JSON.stringify(messageResponse));
        }
      })
    }
  });

  // 접속이 끊겼을 때
  ws.on('close', () => {
    console.log('사용자가 나감');
    let username = '';

    wsClients.forEach((client, clientId) => {
      if (client === ws) {
        wsClients.delete(clientId);
        username = clientId;
      }
    });

    wsClients.forEach((client, clientId) => {

      if (client.readyState === ws.OPEN) {
        const messageResponse = {
          type: 'byeuser',
          content: `${username}님이 퇴장하셨습니다.`,
        }
        console.log(`보낸 메시지: ${JSON.stringify(messageResponse)}`);
        client.send(JSON.stringify(messageResponse));
      }
    });
  })


});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);;
});