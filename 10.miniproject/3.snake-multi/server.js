const express = require('express');
const path = require('path');
// const expressWs = require('express-ws');
const http = require('http');
const WebSocket = require('ws');

const app = express();
// expressWs(app);
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

const port = 3000;

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// 정적 파일 제공 - ※ 순서 주의 '/' 보다 앞에 있으면 무조건 public 안의 index.html 파일 자체가 전달됨
app.use(express.static(path.join(__dirname, 'public')));

wss.on('connection', (ws, req) => {
  console.log('Client 접속');

  ws.on('message', (message) => {
    const data = JSON.parse(message);

    if (data.type === 'keypress') {
      console.log(`키 눌림: ${data.key}`);
      broadcast(data.key);
    }
  });
});

function broadcast(data) {
  wss.clients.forEach((client) => {
    // app.getWss().clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(data));
    }
  });
}

// app.listen(port, () => {
server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});