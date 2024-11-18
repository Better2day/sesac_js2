const express = require('express');
const nunjucks = require('nunjucks');
const sqlite3 = require('better-sqlite3');
const path = require('path');

const app = express();
const PORT = 3000;
const db = new sqlite3('user-sample.db');
// 빠른 코딩을 위해 강사님이 하드 코딩하셨지만 ENV 이용하는 게 좋다고 하심

nunjucks.configure('views', {
    autoescape: true,
    express: app,
});

// Middleware
app.use(express.static('public'));
// app.use(express.urlencoded({ extended: true }));


// Routing
// 시스템 호출용 API 루트
app.get('/api/users', (req, res) => {
    const query = 'SELECT * FROM users'; 
    db.all(query, [], (err, rows) => {
        res.json(rows);
        // if (err) {

        // } else {
        // }
    });
});

app.get('/api/users/:id', (req, res) => {
    const userId = req.params.id;

    const query = 'SELECT * FROM users WHERE id = ?';
    db.get(query, [userId], (err, rows) => {
        res.json(rows);
        // if (rows) {
        // } else {
        //     res.status(404).json({error: '사용자 없다!'});
        // }
    });
});

// 사용자 페이지용 루트
app.get('/users/:id', (req, res) => {
    const userId = req.params.id;

    const query = db.prepare('SELECT * FROM users WHERE id = ?');
    const data = query.get(userId);
    
    res.render('user_detail.html', {user: data});
})

app.get('/', (req, res) => {
    const query = db.prepare('SELECT * FROM users');
    const data = query.all();

    res.render('user.html', {data: data}); // 그냥 data로 주면 결과 공백

});

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
});
