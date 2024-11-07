// npm i express nunjucks // 동시에 설치 가능
const express = require('express');
const nunjucks = require('nunjucks');

const app = express();

// app.set('view engine', 'njk');
app.set('view engine', 'html');

nunjucks.configure('views', {
    autoescape: true, // 입력값 처리할 때 XSS 같은 것 발생하지 않도록 처리하는 기능
    express: app,
});

app.get('/', (req, res) => {
    // 기본값은 njk. 그래서 index.njk를 찾음
    res.render('index', {title: 'Express Web', message: 'Welcome to Nunjucks'});
    // res.render('index.html', {title: 'Express Web', message: 'Welcome to Nunjucks'});
})

app.get('/fruits', (req, res) => {
    const fruits = ['Apple', 'Banana', 'Orange', 'Grapes']
    res.render('fruits', {fruits: fruits});
});

app.get('/greeting', (req, res) => {
    const username = 'js'; // DB 배운 이후에는 DB에서 가져올 것
    res.render('greeting', {username: username});
});

app.get('/welcome', (req, res) => {
    const isAdmin = true; // 나중에는 실제 사용자 권한
    // res.render('welcome', {isAdmin: isAdmin});
    res.render('welcome', { isAdmin }); // 똑같으면 축약 가능. 그러나 실무에서는 헷갈리므로 따로 쓰기도 함
});


app.listen(3000, () => {
    console.log("Server's ready");
});