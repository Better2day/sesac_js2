const express = require('express');
const app = express();
const port = 3000;

function requestTime(req, res, next){
    req.requestedTime = Date.now();
    next();
}

// 미들웨어는 3개의 인수를 받는다. req, res, 나의 다음 포인트(내가 처리 후 처리 결과를 다시 넘겨줄 다음 미들웨어)
function myLogger(req, __, next) {
    const formattedTime = new Date(req.requestedTime).toLocaleString();
    console.log(`LOG: ${formattedTime} - ${req.method} ${req.url}`);
    next();
}


// 미들웨어를 등록하는 곳
app.use(requestTime);
app.use(myLogger);

app.get('/', (req, res) => {
    // res.send(`Hello를 요청한 시간은 ${req.requestedTime}`);
    const timeString = new Date(req.requestedTime).toLocaleString();
    res.send(`Hello를 요청한 시간은 ${timeString}`);
})

function mymiddle1(req, res, next) {
    console.log('테스트1');
    next();
}

function mymiddle2(req, res, next) {

    console.log('테스트2');
    next();
}

app.get('/about', mymiddle1, mymiddle2, (req, res) => {
    // res.send(`Hello를 요청한 시간은 ${req.requestedTime}`);
    const timeString = new Date(req.requestedTime).toLocaleString();
    res.send(`Hello를 요청한 시간은 ${timeString}`);
    test22
    
})

app.get('/error', (req, res) => {
    throw new Error('강제로 에러 유발');
})

// 에러 처리용 미들웨어 추가 - 전체 중에서 가장 마지막에 추가해야 한다.
app.use((err, req, res, next) => {
    console.error('에러 발생: ', err.message);
    res.status(500).json({ message: '내부 서버 오류'});
})

app.listen(port, () => {
    console.log("Server's running");
})