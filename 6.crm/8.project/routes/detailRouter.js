const express = require('express');
const sqlite3 = require('better-sqlite3');
const router = express.Router();

const db = new sqlite3('../user-sample.db');

// 테이블 상세 페이지 (페이지마다 조회 정보가 많이 달라서 분리)
// 고객 상세 정보
router.route('/user_detail/:id')
    .get((req, res) => {
        const id = req.params.id;
        // 고객 인적사항
        let query = db.prepare('SELECT * FROM users WHERE Id = ?');
        const userInfo = query.get(id);
        // console.log(userInfo);
        // console.log('keys(Object.keys(userInfo)):', Object.keys(userInfo));

        // 고객 주문 기록
        query = db.prepare(`SELECT o.Id AS OrderId, o.OrderAt AS "Purchase datetime", s.Id AS StoreId, s.Name AS StoreName
                              FROM orders o
                              JOIN stores s ON o.StoreId = s.Id
                             WHERE o.UserId = ?`);
        const orders = query.all(id);
        
        // 자주 방문한 매장 Top 5
        query = db.prepare(`SELECT s.Name AS StoreName, COUNT(s.Id) AS Frequency
                              FROM orders o
                              JOIN stores s ON o.StoreId = s.Id
                             WHERE o.UserId = ?
                             GROUP BY s.Id
                             ORDER BY Frequency DESC
                             LIMIT 5`);
        const freqStores = query.all(id);
        
        // 자주 주문한 상품 Top 5
        query = db.prepare(`SELECT i.Name AS ItemName, COUNT(i.Id) AS Frequency
                              FROM orders o
                              JOIN order_items oi ON o.Id = oi.OrderId
                              JOIN items i ON oi.ItemId = i.Id
                             WHERE o.UserId = ?
                             GROUP BY i.Id
                             ORDER BY Frequency DESC
                             LIMIT 5`);
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

// 상점 상세 정보
router.route('/store_detail/:id')
.get((req, res) => {
    const id = req.params.id;
    const { revMonth } = req.query;
    console.log(revMonth);
    // 상점 상세 정보
    let query = db.prepare('SELECT * FROM stores WHERE Id = ?');
    let revenue;
    const storeInfo = query.get(id);
    console.log(storeInfo);
    console.log('keys(Object.keys(storeInfo)):', Object.keys(storeInfo));

    if (!revMonth) { // 월별 매출액
        query = db.prepare(`SELECT o.StoreId, strftime('%Y-%m', OrderAt) AS Month, SUM(i.UnitPrice) AS Revenue, COUNT(i.Id) AS Count
                              FROM orders o
                              JOIN order_items oi ON o.Id = oi.OrderId
                              JOIN items i ON oi.ItemId = i.Id
                             WHERE o.StoreId = ?
                             GROUP BY Month
                             ORDER BY Month`);
        revenue = query.all(id);
        console.log(revenue);
    } else { // 일별 매출액        
        query = db.prepare(`SELECT strftime('%Y-%m-%d', OrderAt) AS Day, SUM(i.UnitPrice) AS Revenue, COUNT(i.Id) AS Count
                              FROM orders o
                              JOIN order_items oi ON o.Id = oi.OrderId
                              JOIN items i ON oi.ItemId = i.Id
                             WHERE o.StoreId = ? AND strftime('%Y-%m', OrderAt) = ?
                             GROUP BY Day
                             ORDER BY Day`);
        revenue = query.all(id, revMonth);
        console.log(revenue);
    }

    res.render('store_detail', {
                                storeKeys: Object.keys(storeInfo),
                                storeInfo: storeInfo,
                                revenueKeys: Object.keys(revenue[0]),
                                revenue: revenue,
                                });
});

router.route('/item_detail/:id')
.get((req, res) => {
    const id = req.params.id;
    const query = db.prepare('SELECT * FROM items WHERE Id = ?');
    const row = query.get(id);
    console.log(row);
    console.log('keys(Object.keys(row)):', Object.keys(row));

    res.render('item_detail', {
                                keys: Object.keys(row),
                                row: row,
                                });
});

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
