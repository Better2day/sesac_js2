const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const app = express();
const PORT = 3000;
const db = new sqlite3.Database('user-sample.db');
// 빠른 코딩을 위해 강사님이 하드 코딩하셨지만 ENV 이용하는 게 좋다고 하심

// Middleware
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));


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
    res.sendFile(path.resolve('public/user_detail.html'));
})

app.get('/', (req, res) => {
    res.sendFile(path.resolve('public/users.html'));
    // res.sendFile(path.join(__dirname, 'public', 'users.html'));
});




app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
});
