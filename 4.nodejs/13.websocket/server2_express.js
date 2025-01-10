const express = require('express');
const expressWs = require('express-ws'); // 추가
const path = require('path');

const port = 3000;

const app = express();
expressWs(app); // 추가

// 나에게 접속하는 사용자들 관리할 자료구조
const wsClients = new Map();
// 예) user1, 0x487937529485239 (웹소켓주소)
// 예) user2, 0x453845948375845 (웹소켓주소)

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'chat_client.html'));
});

// 웹소켓을 처리하는 EP (엔드포인트)
app.ws('/chat', (ws, req) => {
  const clientIp = req.socket.remoteAddress;
  console.log('클라이언트: ', clientIp);

  ws.on('message', (message) => {
    const messageString = message.toString('utf8');
    console.log('받은메세지: ', messageString);

    const parsedMessage = JSON.parse(messageString);
    const username = parsedMessage.username;
    const content = parsedMessage.content;

    if (username && !wsClients.has(username)) {
      wsClients.set(username, ws); // 새로운 사용자이면? 우리의 목록에 추가
      console.log(`새로운 사용자 접속: ${username}, ${ws}`);
    }

    // ws.send(messageString);
    if (parsedMessage.type !== 'session') {
      wsClients.forEach((client, clientId) => {
        if (client.readyState === ws.OPEN) {
          const messageResponse = {
            type: "response",
            sender: username,
            content: content
          }
          console.log(`보낸메세지: ${JSON.stringify(messageResponse)}`);
          client.send(JSON.stringify(messageResponse));
        }
      })
    } else if (parsedMessage.type === 'session') {
      wsClients.forEach((client, clientId) => {
        if (client.readyState === ws.OPEN) {
          const messageResponse = {
            type: "newuser",
            content: `${username} 님이 입장하였습니다.`
          }
          console.log(`보낸메세지: ${JSON.stringify(messageResponse)}`);
          client.send(JSON.stringify(messageResponse));
        }
      })
    }
  });

  // 접속이 끊겼을때
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
          type: "newuser",
          content: `${username} 님이 퇴장하였습니다.`
        }
        console.log(`보낸메세지: ${JSON.stringify(messageResponse)}`);
        client.send(JSON.stringify(messageResponse));
      }
    });
  })
})

app.listen(port, () => {
  console.log('서버 레디');
});