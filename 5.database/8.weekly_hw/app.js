// Module 불러오기
const express = require('express');
// const db = require('better-sqlite3')('../chinook.db');
const sqlite3 = require('better-sqlite3');
// 수업 때처럼 적었는데, 살펴보니 세션 쓸 일 없어서 일단 보류
// const session = require('express-session');
// const SQLiteStore = require('connect-sqlite3')(session); // SQLite3 쓰면 공통인 듯
const path = require('path');

// 변수 선언

const port = 3000;
const app = express();
const db = new sqlite3('../chinook.db');


// Middleware 등록
app.use(express.static('public'));

app.use(express.urlencoded({ extended: true })); // 기본 폼 입력값 처리

/* 
app.use(session({
    secret: 'my-secret-key-111',
    store: new SQLiteStore,
    db: 'chinook.db',
}))
 */


// Routing

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'search.html'));
});

app.get('/search', (req, res) => {
    // const searchQuery = req.body.searchQuery;
    const { searchQuery } = req.query;

    const rows = db.prepare('SELECT * FROM artists WHERE NAME LIKE ?').all(`%${searchQuery}%`);
    // const rows = db.prepare('SELECT * FROM artists').all();
    console.log('result: ', rows);

    // res.send(JSON.stringify(rows));
    // res.send(rows);
    res.json(rows);
});
app.get('/search/:id', (req, res) => {


app.listen(port, () => {
    console.log(`Server is running on ${port}`);
});
