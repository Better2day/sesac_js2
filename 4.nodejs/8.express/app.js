const express = require('express');
const app = express();
const port = 3000;

// 라우트 '/' 생성

app.get('/', (req, res) => {
    res.send('<H1>Hello, Express</H1>');
});

app.get('/user', (req, res) => {
    res.send('<H1>사용자 페이지</H1>');
});

app.get('/admin', (req, res) => {
    res.send('<H1>고나리자 페이지</H1>');
});

app.post('/', (req, res) => {
    res.send('/에 POST 요청이 왔습니다.');
});

app.post('/user', (req, res) => {
    res.send('/user에 POST 요청이 왔습니다.');
});

app.put('/user', (req, res) => {
    res.send('/user에 PUT 요청이 왔습니다.');
});

app.delete('/user', (req, res) => {
    res.send('/user에 DELETE 요청이 왔습니다.');
});


app.listen(port, () => {
    console.log(`서버가 http://localhost:${port} 에서 실행중입니다.`);
})