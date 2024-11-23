const express = require('express');
const sqlite3 = require('better-sqlite3');
const router = express.Router();

const db = new sqlite3('../user-sample.db');

// Paging: LIMIT rowsPerPage OFFSET (현재 페이지 번호 - 1) * rowsPerPage
const rowsPerPage = 20;

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
    const [ detailTbl ] = Object.values(table);

    // 사용자 테이블 외 모든 테이블 메인 페이지
    if (tbl !== 'users') {
        router.route(`/${tbl}`)
            .get((req, res) => {
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

                // console.log(cnt);
                // console.log(`page = ${page}, totalPage = ${totalPage}`);
                // console.log('rowsPerPage * (page - 1) = ', rowsPerPage * (page - 1));
    
                const query = db.prepare(`SELECT * FROM ${tbl} LIMIT ? OFFSET ?`);
                const rows = query.all(rowsPerPage, rowsPerPage * (page - 1));
    
                res.render(`${tbl}`,
                                    {table: tbl,
                                    keys: Object.keys(rows[0]),
                                    rows: rows,
                                    page: {page, totalPage},
                                    });
            })
    }

    // 모든 테이블 상세 페이지
    router.route(`/${detailTbl}/:id`)
        .get((req, res) => {
            const id = req.params.id;
            const query = db.prepare(`SELECT * FROM ${tbl} WHERE ID = ?`);
            const row = query.get(id);

            res.render(`${detailTbl}`,
                                    {table: tbl,
                                    keys: Object.keys(row),
                                    row: row,
                                    });
        });
});
/* // 아래처럼 테이블 별로 app.get('/tablename', ~) 을 4개 반복 작성해야 할 것을 위 코드로 축약
app.get('/stores', (req, res) => {
   // DB 쿼리 → 결과 응답
   })
app.get('/items', ~
app.get('/orders', ~
app.get('/order_items', ~
*/

module.exports = router;
