const express = require('express');
const sqlite3 = require('better-sqlite3');
const router = express.Router();

const db = new sqlite3('../user-sample.db');

// 상점 상세 정보
// router.route('/store_detail/:id')
router.route('/:id')
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

    if (!revMonth) { // 월별 매출
        query = db.prepare(`SELECT o.StoreId, strftime('%Y-%m', o.OrderAt) AS Month, SUM(i.UnitPrice) AS Revenue, COUNT(i.Id) AS Count
                              FROM orders o
                              JOIN order_items oi ON o.Id = oi.OrderId
                              JOIN items i ON oi.ItemId = i.Id
                             WHERE o.StoreId = ?
                             GROUP BY Month
                             ORDER BY Month`);
        revenue = query.all(id);
    } else { // 일별 매출
        query = db.prepare(`SELECT strftime('%Y-%m-%d', o.OrderAt) AS Day, SUM(i.UnitPrice) AS Revenue, COUNT(i.Id) AS Count
                              FROM orders o
                              JOIN order_items oi ON o.Id = oi.OrderId
                              JOIN items i ON oi.ItemId = i.Id
                             WHERE o.StoreId = ? AND strftime('%Y-%m', OrderAt) = ?
                             GROUP BY Day
                             ORDER BY Day`);
        revenue = query.all(id, revMonth);
    }

    // 단골 고객 Top 10
    query = db.prepare(`SELECT u.Id AS UserId, u.Name, COUNT(u.Id) AS Frequency
                          FROM stores s
                          JOIN orders o ON s.Id = o.StoreId
                          JOIN users u ON o.UserId = u.Id
                         WHERE o.StoreId = ?
                         GROUP BY u.Id
                         ORDER BY Frequency DESC, u.Name ASC
                         LIMIT 10`);
    const freqCustomers = query.all(id);
    console.log(freqCustomers);

    console.log('revenueKeys: ', Object.keys(revenue[0]));
    res.render('store_detail', {
                                storeKeys: Object.keys(storeInfo),
                                storeInfo: storeInfo,
                                revenueKeys: Object.keys(revenue[0]),
                                revenue: revenue,
                                freqCustomerKeys: Object.keys(freqCustomers[0]),
                                freqCustomers: freqCustomers,
                                });
});

module.exports = router;
