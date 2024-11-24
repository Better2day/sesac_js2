const express = require('express');
const sqlite3 = require('better-sqlite3');
const router = express.Router();

const db = new sqlite3('../user-sample.db');

// 기타 테이블 상세 페이지 (페이지마다 조회 정보가 많이 달라서 분리했는데, 아래 세 테이블은 추가 정보가 별로 없어서 테이블 별로 분리하지는 않음

// 상품 상세 정보
router.route('/item_detail/:id')
.get((req, res) => {
    const id = req.params.id;
    // 상품 상세 정보
    let query = db.prepare('SELECT * FROM items WHERE Id = ?');
    const row = query.get(id);
    console.log(row);
    console.log('keys(Object.keys(row)):', Object.keys(row));

    // 월별 매출
    query = db.prepare(`SELECT strftime('%Y-%m', o.OrderAt) AS Month, SUM(i.UnitPrice) AS Revenue, COUNT(i.Id) AS Count
                        FROM items i
                        JOIN order_items oi ON i.Id = oi.ItemId
                        JOIN orders o ON oi.OrderId = o.Id
                        WHERE i.Id = ?
                        GROUP BY Month
                        ORDER BY Month`);
    const revenue = query.all(id);

    res.render('item_detail', {
                                keys: Object.keys(row),
                                row: row,
                                revenueKeys: Object.keys(revenue[0]),
                                revenue: revenue,
                                });
});

// 주문 상세 정보
router.route('/order_detail/:id')
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

// 주문 내 상품 상세 정보
router.route('/orderitem_detail/:id')
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
