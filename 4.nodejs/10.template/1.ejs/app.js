const express = require('express');
const app = express();

// express's view engine으로 ejs를 사용할 것이라고 설정
app.set('view engine', 'ejs');

// EJS 문법
// <%= 변수명 %>
// <%# 주석 %>
// <% 로직 %>

app.get('/', (req, res) => {
    res.render('index', {title: '익스프레스 웹 (타이틀)', message: 'Welcome to EJS. (메시지)'});
});

app.get('/fruits', (req, res) => {
    const fruits = ['Apple', 'Banana', 'Orange', 'Grapes']
    res.render('fruits', {fruits: fruits});
});

app.get('/greeting', (req, res) => {
    const username = 'js'; // DB 배운 이후에는 DB에서 가져올 것
    res.render('greeting', {username: username});
});

app.get('/welcome', (req, res) => {
    const isAdmin = false; // 나중에는 실제 사용자 권한
    // res.render('welcome', {isAdmin: isAdmin});
    res.render('welcome', { isAdmin }); // 똑같으면 축약 가능. 그러나 실무에서는 헷갈리므로 따로 쓰기도 함
});

app.listen(3000, () => {
    console.log("Server's ready");
});
