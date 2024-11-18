// Module 불러오기
const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('../../chinook.db');
const path = require('path');

// 변수 등 설정
const app = express();
const PORT = 3000;
const RESULT_PER_PAGE = 10;

// Middleware
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true })); // 폼 처리. 폼이 아니라 JSON일 경우 express.JSON() 이용


// Routing
app.get('/', (req, res) => {
    // __dirname은 현재 이 소스 파일이 실행되고 있는 경로: D:\~\~\hw5-2
    // res.sendFile(__dirname + \\public\\search.html'); 이런 식으로 해도 되는데
    // escaping을 직접 하지 않고 조금 더 편하게 사용하려고 path 모듈을 이용하는 듯
    res.sendFile(path.join(__dirname, 'public', 'search.html'));
});

app.get('/search', (req, res) => {
    const { searchQuery, searchType, offset } = req.query;

    // const stringStart = 'SELECT * FROM ';
    // 아래 두 객체 리터럴은 다중 if/switch 문 대신, 간편하게 키에 상응하는 값을 반환하는 용도로 사용하는 객체
    const dbCol = { // 이 객체의 key는 search.html form(select) searchType, value는 DB table column name과 동일
        artistName: 'Name',
        albumTitle: 'Title',
        trackName: 'Name',
        composer: 'DISTINCT Composer',
        genre: 'Name',
        customerName: 'FirstName || " " || LastName AS CustomerName',
    }
    const endString = { // 이 객체의 key는 search.html form(select) searchType과 동일
        artistName: 'artists WHERE Name LIKE ?',
        albumTitle: 'albums WHERE Title LIKE ?',
        trackName: 'tracks WHERE Name LIKE ?',
        composer: 'tracks WHERE Composer LIKE ?',
        genre: 'genres WHERE Name LIKE ?',
        customerName: 'customers WHERE FirstName || LastName LIKE ?',
    };
    const queryString = `SELECT ${dbCol[searchType]} FROM ${endString[searchType]} LIMIT ${RESULT_PER_PAGE} OFFSET ${offset}`;

    // "%${searchQuery}%", '%${searchQuery}%' 둘 다 결과 안 나옴. % 앞뒤에 따옴표 종류 없어야 결과 나옴
    db.prepare(queryString).all(`%${searchQuery}%`, (err, rows) => {
        const searchResult = rows.map((row) => Object.values(row).pop());
        res.send(searchResult);
        // db.close();
    });

});

app.get('/count', (req, res) => {
    const { searchType } = req.query;
    console.log(searchType);

    const endString = { // 이 객체의 key는 search.html form(select) searchType과 동일
        artistName: 'artists',
        albumTitle: 'albums',
        trackName: 'tracks',
        composer: 'tracks',
        genre: 'genres',
        customerName: 'customers',
    };
    const queryString = `SELECT COUNT(*) AS total FROM ${endString[searchType]}`;

    db.prepare(queryString).get((err, result) => {
        console.log(result);
        res.json(result);
        // db.close();
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
});
