require('dotenv').config('.env.development');
const express = require('express');
const sqlite3 = require('better-sqlite3');
const nunjucks = require('nunjucks');
const morgan = require('morgan');
const debug = require('debug');


// ../../user-sample.db

const PORT = process.env.PORT || 3000;
const app = express();
const db = new sqlite3('../user-sample.db');
const debugLog = new debug('log');
const debugError = new debug('error');

nunjucks.configure({
    autoescape: true,
    express: app,
});

if (process.env.NODE_ENV === 'developement') {
    morgan('dev');
}

// Middleware loading
app.use(express.static('public'));

/* 
app.use(nunjucks({
    'view-engine': 'HTML'
}));
 */

0
// Route - API


// Route - 사용자
// 테이블 배열
const tables = [
    'users',
    'stores',
    'items',
    'orders',
    'order_items'
];


app.get('/', (req, res) => {
    res.redirect('/users');
});

tables.forEach(tbl => {
    app.get(`/${tbl}`, (req, res) => {
        // DB 쿼리 `SELECT * FROM ${tbl}` // WHERE name like ? AND 1=1
        // 결과를 가지고 응답 페이지 렌더링
        const query = db.prepare(`SELECT * FROM ${tbl}`);
        const rows = query.get();
        console.log(rows);
        
        res.render(`views/${tbl}.html`, {title: tbl, data: rows});
    })
});

/*
// 사용자 요청에 HTML 파일을 전송하는 로직은 5개 테이블 모두 동일하므로, 위처럼 배열을 순환해서 실행해서 코드 축약
app.get('/stores', (req, res) => {
    // DB 쿼리 → 결과 응답
})
app.get('/items', (req, res) => {
})
 */

app.listen(PORT, () => {
    console.log(`CRM server is listening on ${PORT}`);
});
