const express = require('express');
const sqlite3 = require('sqlite3');
const nunjucks = require('nunjucks');

const app = express();
const port = 3000;

// Nunjucks 초기화
nunjucks.configure('views', {
    autoescape: true,
    express: app,
});

app.set('view engine', 'html'); // Nunjuck 기본 확장자 njk 대신 html 사용

app.get('/', (req, res) => {
    const db = new sqlite3.Database('user-sample.db', (err) => {
        if (err) {
            console.error('파일 없음');
        } else {
            console.error('DB Loading 성공');
        }
    });

    // 원하는 쿼리문
    db.all(`
        SELECT 
            strftime('%Y-%m', "orders"."OrderAt") AS YearMonth,
            SUM(items.UnitPrice) AS MonthlyRevenue
        FROM 
            "orders"
        JOIN 
            "order_items" ON "orders"."Id" = "order_items"."OrderId"
        JOIN 
            "items" ON "order_items"."ItemId" = "items"."Id"
        WHERE 
            "orders"."OrderAt" >= '2023-01-01' AND "orders"."OrderAt" <= '2023-12-31'
        GROUP BY 
            strftime('%Y-%m', "orders"."OrderAt")
        ORDER BY 
            strftime('%Y-%m', "orders"."OrderAt")
    `, [], (err, rows) => {
        if (err) {
            console.error('Query failed!');
        } else {
            const labels = rows.map((row) => row.YearMonth);
            // console.log(labels);
            // console.log(JSON.stringify(labels));
            const revenues = rows.map((row) => row.MonthlyRevenue);
            // console.log(JSON.stringify(revenues));

            // console.log('Object.keys(rows) = ', Object.keys(rows));
            // console.log('Object.values(rows) = ', Object.values(rows));
            res.render('monthly_revenue', {
                rows,
                labels: JSON.stringify(labels),
                revenues: JSON.stringify(revenues),
            });
        }
    });

});

app.listen(port, () => {
    console.log(`Server is listening on ${port}`);
});