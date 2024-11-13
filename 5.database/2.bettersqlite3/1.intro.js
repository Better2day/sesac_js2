const sqlite = require('better-sqlite3');

const db = sqlite('test2.db');

// 테이블 생성
db.exec(`CREATE TABLE IF NOT EXISTS greetings (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    message TEXT
)`);

// 데이터 삽입
const insert = db.prepare('INSERT INTO greetings (message) VALUES (?)');
const insertResult = insert.run('헬로우 B-SQLITE3');
console.log('삽입완료: ', insertResult);

// 데이터 조회
const select = db.prepare('SELECT * FROM greetings');
const result = select.all();
result.forEach((row) => {
    console.log('조회결과: ', row.message);
});

db.close();
console.log('끝났음');
