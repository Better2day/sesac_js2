const sqlite = require('better-sqlite3');

const db = sqlite('user2.db');

// 테이블 생성
db.exec(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT,
    email TEXT
)`);

// 데이터 조회
const allUsers = db.prepare('SELECT * FROM users');
const allUsersResult = allUsers.all();
console.log('모든사용자: ', allUsersResult);

// 사용자 추가
const newUser = {
    username: 'user1',
    email: 'user1@user1.com'
};
const insert = db.prepare('INSERT INTO users (username, email) VALUES (?, ?)');
const insertResult = insert.run(newUser.username, newUser.email);
console.log('사용자 추가 완료: ', insertResult.lastInsertRowid);

// 특정 사용자 조회
const userId = 1;
// const user = db.prepare('SELECT * FROM users WHERE id = ?');
// const userResult = user.get(userId);
const userResult = db.prepare('SELECT * FROM users WHERE id = ?').get(userId);
console.log('사용자 조회: ', userResult);

// 사용자 업데이트
const updateUser = {
    id: 1,
    username: 'kkk',
    email: 'kkk@kkk.com'
};
const update = db.prepare('UPDATE users SET username = ?, email = ? WHERE id = ?');
update.run(updateUser.username, updateUser.email, updateUser.id);
console.log('업데이트 완료');

// 사용자 삭제
const deleteUser = 1;
db.prepare('DELETE FROM users WHERE id = ?').run(deleteUser);
console.log('사용자 삭제');

db.close();
console.log('끝났음');
