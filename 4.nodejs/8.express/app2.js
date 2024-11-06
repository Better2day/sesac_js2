const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
    res.send('결과 출력');
});

app.get('/users', (req, res) => {
    res.send('사용자 출력');
});

app.get('/users/:id', (req, res) => { // id가 있으면 req.params에 담아준다.
    console.log(req.params);
    res.send(`사용자 ${req.params.id}를 출력한다`);
});

app.get('/users/:id/profile', (req, res) => {
    console.log(req.params);
    res.send(`사용자 ${req.params.id}에 대한 상세 프로필을 출력한다`);
});

app.get('/search', (req, res) => {
    const queryparams = req.query;
    console.log(queryparams);
    res.send(`검색 요청한 내용은 ${queryparams.q}와 최근 ${queryparams.top} 개수입니다`); // 여기 정상 처리 안 됨

});

app.listen(port, () => {
    console.log("Server's running");
})
