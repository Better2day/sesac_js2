require('dotenv').config({ path: '.env.development'});
// require('dotenv').config(); // .env 파일 로드
const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const morgan = require('morgan');
const debug = require('debug');
const path = require('path');
const fs = require('fs');

const debugLog = debug('app:log');
const debugError = debug('app:error');

const app = express();
const db = new sqlite3.Database('../user-sample.db');

const PORT = process.env.PORT || 3000;
const DB_HOST = process.env.DB_HOST;
const DB_USER = process.env.DB_USER;
const DB_PASSS = process.env.DB_PASS;
// console.log(`Database Config: Host=${DB_HOST}, User=${DB_USER}`);

// const logStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a'});

// 미들웨어
app.use(express.static('public')); 
// app.use(morgan('combined', {stream: logStream}));
// morgan.token('user', (req) => req.user ? req.user.name : 'Guest');
// console.log(`process.env: ${Object.entries(process.env)}`);
console.log(`process.env.NODE_ENV: ${process.env.NODE_ENV}`);
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

// combined - 아파치 서버 로그 포멧
// common - 요약된 형태
// dev - 개발시 유용한 모드
// tiny
// short

// app.use(myLogger)

function myLogger(req, res, next) {
    console.log(`LOG: ${req.method} ${req.url}`);
    next();
}

// 라우트
// 시스템 호출용 API 라우트
app.get('/api/users', (req, res) => {
    const query = 'SELECT * FROM users';
    db.all(query, [], (err, rows) => {
        res.json(rows);
    });
});

app.get('/api/users/:id', (req, res) => {
    const userId = req.params.id;

    const query = 'SELECT * FROM users WHERE Id = ?';
    db.get(query, [userId], (err, rows) => {
        res.json(rows);
    });
});

// 사용자 페이지용 라우트
app.get('/users/:id', (req, res) => {
    res.sendFile(path.resolve('public/user_detail.html'));
})

app.get('/', (req, res) => {
    debugLog('Handling root route');
    res.sendFile(path.resolve('public/users.html'));
    // res.sendFile(path.join(__dirname, 'public', 'users.html'));
});

app.get('/error', (req, res) => {
    debugError('Simulated error occurred');
    res.status(500).send('Something went wrong!');
});

// 서버 시작
app.listen(PORT, () => {
    console.log(`CRM Server is listening on http://localhost:${PORT}`)
});
