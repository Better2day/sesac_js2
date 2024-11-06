const express = require('express');
const path = require('path');

// 변수 정의
const app = express();
const PORT = 3000;
const users = {};

// Middleware
// app.use(express.static('static'));
app.use('/static', express.static('static')); // 사용자가 127.0.0.1:3000/static/OOO URL로 접속할 경우
app.use('/image', express.static('static/image')); // 사용자가 127.0.0.1:3000/iamge/OOO URL로 접속해도 동일하게 static 폴더에서 정적 파일 제공

app.use(express.json());

// Route
app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'index.html')); // join도 마찬가지
})

app.get('/about', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'about.html')); // join도 마찬가지
})

app.get('user', (req, res) => { //
    res.json(users);
})

ㅎapp.post('user', (req, res) => {
    const { name } = req.body; // const name = req.body.name 문을 객체 구조 분해 할당 (destructuring assignment)
    users[name] = name;
    res.status(201).send('등록 성공');
})

app.put('/user', (req, res) => {  // Id 받아와서 해당 사용자 수정
    res.send('여기 작성해야 함');
})

app.delete('/user', (req, res) => {  // Id 받아와서 해당 사용자 삭제
    res.send('여기 작성해야 함');
})

// 오류 Middleware

// 서버 시작
app.listen(PORT, () => {
    console.log(`서버가 ${PORT} 포트에서 대기중입니다.`);
});
