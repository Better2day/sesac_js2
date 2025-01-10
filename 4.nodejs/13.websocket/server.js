const WebSocket = require('ws');
const port = 8000;

// Websocket: HTTP와 다르게 연결을 맺고 상호작용 (연결 상태 유지?)
const wss = new WebSocket.Server({ port: port });

wss.on('listening', () => {
  console.log('WebSocket ready...');
});

wss.on('connection', (ws, req) => {
  const clientIp = req.socket.remoteAddress;
  console.log('접속한 클라이언트: ', clientIp);

  ws.on('message', (message) => {
    const messageString = message;
    console.log(`${clientIp}로부터 받은 메시지: ${messageString}`);

    wss.clients.forEach((client) => {
      // 현재 연결을 맺고 있는 소켓 (확인하지 않아도 별 상관은 없음)
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify({ type: 'server-chat', content: message }));
        console.log('서버가 응답을 보냈음');
      }
    });
  });

  ws.on('close', () => {
    console.log('접속 종료');
  })
});