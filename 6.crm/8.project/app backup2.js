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
    let page = parseInt(req.query.page) // parseInt: null, undefined, 또는 숫자가 아닌 글자면 NaN 반환
    page = (!page) ? ((page === 0) ? page : 1) : page; // null, undefined, NaN이면 1로 수정, 0이면 아래에서 리디렉트하도록 그대로 둠
    console.log(userName, gender, page);
    
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

    const totalPage = Math.ceil(cnt.TOTAL / rowsPerPage);

    // page 번호가 1 ~ 전체 페이지 수 범위를 넘으면 정상 범위로 강제 수정해서 리디렉션 (URL까지 수정하기 위함)
    if (page < 1) {
        return res.redirect(`/crm/users?userName=${userName}&gender=${gender}&page=1`);
    } else if (page > totalPage) {
        return res.redirect(`/crm/users?userName=${userName}&gender=${gender}&page=${totalPage}`);
    }
    
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
const crmTables = [
     {'users': 'user_detail'},
     {'stores': 'store_detail'},
     {'items': 'item_detail'},
     {'orders': 'order_detail'},
     {'order_items': 'orderitem_detail'},
];
// 사용자 요청에 HTML 파일을 전송하는 로직은 검색 기능이 있는 사용자 테이블을 제외한
// 4개 테이블 모두 동일하므로, 테이블 배열을 순환하며 실행해서 app.get 코드 축약
crmTables.forEach(table => {
    const [ tbl ] = Object.keys(table);
    if (tbl !== 'users') {
        app.get(`/crm/${tbl}`, (req, res) => {
            const cnt = db.prepare(`SELECT COUNT(*) AS TOTAL FROM ${tbl}`).get();
            let page = parseInt(req.query.page) // parseInt: null, undefined, 또는 숫자가 아닌 글자면 NaN 반환
            page = (!page) ? ((page === 0) ? page : 1) : page; // null, undefined, NaN이면 1로 수정, 0이면 아래에서 리디렉트하도록 그대로 둠
            const totalPage = Math.ceil(cnt.TOTAL / rowsPerPage);

            // page 번호가 1 ~ 전체 페이지 수 범위를 넘으면 정상 범위로 강제 수정해서 리디렉션 (URL까지 수정하기 위함)
            if (page < 1) {
                return res.redirect(`/crm/${tbl}?page=1`);
            } else if (page > totalPage) {
                return res.redirect(`/crm/${tbl}?page=${totalPage}`);
            }

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
crmTables.forEach(table => {
    const [ tbl ] = Object.keys(table);
    const [ detailTbl ] = Object.values(table);
    app.get(`/crm/${detailTbl}/:id`, (req, res) => {
        const id = req.params.id;
        const query = db.prepare(`SELECT * FROM ${tbl} WHERE ID = ?`);
        const row = query.get(id);

        debugLog('query.all 실행 직후, res.render 실행 직전');

        res.render(`${detailTbl}`,
                                {table: tbl,
                                keys: Object.keys(row),
                                row: row,
                                });
        debugLog('res.render 실행 직후');
    });
});


app.listen(PORT, () => {
    console.log(`CRM server is listening on ${PORT}`);
});
