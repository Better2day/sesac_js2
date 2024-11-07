const express = require('express');
const cookieParser = require('cookie-parser');

const app = express();
const port = 3000;

app.use(cookieParser());

app.get('/', (req, res) => {
    res.cookie('mycookie', 'abcd', {maxAge: 30000}); // 60000ms = 60s 
    res.cookie('username', 'user1', {maxAge: 60000});
    res.cookie('cart', ['사과우유','딸기우유','바나나우유'], {maxAge: 90000}); // 60000ms = 60s 
    res.send('쿠키를 달아서 전송');
});

app.get('/readcookie', (req, res) => {
    const myCookie = req.cookies;
    console.log(myCookie);

    res.send(`번호표(쿠키)를 잘 들고 왔군: ${JSON.stringify(myCookie)}`);
})

app.listen(port, () => {
    console.log('Server ready');
})