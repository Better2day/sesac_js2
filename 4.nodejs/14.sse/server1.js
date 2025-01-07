const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors()); // 모든 origin 다 허용 (수업중이라 사용할 뿐, 실무에서는 지양해야 함)

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/events', (req, res) => {
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');
  res.setHeader('Content-Type', 'text/event-stream');

  // 클라이언트가 접속시 현재 시간
  const sendTime = () => {
    // 데이터 프로토콜은 "data: 내용\n\n" 형식 (지키지 않으면 통신 안 됨)
    res.write(`data: ${new Date().toISOString()}\n\n`);
  }

  // 주기적으로 전송
  const interval = setInterval(sendTime, 1000); // 1000ms

  req.on('close', () => {
    clearInterval(interval);
    console.log('사용자 접속 종료');
  });

});

app.listen(port, () => {
  console.log(`Server is running on http://127.0.0.1:${port}`);
});
