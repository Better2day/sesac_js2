// Module 불러오기
const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('../../chinook.db');
const path = require('path');

// 변수 등 설정
const app = express();
const port = 3000;

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
    const { searchQuery, searchType } = req.query;

    const stringStart = 'SELECT * FROM ';
    const stringEnd = { // 이 객체의 key는 search.html form(select) searchType, DB table column name과 동일
        artistName: 'artists WHERE Name LIKE ?',
        // artistName: 'artists',
        albumTitle: 'albums WHERE Title LIKE ?',
        trackName: 'tracks WHERE Name LIKE ?',
        composer: 'tracks WHERE Composer LIKE ?',
        genre: 'genres WHERE Name LIKE ?',
        customerName: 'customers WHERE FirstName LIKE ?',
    };
    const queryString = stringStart + stringEnd[searchType];

    const columnToSend = {
        artistName: 'artists WHERE Name LIKE ?',
        // artistName: 'artists',
        albumTitle: 'albums WHERE Title LIKE ?',
        trackName: 'tracks WHERE Name LIKE ?',
        composer: 'tracks WHERE Composer LIKE ?',
        genre: 'genres WHERE Name LIKE ?',
        customerName: 'customers WHERE FirstName LIKE ?',
    }

    let searchResult = [];
    // const rows = db.prepare(queryString).all(`"%${searchQuery}%"`);
    // "%${searchQuery}%", '%${searchQuery}%' 둘 다 결과 안 나옴. % 앞뒤에 따옴표 종류 없어야 결과 나옴
    db.prepare(queryString).all(`%${searchQuery}%`, (err, rows) => {
        for (let row of rows) {
            // console.log(row);
            searchResult.push(row.Name);
        };
        console.log(searchResult);
        res.send(searchResult);
    });
    // res.json(JSON.stringify(rows));

    /* 
    const query1 = 'SELECT * FROM artists WHERE Name LIKE ?';
    const query2 = 'SELECT * FROM albums WHERE Title LIKE ?';
    const query3 = 'SELECT * FROM tracks WHERE Name LIKE ?';
    const query4 = 'SELECT * FROM tracks WHERE Composer LIKE ?';
    const query5 = 'SELECT * FROM genres WHERE Name LIKE ?';
    const query6 = 'SELECT * FROM customers WHERE FirstName LIKE ?';
     */
});

app.listen(port, () => {
    console.log(`Server is running on ${port}`);
});
