const express = require('express');
const sqlite3 = require('better-sqlite3');
const fs = require('fs');

const app = express();
const port = 3000;
const dbFile = 'mydb.db';

const db = sqlite3(dbFile);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

function initializeDatabase() {
    const sql = fs.readFileSync('init_database.sql', 'utf8');
    const statements = sql.split(';');
    // console.log(statements);

    try {
        db.transaction(() => {
            for (const statement of statements) {
                db.exec(statement);
            }
        })(); // 트랜잭션은 성공하면 자동 커밋, 실패하면 자동 롤백
        console.log('초기화 성공!!')
    } catch (err) {
        console.log('초기화 오류!!')
    }
};

initializeDatabase();

app.get('/users/', (req, res) => {
    try {
        // const rows = db.all('SELECT * FROM users');
        const users = db.prepare('SELECT * FROM users').all();
        res.json(users);
    } catch (err) {
        res.status(500).send('Internal Server error! 사용자 전체 조회 오류');
    }
});

app.get('/users/:id', (req, res) => {
    const userId = req.params.id;

    try {
        const user = db.prepare('SELECT * FROM users WHERE id = ?').get(userId);
        if (!user) {
            return res.status(404).send('사용자 오류!')
        }
        res.json(user);
    } catch (err) {
        res.status(500).send('Internal Server error! 사용자 조회 오류');
    }
});

app.post('/users', (req, res) => {
    const { username, password } = req.body;
    console.log(`username = ${username}, password = ${password}`);
    try {
        const insert = db.prepare('INSERT INTO users (username, password) VALUES (?, ?)').run(username, password);
        res.send(`사용자 추가 완료: ${insert.lastInsertRowid}`);
    } catch (err) {
        res.status(500).send('Internal Server error! 사용자 삽입 오류');
    }

    /*
        let fields = [];
        let values = [];

        if (username !== undefined) {

        }
     */
});

app.put('/users/:id', (req, res) => {
    const userId = req.params.id;
    const { username, password } = req.body;
    console.log(`username = ${username}, password = ${password}`);
    console.log(`req.body = ${JSON.stringify(req.body)}`);

    try {
        const user = db.prepare('UPDATE users SET username=?, password=? WHERE id=?').run(username, password, userId);
        res.send('사용자 수정 완료');
    } catch (err) {
        res.status(500).send('Internal Server error! 사용자 수정 오류');
    }
});

app.delete('/users/:id', (req, res) => {
    const userId = req.params.id;
    // console.log(`userId = ${userId}`);

    try {
        const user = db.prepare('DELETE FROM users WHERE id = ?').run(userId);
        res.send(user);
    } catch (err) {
        res.status(500).send('Internal Server error! 사용자 삭제 오류');
    }
});

app.get('/products', (req, res) => {
    const name = req.query.name;
    // console.log(`name = ${name}, type of name = ${typeof name}`);
    // console.log(`req.query = ${JSON.stringify(req.query)}`);

    try {
        if (name === undefined) {
            const rows = db.prepare("SELECT * FROM products").all();
            res.json(rows);
        } else {
        // Prepared Statement Binding 문제!
        // db.prepare("SELECT * FROM products WHERE name like '%" + name + "%'").all() // 이건 정상 작동
        // db.prepare("SELECT * FROM products WHERE name like '%?%'").all() // 이건 아래 같은 오류 발생
        // RangeError: Too many parameter values were provided (%과 ?가 붙어있으면 바인딩 오류가 발생하는 듯)
        // db.prepare("SELECT * FROM products WHERE name like ?").all(`'%${name}%'`); // 오류 없지만 결과 null
        // db.prepare("SELECT * FROM products WHERE name like ?").all(`"%${name}%"`); // "
        const rows = db.prepare("SELECT * FROM products WHERE name like ?").all(`%${name}%`);
        
        res.json(rows);
        }
    } catch (err) {
        console.log(err);
        // if (!rows) {
        //     res.status(404).send('404 Not Found')
        // } else {
        res.status(500).send('Internal Server error! 상품 조회 오류');
    }
});


app.get('/:table', (req, res) => {
    const db_table = req.params.table;

    try {
        const rows = db.prepare(`SELECT * FROM ${db_table}`).all();
        res.json(rows);
    } catch (err) {
        // if (!rows) {
        //     res.status(403).send('Forbidden')
        // }
        res.status(500).send('Internal Server error! 사용자 삭제 오류');
    }
});


app.listen(port, () => {
    console.log(`Server is running on ${port}`);
});
