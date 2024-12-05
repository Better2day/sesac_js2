require('dotenv').config({ path: '.env.development' });;
const express = require('express');
const SQLite3 = require('better-sqlite3');
const morgan = require('morgan');
const path = require('path');

const app = express();

const PORT = process.env.PORT || 3000;

// Middleware setup
app.use(express.static('public'));
app.use(morgan('dev'));

// Routing setup
app.get('/', (req, res) => {
    res.redirect('/bbs');
});

// 게시판 목록
app.get('/bbs', (req, res) => {
    res.sendFile(path.resolve('public', 'bbs.html'));
    // res.sendFile(path.join(__dirname, 'public', 'bbs.html'));
});

// 글 작성
app.get('/posts', (req, res) => {
    res.sendFile(path.resolve('public', 'posts.html'));
});

// 게시판 글쓰기
app.post('/posts', (req, res) => {
    res.json('')

});

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
});
