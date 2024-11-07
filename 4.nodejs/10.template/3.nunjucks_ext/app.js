// npm i express nunjucks // 동시에 설치 가능
const express = require('express');
const nunjucks = require('nunjucks');

const app = express();

// app.set('view engine', 'njk');
app.set('view engine', 'html');

nunjucks.configure('views', {
    autoescape: true, // 입력값 처리할 때 XSS 같은 것 발생하지 않도록 처리하는 기능
    express: app,
    // watch: true // template file 변경되면 자동 감지
});

app.get('/', (req, res) => {
    const data = {
        title: 'My Page',
        content: 'This is my content page',
    };

    res.render('main', data);
});


app.get('/user', (req, res) => {
    const data = {
        title: '사용자 페이지',
        content: 'This is my user page',
    };

    res.render('user', data);
});

app.get('/product', (req, res) => {
    const data = {
        title: '상품 페이지',
        content: 'This is my product page',
    };

    res.render('product', data);
});

app.get('/page1', (req, res) => {
    const data = {
        title: '상속하는 형태',
        content: 'This is 상속받은 page1 content page',
    };

    res.render('page1', data);
});

app.get('/page2', (req, res) => {
    const data = {
        title: '상속하는 형태',
        content: 'This is 상속받은 page2 content page',
    };

    res.render('page2', data);
});

app.get('/page3', (req, res) => {
    const data = {
        title: '상속하는 형태',
        content: 'This is 상속받은 page3 content page',
    };

    res.render('page3', data);
});



app.listen(3000, () => {
    console.log("Server's ready");
});