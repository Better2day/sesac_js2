const express = require('express');
const path = require('path');

const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'ajax.html'));
});

app.get('/data', (req, res) => {
  res.json({ title: 'Hello, Title', content: '여기는 본문. 아무거나' });
});

app.listen(port, () => {
  console.log(`Server is runnig on http://localhost:${port}`);
});
