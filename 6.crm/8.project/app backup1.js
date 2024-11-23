require('dotenv').config({path: '.env.development'});
const express = require('express');
const sqlite3 = require('better-sqlite3');
const nunjucks = require('nunjucks');
const morgan = require('morgan');
const debug = require('debug');

const PORT = process.env.PORT || 3000;
const app = express();
const db = new sqlite3('../user-sample.db');
const debugLog = new debug('log');
const debugError = new debug('error');


// Middleware loading
app.use(express.static('public'));

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

nunjucks.configure('views', {
    autoescape: true,
    express: app,
    watch: true,
    // noCache: true,
    // web: {
    //     useCache: false,
    // },
});
app.set('view engine', 'html');


// Route - 사용자

app.get('/', (req, res) => {
    res.redirect('/crm/users');
});


// Paging: LIMIT rowsPerPage OFFSET (현재 페이지 번호 - 1) * rowsPerPage
const rowsPerPage = 20;

app.get(`/crm/users`, (req, res) => {
    const { userName = '', gender } = req.query;
    const page = parseInt(req.query.page) || 1;
    console.log(userName, gender);

    // 검색 기능 추가 관련: WHERE 1=1 AND name LIKE '%what%' AND col1=val1 (1=1 부분은 논란이 있어서 보류)
    let queryCols = 'SELECT COUNT(*) AS TOTAL '
    const queryCenter = 'FROM users WHERE NAME LIKE ? ';
    const queryOption = gender ? 'AND GENDER=? ' : '';
    const cntQuery = db.prepare(queryCols + queryCenter + queryOption);
    const psArgs = [`%${userName}%`];
    // DB 쿼리 조건절과 인수를 일치시키기 위해서, prepared statement 인수 배열에 조건부로 인수 요소 추가
    if (gender) {
        psArgs.push(gender);
    };
    const cnt = cntQuery.get(psArgs);
    // const cnt = cntQuery.get(`%${userName}%`, gender);

    const totalPage = Math.ceil(cnt.TOTAL / rowsPerPage);
    // console.log(cnt);
    // console.log(`page = ${page}, totalPage = ${totalPage}`);
    // console.log('rowsPerPage * (page - 1) = ', rowsPerPage * (page - 1));

    queryCols = 'SELECT *';
    // queryCenter, queryOption는 count 쿼리할 때와 동일하므로 재사용
    queryLimit = 'LIMIT ? OFFSET ?';
    const query = db.prepare(queryCols + queryCenter + queryOption + queryLimit);
    psArgs.push(rowsPerPage);
    psArgs.push(rowsPerPage * (page - 1));
    const rows = query.all(psArgs);
    // const query = db.prepare(`SELECT * FROM users WHERE NAME LIKE ? AND GENDER=? LIMIT ? OFFSET ?`);
    // const rows = query.all(`%${userName}%`, gender, rowsPerPage, rowsPerPage * (page - 1));

    debugLog('query.all 실행 직후, res.render 실행 직전');

    // res.setHeader('Cache-Control', 'no-store');
    res.render(`users`,
                        {table: 'users',
                            keys: Object.keys(rows[0]),
                            rows: rows,
                            userName: userName,
                            gender: gender,
                            page: {page, totalPage},
                        });
    
    debugLog('res.render 실행 직후');
    // res.redirect(`/${tbl}?page=${page}`);
});

// 테이블 배열
const tables = [ 'users', 'stores', 'items', 'orders', 'order_items' ];
// 사용자 요청에 HTML 파일을 전송하는 로직은 검색 기능이 있는 사용자 테이블을 제외한
// 4개 테이블 모두 동일하므로, 테이블 배열을 순환하며 실행해서 app.get 코드 축약
tables.forEach(tbl => {
    if (tbl !== 'users') {
    app.get(`/crm/${tbl}`, (req, res) => {
        const cnt = db.prepare(`SELECT COUNT(*) AS TOTAL FROM ${tbl}`).get();
        const page = parseInt(req.query.page || 1);
        const totalPage = Math.ceil(cnt.TOTAL / rowsPerPage);

        const query = db.prepare(`SELECT * FROM ${tbl} LIMIT ? OFFSET ?`);
        const rows = query.all(rowsPerPage, rowsPerPage * (page - 1));

        console.log(cnt);
        console.log(`page = ${page}, totalPage = ${totalPage}`);
        console.log('rowsPerPage * (page - 1) = ', rowsPerPage * (page - 1));

        debugLog('query.all 실행 직후, res.render 실행 직전');

        // res.setHeader('Cache-Control', 'no-store');
        res.render(`${tbl}`,
                            {table: tbl,
                             keys: Object.keys(rows[0]),
                             rows: rows,
                             page: {page, totalPage},
                            });
        // res.redirect(`/${tbl}?page=${page}`);
        debugLog('res.render 실행 직후');
        // 검색 기능 추가해야 할 것: WHERE name like ? AND 1=1
    });
    }
});
/* // 아래처럼 테이블 별로 app.get('/tablename', ~) 을 4개 반복 작성해야 할 것을 위 코드로 축약
app.get('/stores', (req, res) => {
    // DB 쿼리 → 결과 응답
    })
app.get('/items', ~
app.get('/orders', ~
app.get('/order_items', ~
*/

// 각 테이블별 상세 페이지

tables.forEach(tbl => {
    app.get(`/crm/${tbl}`, (req, res) => {
        const query = db.prepare(`SELECT * FROM ${tbl} LIMIT ? OFFSET ?`);
        const rows = query.all(rowsPerPage, rowsPerPage * (page - 1));

        debugLog('query.all 실행 직후, res.render 실행 직전');

        res.render(`${tbl}`,
                            {table: tbl,
                             keys: Object.keys(rows[0]),
                             rows: rows,
                             page: {page, totalPage},
                            });
        debugLog('res.render 실행 직후');
    });
});


app.listen(PORT, () => {
    console.log(`CRM server is listening on ${PORT}`);
});
