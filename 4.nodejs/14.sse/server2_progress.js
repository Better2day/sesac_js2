const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors()); // 모든 origin 다 허용 (수업중이라 사용할 뿐, 실무에서는 지양해야 함)

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'progress2.html'));
});

app.get('/progress', (req, res) => {
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');
  res.setHeader('Content-Type', 'text/event-stream');

  let progress = 0;

  // 주기적으로 전송
  const interval = setInterval(() => {
    progress += 10;
    res.write(`data: ${JSON.stringify({ progress })}\n\n`);

    if (progress >= 100) {
      clearInterval(interval);
      res.end();
    }
  }, 500); // 500ms

  req.on('close', () => {
    clearInterval(interval);
    console.log('사용자 런');
  });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
