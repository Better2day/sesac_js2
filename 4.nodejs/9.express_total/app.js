const express = require('express');
const path = require('path');

// 변수 정의
const app = express();
const PORT = 3000;
const users = {};

// Middleware
// app.use(express.static('static'));
// 사용자가 요청한 정적 파일은 이 폴더에서 알아서 가져가도록 설정
app.use('/static', express.static('static')); // 사용자가 127.0.0.1:3000/static/OOO URL로 접속할 경우
app.use('/image', express.static('static/image')); // 사용자가 127.0.0.1:3000/iamge/OOO URL로 접속해도 동일하게 static 폴더에서 정적 파일 제공

// HTTP Request body에 application/json이 있으면 req.body에 할당
app.use(express.json());

app.use((req, __, next) => {
    console.log(`LOG: ${req.method} ${req.url}`);
    next();
})

// Route
app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'static', 'index.html')); // join도 마찬가지
})

app.get('/about', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'static', 'about.html')); // join도 마찬가지
})

app.get('/user', (req, res) => { //
    res.json(users); // JSON 형태의 객체를 보낼 때
    // res.send(users); // 문자 글자를 보낼 때
})

app.post('/user', (req, res) => {
    const { name } = req.body; // const name = req.body.name 문을 객체 구조 분해 할당 (destructuring assignment)
    users[name] = name;
    res.status(201).send('등록 성공');
})

/* 
app.put('/user', (req, res) => {  // Id 받아와서 해당 사용자 수정
    res.send('여기 작성해야 함');
})
 */
app.put('/user/:id', (req, res) => {  // Id 받아와서 해당 사용자 수정
    const id = req.params.id;
    users[id] = req.body.name;
    res.status(200).send('수정 성공');

    res.send('여기 작성해야 함');
})



app.delete('/user', (req, res) => {  // Id 받아와서 해당 사용자 삭제
    const id = req.params.id;
    delete users[id];
    req.status(200).send('삭제 완료');
    // req.status(204).send(); // 삭제 처리 완료됐지만, 메시지 전송은 하지 않음
})

// 오류 Middleware
 app.use((req, res) => {
    res.status(404).send(`이 페이지(${req.url})는 없습니다.`);
    // res.status(404).sendFile(errorpage);
 })

// 서버 시작
app.listen(PORT, () => {
    console.log(`서버가 ${PORT} 포트에서 대기중입니다.`);
});
