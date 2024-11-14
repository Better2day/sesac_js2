// Module 불러오기
const express = require('express');
const session = require('express-session');
const sqlite3 = require('sqlite3');
const path = require('path');

// 내부에서 사용할 변수 정의
const app = express();
const port = 3000;
const db = new sqlite3.Database('users.db');

// Session 초기화
app.use(session({
    secret: 'my-secret-1111',
    resave: false,
    saveUninitialized: true,
}));


// Middleware 등록
app.use(express.urlencoded({extended: true})); // 기본 폼 입력값 처리

app.use(express.static('public'));
// app.use('/', express.static('public'));
// app.use('/public', express.static('public'));


// Routing
app.get('/', (req, res) => {
    res.sendFile(path.resolve('public/index.html'));
});

app.use('/public/:filename', (req, res) => {
    // console.log(`req.params = ${JSON.stringify(req.params.filename)}`);
    // console.log(path.join(__dirname, 'public', req.params.filename));
    res.sendFile(path.join(__dirname, 'public', req.params.filename));
});

app.get('/check-login', (req, res) => {
    const user = req.session.user || null;
    // const user = JSON.parse(req.session.user) || null;
    if (user) {
        console.log(user);
        res.json(user);
    } else {
        res.status(404).send('404 Not Found');
    }
});

app.get('/profile-data', (req, res) => {
    // const 

    // SELECT * FROM users WHERE username

    console.log('/profile-data 진입 성공');
});

app.get('/profile', (req, res) => {
    res.sendFile(path.resolve('public/profile.html'));
    // res.sendFile(path.join(__dirname, 'public', 'profile.html'));
});


app.post('/login', (req, res) => {
    const { username, password } = req.body;
    console.log(username, password);

    // const queryStr = `SELECT * FROM users WHERE username = '${username}' AND password = '${password}'`;
    const queryStr = 'SELECT * FROM users WHERE username = ? AND password = ?';
    console.log(queryStr);

    db.get(queryStr, [username, password], (err, row) => {
        if (row) {
            console.log('사용자 조회:', row);
            req.session.user = row;
            res.send(`로그인 성공: ${row.username}`);
        } else {
            res.send('로그인 실패');
        }
    });
});

app.get('/logout', (req, res) => {
    if(req.session) {
        req.session.destroy();
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
