const express = require('express');
const sqlite3 = require('sqlite3');
const fs = require('fs');

const app = express();
const port = 3000;
const dbFile = 'mydb.db';

const db = new sqlite3.Database(dbFile);

const allowedTables = ['users', 'products', 'books'];

app.use(express.urlencoded({ extended: true }));

function initilizeDatabase() {
    const sql = fs.readFileSync('init_database.sql', 'utf8');

    db.exec(sql, (err) => {
        if (err) {
            if (err.errno === 19) {
                console.warn('초기화 이미 이전에 완료');
            } else {
                console.error('초기화 오류:', err);
            }
        } else {
            console.log('초기화 성공');
        }
    });
}

initilizeDatabase();

app.put('/users/:id', (req, res) => {
    const userId = req.params.id;
    const { username, password } = req.body;

    // 동적으로 이렇게 오는 입력값을 아래의 쿼리문으로 잘~~~ 만들려면 어떻게 해야할까??
    // 힌트: "username = ?, password = ?" <-- 이걸 입력값에 따라서 잘~~ 만들려면??

    // 입력값 받아올 변수
    let fields = [];
    let values = [];

    if (username !== undefined) {
        fields.push("username = ?");
        values.push(username);
    }

    if (password !== undefined) {
        fields.push("password = ?");
        values.push(password);
    }

    if (fields.length === 0) {
        return res.status(400).send("변경할 필드가 없다!!");
    }

    values.push(userId);

    console.log(fields.join(", "), values);

    db.run(`UPDATE users SET ${fields.join(", ")} WHERE id = ?`, values, (err) => {
        if (err) {
            console.error(err.message);
            return res.status(500).send('내부 오류');
        }
        res.send(`사용자(${userId}) 정보 업데이트 완료`);
    });
});

// 사용자 삭제하는 거 추가하기
app.delete('/users/:id', (req, res) => {
    const userId = req.params.id;
    db.run('DELETE FROM users WHERE id = ?', [userId], (err) => {
        if (err) {
            console.error(err.message);
            return res.status(500).send('내부 오류');
        }
        res.send(`사용자(${userId}) 삭제 완료`);
    })
});

app.post('/users', (req, res) => {
    const {username, password} = req.body;
    console.log(username, password);

    db.run('INSERT INTO users (username, password) VALUES (?, ?)', [username, password], function (err) {
        if (err) {
            console.error('오류!', err);
            return res.status(500).send('내부 오류');
        }
        res.send(`사용자 추가 완료: ${this.lastID}`);
    })
})

app.get('/:table', (req, res) => {
    const db_table = req.params.table;

    if (!allowedTables.includes(db_table)) {
        return res.status(401).send('Invalid table name');
    }

    const query = `SELECT * FROM ${db_table}`;
    db.all(query, (err, rows) => {
        if (err) {
            return res.send('DB조회 오류');
        }

        res.json(rows);
    })
});

app.get('/:table/:id', (req, res) => {
    const db_table = req.params.table;
    const id = req.params.id;

    if (!allowedTables.includes(db_table)) {
        return res.status(401).send('Invalid table name');
    }

    const query = `SELECT * FROM ${db_table} WHERE ID = ?`;
    db.get(query, [id], (err, row) => {
        if (err) {
            return res.send('DB조회 오류');
        }

        if (!row) {
            return res.status(404).send(`Invalid ID: ${id}`);
        }
        res.json(row);
    })
})


app.listen(port, () => {
    console.log('서버 레디');
});
