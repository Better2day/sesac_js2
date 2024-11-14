const express = require('express');
const sqlite3 = require('better-sqlite3');
const fs = require('fs');

const app = express();
const port = 3000;
const dbFile = 'mydb.db';

const db = sqlite3(dbFile);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

function initilizeDatabase() {
    const sql = fs.readFileSync('init_database.sql', 'utf8');
    const statements = sql.split(';');
    // console.log(statements);

    try {
        db.transaction(() => {
            for (const statement of statements) {
                db.exec(statement);
            }
        })(); // 트랜젝션은 성공하면 자동 커밋, 실패하면 자동 롤백
        console.log('초기화 성공!!');
    } catch (err) {
        console.error('초기화 오류!!');
    }
}

initilizeDatabase();

app.get('/products', (req, res) => {
    // const name = req.query.name;
    const { name } = req.query;

    console.log(name);

    if (name) {
        const query = db.prepare('SELECT * FROM products WHERE name LIKE ?');
        const rows = query.all(`%${name}%`); // all 은 [], get {}
        console.log(rows);

        res.json(rows);
    } else {
        const query = db.prepare('SELECT * FROM products');
        const rows = query.all();
        res.json(rows);
    }
});

// 매우매우 취약한 코드.. 실무에서 절대 하지 말것..
// 브라우저에 /product_weak?name=' UNION SELECT * FROM users --
app.get('/products_weak', (req, res) => {
    const { name } = req.query;

    console.log(name);
    const queryStr = `SELECT * FROM products WHERE name LIKE '%${name}%'`;
    const query = db.prepare(queryStr);
    const rows = query.all();
    res.json(rows);
});

app.get('/users', (req, res) => {
    // 여러개 반납
    try {
        const users = db.prepare('SELECT * FROM users').all();
        res.json(users);
    } catch (err) {
        res.status(500).send('내부오류');
    }
});

app.get('/users/:id', (req, res) => {
    // 하나 반납
    const userId = req.params.id;
    // const user = db.prepare('SELECT * FROM users WHERE id = ?').get(userId);
    // res.json(user);

    try {
        const user = db.prepare('SELECT * FROM users WHERE id = ?').get(userId);
        if (!user) {
            return res.status(404).send('사용자 없음');
        }
        res.json(user);
    } catch (err) {
        res.status(500).send('내부오류');
    }
});

app.post('/users', (req, res) => {
    const { username, password } = req.body;
    const insert = db.prepare('INSERT INTO users (username, password) VALUES (?, ?)').run(username, password);
    res.send(`사용자 추가 완료: ${insert.lastInsertRowid}`);
});

app.put('/users/:id', (req, res) => {
    const userId = req.params.id;
    const { username, password } = req.body;
    db.prepare('UPDATE users SET username=?, password=? WHERE id=?').run(username, password, userId);
    res.send('성공했어요');
});

app.delete('/users/:id', (req, res) => {
    const userId = req.params.id;
    db.prepare('DELETE FROM users WHERE id=?').run(userId);
});


app.get('/:table', (req, res) => {
    const db_table = req.params.table;

    try {
        const query = db.prepare(`SELECT * FROM ${db_table}`);
        const rows = query.all();
        res.json(rows);
    } catch (err) {
        res.send(`테이블이 없다: ${db_table}`);
    }
});

app.listen(port, () => {
    console.log('서버 레디');
});
