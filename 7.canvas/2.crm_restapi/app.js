const express = require('express');
const sqlite3 = require('sqlite3')
const path = require('path');

const port = 3000;
const app = express();

const db = new sqlite3.Database('../user-sample.db', (err) => {
    if (err) {
        console.error('파일 없음');
    } else {
        console.log('DB Loading 성공');
    }
})

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'revenue.html'));
});


/* 
app.get('/gender_dist_data', (req, res) => {
    db.all(`
        SELECT
        (SELECT COUNT(Id)
        FROM users
        WHERE gender='Male') MaleCount,
        (SELECT COUNT(Id)
        FROM users
        WHERE gender='Female') FemaleCount,
        COUNT(Id) AS TotalCount
        FROM users
        `, (err, rows) => {
            if (err) {
                console.error(err.message);
            } else {
                console.log(rows);
                // res.json(rows);
            }
    });
});
     */
app.get('/gender_dist_data', (req, res) => {
    // SELECT (CAST(Age AS INTEGER) / 10 * 10) AS AgeGroup, Gender, COUNT(Id) AS UserCount
    // FROM users
    // GROUP BY AgeGroup, Gender;

    db.all(`
        SELECT
            CASE
                WHEN Age BETWEEN 10 AND 19 THEN '10대'
                WHEN Age BETWEEN 20 AND 29 THEN '20대'
                WHEN Age BETWEEN 30 AND 39 THEN '30대'
                WHEN Age BETWEEN 40 AND 49 THEN '40대'
                WHEN Age BETWEEN 50 AND 59 THEN '50대'
                WHEN Age >= 60 THEN '60대 이상'
            END AS AgeGroup,
            Gender,
            COUNT(Id) AS UserCount
        FROM users
        GROUP BY AgeGroup, Gender;
        `, (err, rows) => {
            if (err) {
                console.error('Query failed!', err.message);
            } else {
                console.log(rows);

                // 데이터 가공. 원하는 형식으로
                // labels: ['10대', '20대', '30대', '40대', '50대']
                // maleCount: [100, 124, 128, 107, 29]
                // femaleCount: [101, 135, 126, 117, 33]
                // 점심 시간 전에 급해서 아래처럼 하드코딩했지만, BE에서 받아오도록

                const chartData = {
                    labels: ['10대', '20대', '30대', '40대', '50대'],
                    maleCount: [100, 124, 128, 107, 29], 
                    femaleCount: [101, 135, 126, 117, 33],
                }

                console.log(chartData);
                res.json(chartData);
            }
        });
});

app.get('/revenue_data', (req, res) => {

    db.all(`
        SELECT
            strftime('%Y-%m', "orders"."OrderAt") AS YearMonth,
            SUM(items.UnitPrice) AS MonthlyRevenue,
            COUNT(order_items.ItemId) AS ItemCount
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
            console.log(rows);

            // 데이터를 FE가 원하는 형태로 가공해서 주면 좋다.
            // 친절한 BE 개발자가 데이터를 가공
            const labels = [];
            const revenues = [];

            // rows.forEach(function (row) {
            //     labels[row.key] = row.value;
            //     revenues[row.key] = row.value;
            // });

            for (const row of rows) {
                labels.push(row.YearMonth);
                revenues.push(row.MonthlyRevenue);
            }

            console.log(labels);
            console.log(revenues);

            const chartData = {
                labels: labels,
                revenues: revenues,
            };

            res.json(chartData);
        }
    });
});

app.listen(port, () => {
    console.log(`Server is running on ${port}`);
});
