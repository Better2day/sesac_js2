const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const app = express();

// 아래와 같은 식 데이터를 줄 수 있도록 만들어야 한다.
// mock data (be/fe가 완성되지 않았다고 기다리지 않고
// mock data + curl 등을 이용해서 내가 작성한 코드 작동 여부 확인 가능)
/* 
const users = [
    { id: 1, name: 'Alice' },
    { id: 2, name: 'Bob' },
    { id: 3, name: 'Charlie' },
]
*/

const users = [
    { id: 1, name: 'Alice', email: 'alice@example.com', age: 25 },
    { id: 2, name: 'Bob', email: 'bob@example.com', age: 30 },
    { id: 3, name: 'Charlie', email: 'charlie@example.com', age: 35 },
]

// Middleware setup
// app.use(cors()); // 모든 것 다 허용 (보안 최악)
app.use(cors({
    origin: ['http://localhost:3001', 'http://127.0.0.1:3001', 'https://my-domain.com', 'http://my-domain.com'],
    methods: ['GET', 'POST'],
}));
app.use(morgan('dev')); // 기본 개발자 디버깅


// API Route setup
app.get('/api/users', (req, res) => {
    // DB가 없으니, /api/users 전체를 요청할 때는 사용자 정보 중에서 id, name만 전달한다.
    /* const users2 = users.map((u) => {
        const user2 = {
            id: u.id,
            name: u.name
        };
        return user2;
    }); */

    const users2 = users.map((u) => ({ id: u.id, name: u.name }));

    // console.log(users2);

    res.json(users2);
    // res.json(users);
});

app.get('/api/users/:userId', (req, res) => {
    const userId = parseInt(req.params.userId);
    const user = users.find((u) => u.id === userId);

    if (!user) {
        return res.status(404).json({ error: 'User not found!' });
    }

    console.log('user');

    res.json(user);;
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
