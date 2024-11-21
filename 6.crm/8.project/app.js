require('dotenv').config('.env.development');
const express = require('express');
const SQLiteStore = require('better-sqlite');
const morgan = require('morgan');
const debug = require('debug');
const nunjucks = require('nunjucks');

nunjucks.configure({
    autoescape: true,
    // 하나 더 있었는데..  'view engine': 'HTML' 이었나? 아니면 그건 따로 app.use 쪽이었나
});

// ../../user-sample.db

const PORT = process.env.PORT || 3000;
const app = express();

if (process.env.NODE_ENV === 'developement') {
    morgan('dev');
}

// Middleware loading
app.use(express.static('public'));


// Route - API


// Route - 사용자
const tables = [
    'users',
    'stores',
    'items',
    'orders',
    'order_items'
]


app.get('/', (req, res) => {
    
})

tables.forEach(tbl => {
    app.get(`/${tbl}`, (req, res) => {
        // DB 쿼리 `SELECT * FROM ${tbl}` // WHERE name like ? AND 1=1
        // 결과를 가지고 응답 페이지 렌더링
        // res.render(tbl, {});
    })
});


/* 
app.get('/stores', (req, res) => {
    // DB 쿼리
    // 결과 응답
})

app.get('/items', (req, res) => {
    
})

app.get('/orders', (req, res) => {
    
})

app.get('/order_items', (req, res) => {
    
})
 */

app.listen(PORT, () => {
    console.log(`CRM server is listening on ${PORT}`);
});
