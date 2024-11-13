const express = require('express');
const sqlite3 = require('sqlite3');
const fs = require('fs');

const app = express();
const port = 3000;
const dbFile = 'mydb.db';

const db = new sqlite3.Database(dbFile);

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
    const { id } = req.params;
    const { username, password } = req.body;
    console.log(`id = ${id}, username = ${username}, password = ${password}`);

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

    values.push(id);

    console.log(fields.join(", "), values);

    /*
    // 내 코드
    let query = 'UPDATE users SET ';
    const args = [];

    if (username) {
        query += 'username = ?';
        args.push(username);
    }
    if (password) {
        if (username) {
            query += ', ';
        }
        query += 'password = ?';
        args.push(password);
    }
    query += ' WHERE id = ?';
    args.push(id);

    console.log(`query = ${query}`);
    console.log(typeof args);
    console.log(`args = ${args}`);
    db.run(query, args, function (err) {
        */

    db.run(`UPDATE users SET ${fields.join(", ")} WHERE id = ?`, values, (err) => {
    // db.run('UPDATE users SET username = ?, password=? WHERE id=?', [username, password, id], function (err) {
        if (err) {
            console.error('오류!', err);
            return res.status(500).send('Internal Server error')
        }
        res.send(`비밀번호 변경 완료: ${id}`);
    });
});

app.delete('/users/:id', (req, res) => {
    const userId = req.params.id;
    db.run('DELETE FROM users WHERE id = ?', [userId], (err) => {
        if (err) {
            console.error('오류!', err);
            return res.status(500).send('Internal Server error')
        }
        res.send(`사용자 ${userId} 삭제 완료`);
    })
});

app.post('/users', (req, res) => {
    const {username, password} = req.body;
    console.log(username, password);

    db.run('INSERT INTO users (username, password) VALUES (?, ?)', [username, password], function (err) {
        if (err) {
            console.error('오류!', err);
            return res.status(500).send('Internal Server error');
        }
        res.send(`사용자 추가 완료: ${this.lastID}`);
    })
});

app.get('/products', (req, res) => {
    const name = req.query.name;
    console.log(`name = ${name}, typeof name = ${typeof name}`);
        
    try {
        if (name === undefined) {
            db.all("SELECT * FROM products", function (err, rows) {
                // db.run("SELECT * FROM products WHERE name like '%?%'", [name], function (err, rows) {
                    if (err) {
                        console.error('오류 1!', err);
                        return res.status(404).send('404 Not Found!');
                    }
                    res.json(rows);
                });        
        } else {
            // Prepared Statement Binding 문제!
            // db.all("SELECT * FROM products WHERE name like '%?%'", name, ~ // SQLITE_RANGE: column index out of range error
            // db.all("SELECT * FROM products WHERE name like '%?%'", [name], ~ // SQLITE_RANGE: column index out of range error
            // db.all("SELECT * FROM products WHERE name like '%" + name + "%'", ~ // 이건 정상 작동
            // db.all("SELECT * FROM products WHERE name like ?", `'%||${name}||%'`, ~ // 오류 없지만 결과 null
            // db.all("SELECT * FROM products WHERE name like ?", `'%${name}%'`, ~ // "
            // db.all("SELECT * FROM products WHERE name like ?", [`'%${name}%'`], ~ // "
            db.all("SELECT * FROM products WHERE name like ?", `%${name}%`, function (err, rows) {
            // db.all("SELECT * FROM products WHERE name like ?", [`%${name}%`], // 정상 작동
            // db.all("SELECT * FROM products WHERE name like $name", { $name: `%${name}%`}, // 정상 작동
                if (err) {
                    console.log(rows);
                    console.error('오류 2!', err);
                    return res.status(404).send('404 Not Found!');
                }
                res.json(rows);
            });        
        }
    } catch (err) {
        console.log(err);
        if (!rows) {
            res.status(404).send('404 Not Found')
        } else {
            res.status(404).send('404 Not Found!');
        }
    }
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
    const id = req.params.id;

    if (!allowedTables.includes(db_table)) {
        return res.status(401).send('Invalid table name');
    }

    const query = `SELECT * FROM ${db_table} WHERE ID = ?`;
    db.get(query, [id], (err, row) => {
        if (err) {
            return res.send('DB 조회 오류');
        }

        if (!row) {
            return res.status(404).send(`Invalid ID: ${id}`);
        }

        res.json(row);
    });
});

app.listen(port, () => {
    console.log(`Server is running on ${port}`);
});
