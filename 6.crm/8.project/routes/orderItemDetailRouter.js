const express = require('express');
const sqlite3 = require('better-sqlite3');
const router = express.Router();

const db = new sqlite3('../user-sample.db');

// 주문 내 상품 상세 정보
router.route('/:id')
    .get((req, res) => {
        const id = req.params.id;
        const query = db.prepare(`SELECT oi.*, i.Name AS ItemName, i.UnitPrice
                                    FROM order_items oi
                                    JOIN items i ON oi.ItemId = i.Id
                                    WHERE oi.OrderId = ?`);
        const rows = query.all(id);
        console.log(rows);
        console.log('keys(Object.keys(rows[0])):', Object.keys(rows[0]));

        res.render('orderitem_detail', {
            keys: Object.keys(rows[0]),
            rows: rows,
        });
    });

module.exports = router;
