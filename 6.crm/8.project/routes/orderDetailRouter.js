const express = require('express');
const sqlite3 = require('better-sqlite3');
const router = express.Router();

const db = new sqlite3('../user-sample.db');

// 주문 상세 정보
router.route('/:id')
    .get((req, res) => {
        const id = req.params.id;
        const query = db.prepare('SELECT * FROM orders WHERE Id = ?');
        const row = query.get(id);
        console.log(row);
        console.log('keys(Object.keys(row)):', Object.keys(row));

        res.render('order_detail', {
            keys: Object.keys(row),
            row: row,
        });
    });

module.exports = router;
