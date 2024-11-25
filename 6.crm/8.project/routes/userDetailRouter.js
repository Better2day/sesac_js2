const express = require('express');
const sqlite3 = require('better-sqlite3');
const router = express.Router();

const db = new sqlite3('../user-sample.db');

// 고객 상세 정보
// router.route('/user_detail/:id')
router.route('/:id')
    .get((req, res) => {
        const id = req.params.id;
        // 고객 인적사항
        let query = db.prepare('SELECT * FROM users WHERE Id = ?');
        const userInfo = query.get(id);
        // console.log(userInfo);
        // console.log('keys(Object.keys(userInfo)):', Object.keys(userInfo));

        // 고객 주문 기록
        query = db.prepare(`
            SELECT o.Id AS OrderId, o.OrderAt AS "Purchase datetime", s.Id AS StoreId, s.Name AS StoreName
            FROM orders o
            JOIN stores s ON o.StoreId = s.Id
            WHERE o.UserId = ?
        `);
        const orders = query.all(id);

        // 자주 방문한 매장 Top 5
        query = db.prepare(`
            SELECT s.Name AS StoreName, COUNT(s.Id) AS Frequency
            FROM orders o
            JOIN stores s ON o.StoreId = s.Id
            WHERE o.UserId = ?
            GROUP BY s.Id
            ORDER BY Frequency DESC
            LIMIT 5
        `);
        const freqStores = query.all(id);

        // 자주 주문한 상품 Top 5
        query = db.prepare(`
            SELECT i.Name AS ItemName, COUNT(i.Id) AS Frequency
            FROM orders o
            JOIN order_items oi ON o.Id = oi.OrderId
            JOIN items i ON oi.ItemId = i.Id
            WHERE o.UserId = ?
            GROUP BY i.Id
            ORDER BY Frequency DESC
            LIMIT 5
        `);
        const freqItems = query.all(id);

        res.render('user_detail', {
                                    userKeys: Object.keys(userInfo),
                                    userInfo: userInfo,
                                    orderKeys: Object.keys(orders[0]),
                                    orders: orders,
                                    freqStores: freqStores,
                                    freqItems: freqItems,
                                  });
    });

module.exports = router;
