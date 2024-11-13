// const sqlite3 = require('sqlite3')
const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('test.db'); // 없으면 생성, 있으면 불러옴
// const db = new sqlite3.Database(':memory:');

function dbRunQuery(query, params = []) {
    return new Promise((resolve, reject) => {
        db.run(query, params, (err) => {
            if (err) return reject(err);
            resolve();
        });
    });
}

function dbAllQuery(query, params = []) {
    return new Promise((resolve, reject) => {
        db.all(query, params, (err, rows) => {
            if (err) return reject(err);
            resolve(rows);
        });
    });
}

(async () => {  // 비동기 익명함수로 만들어 바로 당장 실행하기.
    try {
        await dbRunQuery('CREATE TABLE IF NOT EXISTS messages (text TEXT)');
        await dbRunQuery('INSERT INTO messages(text) VALUES (?)', ['Hello, SQLite']);
        const rows = await dbAllQuery('SELECT * FROM messages');
        rows.forEach(row => {
            console.log(row);
        });
    } catch (err) {
        console.error('뭔가 에러: ', err);
    } finally {
        // DB클로우즈
        db.close();
    }
})();

console.log('가장 먼저 출력됨...');
