// const sqlite3 = require('sqlite3');
const sqlite3 = require('sqlite3').verbose();


const db = new sqlite3.Database('test.db'); // 없으면 생성, 있으면 불러옴

function dbRunQuery(query, params = []) {
    try {
        return new Promise((resolve, reject) => { // resolved or rejected
            db.run(query, params, (err) => {
                if (err) reject(err);
                resolve();
            });
        })
    } catch (err) {
        console.error('오류 발생: ', err);
    }
}

function dbAllQuery(query, params = []) {
    return new Promise((resolve, reject) => {
        db.all(query, params, (err, rows) => {
            if (err) reject(err);
            resolve(rows);
        });
    })
}

(async () => {
    try {
        await dbRunQuery('CREATE TABLE IF NOT EXISTS messages (text TEXT)');
        await dbRunQuery('INSERT INTO messages(text) VALUES (?)', ['Hello, SQLite']);
        const rows = await dbAllQuery('SELECT * FROM messages');
        rows.forEach(row => {
            console.log(row);
        })
    } catch (err) {
        console.error('오류 발생: ', err);
    } finally {
        db.close();
    }
})();

console.log('이게 가장 먼저 출력');
