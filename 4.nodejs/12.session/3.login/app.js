const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs').promises;

const app = express();
const port = 3000;

// app.use(bodyParser);
app.use(express.json());
app.use(express.urlencoded({ extended: true}));

app.use(session({
    secret: 'my-secret-key', // 내 메모리에 저장할 데이터의 암호화 키
    resave: false, // 세션 데이터가 변경되지 않았어도 다시 저장할지 여부
    saveUninitialized: true, // 초기화되지 않은 세션을 저장소에 저장할지 여부
}));

app.get('/', (req, res) => {
    req.session.username = 'user1';
    req.session.cart = ['사과우유', '딸기우유', '바나나우유'];

    // 세션에 저장했지만, 자동으로 set-cookie를 통해서 session id가 전송됨
    // 이때, express에서 정한 session id가 connect.sid
    res.send(path.join(__dirname, 'public', 'login.html'));
});

app.get('/login', async (req, res) => {
    const htmlfile = path.join(__dirname, 'public', 'login.html');
    // res.send(`login page test`);

    res.sendFile(htmlfile);

/* 
    try {
        const data = await fs.readFile(htmlfile);
        res.setHeader('Content-Type', 'text/html');
        res.send(data);
    } catch (error) {
        res.status(401).send('404 Not Found');
    }
 */
});

const users = [
    { id: 1, username: 'user1', password: 'pass1' },
    { id: 2, username: 'user2', password: 'pass2' },
];

app.post('/login', (req, res) => {
    // 로그인 코드 개발
    const { username, password } = req.body; // Middleware로 parser 추가해야 한다.
    // 사용자가 입력한 id/pw를 위 users 자료 구조에서 검색 (아직 DB 배우지 않았으므로)
    // const user = '검색구현';
    console.log(req.body);

    for (let user of users) {
        // console.log(user.username, user.password);

        if (user.username === username && user.password === password) {
            console.log('로그인 성공');
            req.session.userid = user.id;
            req.session.username = user.username;

            res.json({ message: '로그인 성공'}); // 명시하지 않아도 기본값은 200 OK
            return 1;
        } else {
            // console.log('로그인 실패');
        }
    }
    // res.send('로그인 실패');
    res.status(401).json({message: '로그인 실패'});
});

app.get('/profile', (req, res) => {
    // const user = '세션에서 사용자 정보를 가져온다.';
    const {userid, username} = req.session;

    // if (user) {
    if (userid) {
        // res.json({ username: user.username, message: '프로필 정보'});
        res.json({ username: username, message: '프로필 정보'});
    } else {
        res.status(401).json({ message: '인증되지 않은 사용자입니다!'});
    }
});

// 로그아웃은 어떻게?
app.get('/logout', (req, res) => {
    // 세션에서 사용자 정보를 삭제. 어떻게? document 검색
    req.session.destroy();
    res.send('로그아웃 되었습니다.');
})

app.listen(port, () => {
    console.log("Server ready")
});
