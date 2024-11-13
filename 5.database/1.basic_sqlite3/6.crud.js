const sqlite3 = require('sqlite3');

const db = new sqlite3.Database('users.db');

db.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT,
    email TEXT
)`);

// 모든 사용자 조회
db.all('SELECT * FROM users', (err, rows) => {
    if (err) throw err;
    console.log('사용자 조회: ', rows);
});

// 새로운 사용자 생성
const newUser = {
    username: 'shpark',
    email: 'shpark@shpark.com'
};

db.run('INSERT INTO users (username, email) VALUES (?, ?)', [newUser.username, newUser.email], function (err) {
    // 함수 안에서 this 재생성..
    // () => {} 람다함수.. this의 scope가 바깥쪽에 있음..
    if (err) throw err;
    console.log(`삽입 성공: ${JSON.stringify(newUser)}, 삽입된 rowId: ${this.lastID}`);
});

// 특정 사용자 조회
const searchUserId = 1;
db.get('SELECT * FROM users WHERE id = ?', [searchUserId], (err, row) => {
    if (err) throw err;
    console.log('조회된 사용자: ', searchUserId, ':', row);
    console.log(`조회된 사용자: ${searchUserId} : ${JSON.stringify(row)}`);
});

// 사용자 정보 업데이트
const updateUser = {
    id: 1,
    username: 'kkk',
    email: 'kkk@kkk.com'
};

db.run('UPDATE users SET username = ?, email = ? WHERE id = ?', [updateUser.username, updateUser.email, updateUser.id], (err) => {
    if (err) throw err;
    console.log('성공적으로 업데이트 완료');
});

// 사용자 삭제
const deleteUser = {
    id: 2,
};

db.run('DELETE FROM users WHERE id = ?', [deleteUser.id], (err) => {
    if (err) throw err;
    console.log('사용자 삭제 성공');
});

// 모든 사용자 조회
db.all('SELECT * FROM users', (err, rows) => {
    if (err) throw err;
    console.log('사용자 조회: ', rows);
});
