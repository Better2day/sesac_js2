const express = require('express');
const expressWs = require('express-ws');
const path = require('path');

const app = express();
expressWs(app);

const port = 3000;

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'progress2.html'));
});

app.ws('/progress', (ws, req) => {
  console.log('클라이언트가 웹소켓으로 접속');

  let progress = 0;
  let interval = null;

  ws.on('message', (message) => {
    console.log(message, message.toString());

    if (message.toString() === 'start' && progress < 100) {
      // let progress = 0;

      interval = setInterval(() => {
        progress += 20;
        ws.send(JSON.stringify({ progress }));

        if (progress >= 100) {
          clearInterval(interval);
          progress = 0;
          console.log('작업 완료');
        }
      }, 500); // 500ms 마다

      ws.send(JSON.stringify({ progress }));
    } else if (message === 'stop' && progress < 100) {
      ws.send(JSON.stringify({ progress }));
      clearInterval(interval);
    }
  });
});

app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
