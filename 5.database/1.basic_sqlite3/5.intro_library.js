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

module.exports = {
    dbRunQuery,
    dbAllQuery,
}