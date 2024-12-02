const express = require('express');
const sqlite3 = require('better-sqlite3');
const router = express.Router();

const db = new sqlite3('../user-sample.db');

// 상품 상세 정보
router.route('/:id')
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
        console.log('revenue: ', revenue);

        res.render('item_detail', {
            keys: Object.keys(row),
            row: row,
            revenueKeys: Object.keys(revenue[0]),
            revenue: revenue,
        });
    });

module.exports = router;
