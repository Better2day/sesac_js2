const express = require('express');
const session = require('express-session');
const path = require('path');

const app = express();
const port = 3000;

// app.use(express.urlencoded({ extended: true}));
app.use(express.json());

app.use(session({
    secret: 'my-secret-key', // 내 메모리에 저장할 데이터의 암호화 키
    resave: false, // 세션 데이터가 변경되지 않았어도 다시 저장할지 여부
    saveUninitialized: true, // 초기화되지 않은 세션을 저장소에 저장할지 여부
    cookie: {
        maxAge: 60000, // 세션 유효 시간을 60초(1분)으로 설정
    }
}));

// static 폴더를 정의
// app.use('/static', express.static(path.join(__dirname, 'public')));

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
});

const users = [
    { id: 1, username: 'user1', password: 'pass1', hobby: 'sleeping' },
    { id: 2, username: 'user2', password: 'pass2', hobby: 'studying' },
    { id: 3, username: 'user3', password: 'pass3', hobby: 'walking' },
];

app.post('/login', (req, res) => {
    // 로그인 코드 개발
    const { username, password } = req.body; // Middleware로 parser 추가해야 한다.
    // const userinfo = {... req.body}? 식으로 할 수도 있음

    // 사용자가 입력한 id/pw를 위 users 자료 구조에서 검색
    /* 
    let user = null;
    for (let i = 0; i < users.length; i++) {
        if (users[i].username == username && users[i].password == password) {
            user.users[i];
            break;
        }
    }
 */
    const user = users.find((u) => u.username === username && u.password === password);

    if (user) {
        req.session.user = user;
        res.json({ message: '로그인 성공'}); // 명시하지 않아도 기본값은 200 OK
    } else {
        res.status(401).json({message: '로그인 실패'});
    }
});

app.get('/profile', (req, res) => {
    // const user = '세션에서 사용자 정보를 가져온다.';
    // const {userid, username} = req.session;
    const user = req.session;

    // if (user) {
    if (user) {
        // res.json({ username: user.username, message: '프로필 정보'});
        res.json({ username: user.username, message: '프로필 정보'});
    } else {
        res.status(401).json({ message: '인증되지 않은 사용자입니다!'});
    }
});

// 로그아웃은 어떻게?
app.get('/logout', (req, res) => {
    const user = req.session;
    if (user && user.username) { // 로그인되어 있는 사용자면
        req.session.destroy();
        res.json({ message: '로그아웃 성공'});
    } else {
        res.json({ message: '로그인한 적 없는 사용자입니다'});
    }
})

app.get('/check-login', (req, res) => {
    const user = req.session.user;

    if (user) {
        // 세션 체크해서 사용자에게 username 반납
        res.json({ username: user.username });
    } else {
        res.status(401).json({ message: '인증되지 않은 사용자입니다!'});
    }
})

app.listen(port, () => {
    console.log("Server ready")
});
