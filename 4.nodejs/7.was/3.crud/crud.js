const fs = require('fs').promises;
const http = require('http');
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
        res.writeHead(405);
        res.end('Method Not Allowed');
    }
});

server.listen(3000, () => {
    console.log('Server is listening on 3000 port');
})

async function handleGetRequest(req, res) {
    // console.log(req.headers['content-type']);
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
        } else if (req.url.startsWith('/static')) {
            // static file 전달
            const filePath = path.join(__dirname, req.url); // __dirname: 현재 작업 폴더
            // console.log(filePath);
            try {
                const data = await fs.readFile(filePath);
                res.writeHead(200, {'Content-Type': 'application/json; charset=utf-8'});
                res.end(data);
            } catch {
                res.writeHead(404);
                res.end('Not Found');
            }
        } else {
            res.writeHead(404);
            res.end('Not Found');
        }
        // res.end('GET 요청 응답 완료');
    } catch (err) {
        handleError(err, res, '500');
        console.error(err);
        res.writeHead(500);
        res.end('알 수 없는 오류 발생');
    }
}

function handlePostRequest(req, res) {
    try {
        if (req.url === '/user') {
            let body = '';
            req.on('data', data => body += data);
            req.on('end', () => {
                // 데이터(chunk)가 다 쌓였을 때 할 일 작성
                // console.log(req.headers['content-type']);
                if (req.headers['content-type'] === 'text/plain') {
                    return res.end('plaintext로 데이터 요청');
                } else if (req.headers['content-type'] === 'application/json') {
                    const parsedData = JSON.parse(body);
                    const username = parsedData.name;
                    users[username] = username;
                    return res.end(`application/json 데이터 요청. body: ${body}, json: ${parsedData}`);
                } else if (req.headers['content-type'] === 'application/x-www-form-urlencoded') {
                    res.writeHead(200, {'Content-Type': 'application/json; charset=utf-8'})
                    return res.end('form으로 데이터를 잘 받았음');
                } else {
                    res.writeHead(404);
                    return res.end('모르는 유형');;
                    return -1;
                }
                // console.log('req.on("end") 끝');
            })

        }
    } catch (err) {
        handleError(err, res, '500');
    }
    // res.end('POST 요청 응답 완료');
}

function handlePutRequest(req, res) {
    res.end('PUT 요청 응답 완료');
}

function handleDeleteRequest(req, res) {
    if (req.url.startsWith('/user')) {
        const username = path.basename(req.url);
        if (username && users[username]) {
            delete users[username];
            res.writeHead(200, {'Content-Type': 'text/plain; charset=utf-8'});
            res.end(`${username} 삭제 성공`);
        } else {
            res.writeHead(200, {'Content-Type': 'text/plain; charset=utf-8'});
            res.end(`${username} 사용자를 찾을 수 없습니다.`);
        }
    } else {
        res.writeHead(404);
        res.end('Not Found');
    }
}
