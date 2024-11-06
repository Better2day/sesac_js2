const express = require('express');
const app = express();
const port = 3000;

// 미들웨어는 3개의 인수를 받는다. req, res, 나의 다음 포인트(내가 처리 후 처리 결과를 다시 넘겨줄 다음 미들웨어)
function myLogger(req, res, next) { 
    console.log(`LOG: ${req.method}, ${req.url}`);
    next();
}

function mySecurity(req, __, next) { // 안 쓰는 인수는 밑줄 처리
    console.log('나의 2번째 함수');
    console.log(`요청 시간: ${req.requestedTime}`);
    req.requestedTime = Date.now(); // 여기 넣은 것은, 다음 미들웨어 함수에서도 사용 가능
    console.log(`요청 시간: ${req.requestedTime}`);
    next();
}

function myAuth(req, __, next) { 
    console.log('나의 3번재 함수');
    console.log(`요청 시간: ${req.requestedTime}`);
    next();
}


// 미들웨어를 등록하는 곳
app.use(myLogger)
app.use(mySecurity)
app.use(myAuth)
app.use((req, res, next) => { 
    console.log('나의 4번째 함수');
    next();
})



app.get('/', (req, res) => {
    // res.send(`Hello를 요청한 시간은 ${req.requestedTime}`);
    const timeString = new Date(req.requestedTime).toLocaleString();
    res.send(`Hello를 요청한 시간은 ${timeString}`);
})

app.listen(port, () => {
    console.log("Server's running");
})