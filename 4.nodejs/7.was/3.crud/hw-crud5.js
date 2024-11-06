const fs = require('fs').promises;
const http = require('http');
const path = require('path');

const HTTP_RESPONSE_STATUS_CODE = {
    '200': 'OK',
    '301': 'Moved Permanentliy',
    '400': 'Bad Request',
    '401': 'Unauthorized',
    '403': 'Forbidden',
    '404': 'Not Found',
    '500': 'Internal Server Error',
    '502': 'Bad Gateway',
    '503': 'Service Unavailable',
    '504': 'Gateway Timeout',
};
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



// 오류 처리 사용자 함수
function handleError(err = 'Error', res, statusCode) {
    console.error(err);
    res.writeHead(statusCode); // 헤더에 HTTP Response Status Code, 바디에 상응하는 오류 메시지를 넣어서 전송하면서 응답 종료
    res.end((HTTP_RESPONSE_STATUS_CODE.statusCode) ? HTTP_RESPONSE_STATUS_CODE.statusCode : '알 수 없는 오류');
}

// 요청 파일 응답 사용자 함수
async function dispatchFile(filepath, res) {
    const data = await fs.readFile(filepath, 'utf-8');
    res.end(data);
}

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
            handleError(res, '404');
            // res.writeHead(404);
            // res.end('Not Found');
        }
        // res.end('GET 요청 응답 완료');
    } catch (err) {
        handleError(err, res, '500');
        // console.error(err);
        // res.writeHead(500);
        // res.end('알 수 없는 오류 발생');
    }
}

function handlePostRequest(req, res) {
    try {
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
                    handleError(res, '404');
                    return -1;
                    // res.writeHead(404);
                    // return res.end('모르는 유형');;
                }
                console.log('req.on("end") 끝');
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
    try {
        if (req.url === '/user') {

        }

    } catch (err) {
        handleError(err, res, '500');
    }
    res.end('DELETE 요청 응답 완료');
}
