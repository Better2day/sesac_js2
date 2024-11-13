const express = require('express');
const sqlite = require('better-sqlite3');
const fs = require('fs');

const app = express();
const port = 3000;
const dbFile = 'mydb.db';

const db = sqlite(dbFile);

const allowedTables = ['users', 'products', 'books'];

app.use(express.urlencoded({ extended: true }));

function initializeDatabase() {
    const sql = fs.readFileSync('init_database.sql', 'utf8');

    db.exec(sql, (err) => {
        if (err) {
            if (err.errno === 19) {
                console.warn('초기화 이미 완료');
            } else {
                console.log('초기화 오류: ', err);
            }
        } else {
            console.log('초기화 성공');
        }

    });
};

initializeDatabase();

app.put('/users/:id', (req, res) => {
    // 사용자 정보를 바꾸려면 어떻게 해야 할까?
    const userId = req.params.id
    const { username, password } = req.body;
    console.log(`userId = ${userId}, username = ${username}, password = ${password}`);

    // 동적으로 이렇게 오는 입력값을 아래 쿼리문으로 만들려면 어떻게 해야 할까?
    // 힌트: "username = ?, password = ?" 부분과 뒤에 오는 인자 배열을 동적으로 변경

    let fields = [];
    let values = [];

    if (username !== undefined) {
        fields.push('username = ?');
        values.push(username);
    }

    if (password !== undefined) {
        fields.push('password = ?');
        values.push(password);
    }

    if (fields.length === 0) {
        return res.status(400).send('변경할 필드가 없습니다!')
    }

    values.push(userId);

    console.log(fields.join(", "), values);

    const preparedStmt = db.prepare(`UPDATE users SET ${fields.join(", ")} WHERE userId = ?`);
    const queryResult = preparedStmt.run(values, (err) => {
        if (err) {
            console.error('오류!', err);
            return res.status(500).send('Internal Server error. Contact the admin')
        }
        console.log('수정 완료: ', queryResult);
        res.send(`비밀번호 변경 완료: ${userId}`);
    });
});

app.delete('/users/:id', (req, res) => {
    const userId = req.params.id;

    const preparedStmt = db.prepare('DELETE FROM users WHERE id = ?');
    const queryResult = preparedStmt.run([userId], (err) => {
        if (err) {
            console.error('오류!', err);
            return res.status(500).send('Internal Server error. Contact the admin')
        }
        console.log('삭제 완료: ', queryResult);
        res.send(`사용자 ${userId} 삭제 완료`);
        
    })
});

app.post('/users', (req, res) => {
    const {username, password} = req.body;
    console.log(username, password);

    const preparedStmt = db.prepare('INSERT INTO users (username, password) VALUES (?, ?)');
    const queryResult = preparedStmt.run([username, password], function (err) {
        if (err) {
            console.error('오류!', err);
            return res.status(500).send('Internal Server error. Contact the admin');
        }
        console.log('삭제 완료: ', queryResult);
        res.send(`사용자 추가 완료: ${this.lastID}`);
    })
});

app.get('/:table', (req, res) => {
    const db_table = req.params.table;
    
    if (!allowedTables.includes(db_table)) {
        return res.status(401).send('Invalid table name');
    }

    const query = `SELECT * FROM ${db_table}`;
    db.all(query, (err, rows) => {
        if (err) {
            return res.send('DB 조회 오류');
        }

        res.json(rows);
    });
});

app.get('/:table/:id', (req, res) => {
    const db_table = req.params.table;
    const tableId = req.params.id;

    if (!allowedTables.includes(db_table)) {
        return res.status(401).send('Invalid table name');
    }

    const query = `SELECT * FROM ${db_table} WHERE ID = ?`;
    db.get(query, [tableId], (err, row) => {
        if (err) {
            return res.send('DB 조회 오류');
        }

        if (!row) {
            return res.status(404).send(`Invalid ID: ${tableId}`);
        }

        res.json(row);
    });
});

app.listen(port, () => {
    console.log(`Server is running on ${port}`);
});
