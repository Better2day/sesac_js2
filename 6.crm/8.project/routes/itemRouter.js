const express = require('express');
const sqlite3 = require('better-sqlite3');
const router = express.Router();

const db = new sqlite3('../user-sample.db');

// Paging: LIMIT rowsPerPage OFFSET (현재 페이지 번호 - 1) * rowsPerPage
const rowsPerPage = 20;

// 상품 정보
router.route('/')
    .get((req, res) => {
        const cnt = db.prepare('SELECT COUNT(*) AS TOTAL FROM items').get();
        let page = parseInt(req.query.page) // parseInt: null, undefined, 또는 숫자가 아닌 글자면 NaN 반환
        page = (!page) ? ((page === 0) ? page : 1) : page; // null, undefined, NaN이면 1로 수정, 0이면 아래에서 리디렉트하도록 그대로 둠
        const totalPage = Math.ceil(cnt.TOTAL / rowsPerPage);

        // page 번호가 1 ~ 전체 페이지 수 범위를 넘으면 정상 범위로 강제 수정해서 리디렉션 (URL까지 수정하기 위함)
        if (page < 1) {
            return res.redirect('/crm/items?page=1');
        } else if (page > totalPage) {
            return res.redirect('/crm/items?page=${totalPage}');
        }

        // console.log(cnt);
        // console.log(`page = ${page}, totalPage = ${totalPage}`);
        // console.log('rowsPerPage * (page - 1) = ', rowsPerPage * (page - 1));

        const query = db.prepare('SELECT * FROM items LIMIT ? OFFSET ?');
        const rows = query.all(rowsPerPage, rowsPerPage * (page - 1));

        res.render('items', {
            keys: Object.keys(rows[0]),
            rows: rows,
            page: { page, totalPage },
        });
    });

module.exports = router;
