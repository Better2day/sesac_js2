// const sqlite3 = require('sqlite3');
const sqlite3 = require('sqlite3').verbose();


const db = new sqlite3.Database('test.db'); // 없으면 생성, 있으면 불러옴
// const db = new sqlite3.Database(':memory:');

// db.run('CREATE TABLE messages (text TEXT)');
db.run('CREATE TABLE IF NOT EXISTS messages (text TEXT)', (err) => {
    if (err) throw err;
    // 성공했을 때
    console.log('테이블 생성 완료');

    db.run('INSERT INTO messages(text) VALUES (?)', ['Hello, SQLite'], (err) => {
        if (err) throw err;
        console.log('데이터 삽입 성공');

        db.each('SELECT * FROM messages', (err, row) => {
            if (err) throw err;
            console.log(row);
        });
    });
});

db.close();
