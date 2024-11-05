const http = require('http');
const fs = require('fs').promises;
const path = require('path');

const users = {};

const server = http.createServer((req, res) => {
    console.log(req.method, req.url);

    if (req.method === 'GET') {
        handleGetRequest(req, res);
    } else if (req.method === 'POST') {
        handlePostRequest(req, res);
    } else if (req.method === 'PUT') {
        handlePutRequest(req, res);
    } else if (req.method === 'DELETE') {
        handleDeleteRequest(req, res);
    } else {
        res.writeHead(404);
        res.end('Not Found');
    }
});

server.listen(3000, () => {
    console.log('Server is listening on 3000 port');
})

async function handleGetRequest(req, res) {
    console.log(req.headers['content-type']);
    try {
        if (req.url === '/') {
            const data = await fs.readFile('./index.html', 'utf-8');
            res.end(data);
        } else if (req.url === '/about') {
            const data = await fs.readFile('./about.html', 'utf-8');
            res.end(data);
        } else if (req.url === '/user') {
            // console.log(users);
            res.writeHead(200, {'Content-Type': 'application/json; charset=utf-8'});
            res.end(JSON.stringify(users));
        } else {
            res.writeHead(404);
            res.end('Not Found');
        }
        // res.end('GET 요청 응답 완료');
    } catch (err) {
        console.error(err);
        res.writeHead(500);
        res.end('알 수 없는 오류 발생');
    }
}

function handlePostRequest(req, res) {
    if (req.url === '/user') {
        let body = '';
        req.on('data', data => body += data);
        req.on('end', () => {
            // 데이터(chunk)가 다 쌓였을 때 할 일 작성
            console.log(req.headers['content-type']);
            if (req.headers['content-type'] === 'text/plain') {
                return res.end('plaintext로 데이터 요청');
            } else if (req.headers['content-type'] === 'application/json') {
                const parsedData = JSON.parse(body);
                 const username = parsedData.name;
                 users[username] = username;
                return res.end(`application/json 데이터 요청. body: ${body}, json: ${parsedData}`);
            } else {            
                res.writeHead(404);
                return res.end('모르는 유형');;
            }
            console.log('req.on("end") 끝');
        })
        
    }
    // res.end('POST 요청 응답 완료');
}

function handlePutRequest(req, res) {
    res.end('PUT 요청 응답 완료');
}

function handleDeleteRequest(req, res) {
    res.end('DELETE 요청 응답 완료');
}
