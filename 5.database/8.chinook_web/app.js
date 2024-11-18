require('dotenv').config(); // 한 번만 불러오면 끝이라서 상수로 할당하지 않음. .env 파일을 읽어서 환경 변수로 사용
const express = require('express');
const sqlite3 = require('sqlite3').verbose(); // 개발 환경에서만 사용
const path = require('path');

const PORT = 3000;
// const dbFile = '../chinook.db';
// console.log(process.env);
const db = new sqlite3.Database(process.env.DB_PATH);
const app = express();

// Middleware
app.use(express.static('public'));


// Routing
app.get('/', (req, res) => { 
    // 여기는 도달하지 못 함. Middleware static을 public으로 설정하면, /는 자동으로 index.html로 연결
    // 다른파일명.html 등을 주지 않을거면, app.get('/', ~) 부분 없애는 게 덜 헷갈리고 낫다.
    res.sendFile(path.resolve('public/index.html'));
});

app.get('/api/search', (req, res) => {
    const { searchQuery, page = 1 } = req.query; // query에 page 값 있으면 사용, 없으면 기본값 1

    console.log(`사용자 입력: ${searchQuery}, 페이지: ${page}`);
    const itemsPerPage = 10; // 페이지당 10개만 출력
    const offset = (page - 1) * itemsPerPage; // 산수를 통해서 원하는 페이지 offset

    // 사용자가 요청한 조회 결과가 몇 개나 있고, 그게 몇 페이지가 될지 계산
    const countSql = 'SELECT COUNT(*) AS count FROM artists WHERE NAME LIKE ?';
    db.get(countSql, [`%${searchQuery}%`], (err, row) => {
        if (err) {
            console.error(err.message);
            res.status(500);
        }
        const totalPage = Math.ceil(row.count / itemsPerPage);

        const sql = 'SELECT * FROM artists WHERE NAME LIKE ? LIMIT ? OFFSET ?';
        console.log(`갯수: ${row.count}, 전체 페이지 수: ${totalPage}`);
        // res.json({ totalPage: totalPage }); // 이러면 응답 반환이 끝나서 아래에서 조회 결과를 반환할 수 없다.

        // LIMIT ${itemsPerPage} 처럼 입력해도 괜찮다. 다만 어차피 preparedStatement 사용중이므로, 일단 일괄 처리
        // LIMIT 뒷 부분은 사용자 입력값이 아니라 우리가 정하는 것이므로
        db.all(sql, [`%${searchQuery}%`, itemsPerPage, offset], (err, rows) => { // 비동기 함수
            if (err) { /* 여기는 에러 처리 */ return }
            res.json({ results: rows, currentPage: page, totalPage: totalPage, status: "ok" });
            // res.json(rows[0]);
        });
    });

});

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
});
