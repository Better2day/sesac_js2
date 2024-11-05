const fs = require('fs').promises;
const http = require('http');
const path = require('path');

const HTTP_RES_STATUS_CODE = {
    '200': 'OK',
    '301': 'Moved Permanentliy',
    '400': 'Bad Request',
    '401': 'Unauthorized',
    '403': 'Forbidden',
    '404': 'Not Found',
    '405': 'Method Not Allowed',
    '500': 'Internal Server Error',
    '502': 'Bad Gateway',
    '503': 'Service Unavailable',
    '504': 'Gateway Timeout',
};
const HTTP_REQ_HANDLER = {
    'GET': handleGetRequest(req, res),
    'POST': handlePostRequest(req, res),
    'PUT': handlePutRequest(req, res),
    'DELETE': handleDeleteRequest(req, res),
};

const users = {};

// const server = http.createServer((req, res) => {
http.createServer((req, res) => {
    console.log(req.method, req.url);

    // GET, POST, PUT, DELETE 요청은 상응하는 함수에서 처리 후 res.end()로 응답 후 종료 처리
    // ['GET', 'POST', 'PUT', 'DELETE'].includes(req.method)
    if (Object.keys(HTTP_REQ_HANDLER).includes(req.method)) {
        HTTP_REQ_HANDLER[req.method](req, res);
    } else {    
    // 여기까지 왔으면 그 외의 Request Method를 사용했다든지, 오류 발생 상황
        res.writeHead(405);
        res.end('Method Not Allowed');
    }
})
.listen(3000, () => {
    console.log('Server is listening on 3000 port');
})
// server.listen(3000, () => {  왼쪽 부분 단축하고 변수 하나 덜 쓰려고 위처럼 수정


// 오류 처리 사용자 함수
function handleError(err = 'Error', res, statusCode) {
    console.error(err);
    res.writeHead(statusCode); // 헤더에 HTTP Response Status Code, 바디에 상응하는 오류 메시지를 넣어서 전송하면서 응답 종료
    res.end((HTTP_RES_STATUS_CODE.statusCode) ? HTTP_RES_STATUS_CODE.statusCode : '알 수 없는 오류');
}

// 요청 파일 응답 사용자 함수
async function sendResource(path, res) {
    const data = await fs.readFile(filepath, 'utf-8');
    res.end(data);
}


function handleGetRequest(req, res) {
    console.log(req.headers['content-type']);
    try {
        if (req.url === '/') {
            sendResource('./index.html', res);
        } else if (req.url === '/about') {
            sendResource('./about.html', res);
        } else if (req.url === '/user') {
            // console.log(users);
            res.writeHead(200, {'Content-Type': 'application/json; charset=utf-8'});
            res.end(users);
            // res.end(JSON.stringify(users));
        } else {
            handleError(res, '404');
        }
    } catch (err) {
        handleError(err, res, '500');
    }
}

function handlePostRequest(req, res) {
    try {
        if (req.url === '/user') {
            let body = '';
            req.on('data', data => body += data);
            req.on('end', () => {
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
                }
                console.log('req.on("end") 끝');
            })
        }
    } catch (err) {
        handleError(err, res, '500');
    }
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
