// Module 불러오기
const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('../../chinook.db');
const path = require('path');

// 변수 등 설정
const app = express();
const port = 3000;

// Middleware
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true })); // 폼 처리. 폼이 아니라 JSON일 경우 express.JSON() 이용


// Routing
app.get('/', (req, res) => {
    // __dirname은 현재 이 소스 파일이 실행되고 있는 경로: D:\~\~\hw5-2
    // res.sendFile(__dirname + \\public\\search.html'); 이런 식으로 해도 되는데
    // escaping을 직접 하지 않고 조금 더 편하게 사용하려고 path 모듈을 이용하는 듯
    res.sendFile(path.join(__dirname, 'public', 'search.html'));
});

app.get('/search', (req, res) => {
    const { searchQuery, searchType } = req.query;

});

app.listen(port, () => {
    console.log(`Server is running on ${port}`);
});
