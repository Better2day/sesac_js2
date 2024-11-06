const express = require('express');
const app = express();
const fs = require('fs').promises;
const path = require('path');

// 정적 폴더 정의
app.use(express.static('public')); // 내가 정한 폴더명

console.log('소스 거의 맨 앞');

app.get('/', async (req, res) => {
    const htmlfile = path.join(__dirname, 'public', 'index.html') // __dirname: 현재 폴더 경로
    console.log(`__dirname = ${__dirname}`); // 현재 출력 안 되고 있음. 왜?
    console.log(htmlfile);

    try {
        const data = await fs.readFile(htmlfile);
        console.log(`__dirname = ${__dirname}`); // 현재 출력 안 되고 있음. 왜?
        console.log(htmlfile);
        res.send(data);
    } catch (err) {
        res.status(500).send('Server Error!');
    }

});

app.get('/cat', (req, res) => {
    const htmlfile = path.join(__dirname, 'public', 'index.html') // __dirname: 현재 폴더 경로
    console.log(`__dirname = ${__dirname}`);
    console.log(htmlfile);

    fs.readFile(htmlfile, 'utf8', (err, data) => {
        if (err) {
            res.status(500).send('Server Error in /cat');
            return;
        }

        res.setHeader('Content-Type', 'text/plain');
        res.send(data);
    })
});

app.get('/sendFile', (req, res) => {
    const htmlfile = path.join(__dirname, 'public', 'index2.html');
    res.sendFile(htmlfile, (err) => {
        if (err) {
            // res.status(500).send('서버 오류');
            throw new Error('파일 없음');
        }
    });
});

// 여기까지 왔는데, 매칭되는 루트 없으면?
app.use((req, res) => {
    res.status(404).send('없음!!');
});

app.use((err, req, res, next) => {
    res.status(500).json({message: '서버 내부 오류'});
})

console.log('Listen 직전');

app.listen(3000, () => {
    console.log("Server's ready");
})

console.log('Listen 직후');