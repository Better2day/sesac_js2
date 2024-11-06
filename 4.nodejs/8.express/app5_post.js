const express = require('express');
// const bodyParser = require('body-parser'); // express 최근 버전에 포함
const app = express();
const port = 3000;

// 이 미들웨어가 body 안에 있는 내용 중에 json을 처리해서 body라는 변수에 담아준다.
// app.use(bodyParser.json());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Root');
});

app.post('/submit', (req, res) => {
    let data ='';

    req.on('data', (chunk) => (data += chunk));
    req.on('end', () => {
        try {
            const jsonData = JSON.parse(data);
            res.json({ receivedData: jsonData });
        } catch (error) {
            res.status(400).json({ error: '잘못된 형식의 JSON을 보냈나'});
        }

    })
})

app.post('/submit2', (req, res) => {
    const jsonData = req.body; // req.body에 파싱된 JSON 데이터를 담아서 보내줌. body-parser (npm)가 처리
    res.json({ receivedData: jsonData });
})

app.listen(3000, () => {
    console.log("Server's ready");
})