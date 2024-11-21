// require('debug').
const express = require('express');
const morgan = require('morgan');
const path = require('path');

const PORT = 3000; // process.env.PORT
const app = express();

// Middleware
app.use(express.static('./'));
app.use(morgan('dev'));

// app.use(express.json());
// curl -X POST localhost:3000/api/test -H "Content-Type:application/json" -d "{\"name\":\"kim\", \"age\"":20}"
// Request body 안에 JSON 객체가 있을 때 req.body를 통해서 데이터를 얻기 위해서 필요

app.use(express.urlencoded({ extended: true }));
// curl -X POST localhost:3000/api/test -H "Content-Type:application/x-www-form-urlencoded" -d "name=kim&age=20"
// 식으로 Request body 안에 form 요청(application/x-www-form-urlencoded)이 있을 때 데이터를 얻기 위해서 필요

// cf. /test/btn 식의 요청은 /test/:btn 라우트에서 req.params.btn으로 데이터를 얻을 수 있고, (외부 모듈 불필요)
// /test?name=kim&age=20 식의 요청은 /test 라우트에서 req.query.name (or age)로 데이터를 얻을 수 있다. (외부 모듈 불필요)


// Routing

app.get('/', (req, res) => {
    res.sendFile(path.resolve('test.html')); // join(__dirname,
});

app.get('/test/:btn', (req, res) => {
/* 
    console.log(`req.params.btn = `, req.params.btn);
    console.log('req.params = ', Object.entries(req.params));
    console.log('req.query = ', Object.entries(req.query));
     */
    // const { q, sType } = decodeURIComponent(req.query); // undefined undefined
    // ※ 일반 queryParameter (queryString)은 express.json()/urlencoded() 없이 req.query 만으로 접근 가능
    const { q, sType } = req.query;
    console.log(q, sType);
    // console.log(req.query.q, req.query.sType);
    console.log(req.query);
    // console.log(decodeURIComponent(req.query)); // [object Object]
/*  // decodeURIComponent()는 queryString 요소 한 개당 한 번씩 호출 / 전체를 한 번에 처리하려면 아래 URLSearchParams 사용
    const queryString = new URLSearchParams(req.query);
    console.log('queryString = ', queryString);
    console.log('queryString.toString() = ', queryString.toString());
 */    
    const testObject = {
        a: 'test1',
        b: 5,
    };
    const testString = 'testString';
    let whichToSend = null;

    if (['btn1', 'btn2', 'btn3', 'btn4'].includes(req.params.btn)) {
        whichToSend = testObject; // Object
        console.log(whichToSend);
    } else if (['btn5', 'btn6', 'btn7', 'btn8'].includes(req.params.btn)) {
        whichToSend = testString; // String
        // whichToSend = JSON.stringify(testObject); // Object를 문자열화
        console.log(whichToSend);
    }

    if (['btn1', 'btn2', 'btn5', 'btn6'].includes(req.params.btn)) {
        res.json(whichToSend); // res.json()
    } else if (['btn3', 'btn4', 'btn7', 'btn8'].includes(req.params.btn)) {
        res.send(whichToSend);
        // res.send(JSON.stringify(whichToSend));
    }

    res.json({ message: 'OK'});
/*         
        btn1: res.json(testObject), // 객체를 res.json으로 응답
        btn2: res.json(testObject), // 객체를 res.json으로 응답
        btn3: res.send(testObject), // 객체를 res.send로 응답
        btn4: res.send(testObject), // 객체를 res.send로 응답
        btn5: res.json(testString), // 문자열을 res.json으로 응답
        btn6: res.json(testString), // 문자열을 res.json으로 응답
        btn7: res.send(testString), // 문자열을 res.send로 응답
        btn8: res.send(testString), // 문자열을 res.send로 응답
 */
});

app.post('/api/test', (req, res) => {
    console.log('POST route /api/test 내부');
    console.log(req.body);
    // console.log(req.body.name);
    res.send({message: "?"});
});

app.listen(PORT, () => {
    console.log(`Server is listening on ${PORT}`);
});
