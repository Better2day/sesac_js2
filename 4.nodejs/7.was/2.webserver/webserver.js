const fs = require('fs').promises;
const path = require('path');
const http = require('http');

// const parse = require('querystring').parse; // URL Query Parameter를 파싱
const { parse } = require('querystring'); // 객체 디스트럭쳐링 (구조 분해 할당) 윗 문장과 동일한 작업 실행

const users = {};

http.createServer(async (req, res) => {
    // 만약 사용자가 /를 요청하면 index.html을 전달하고,
    // 만약 사용자가 /about을 요청하면 about.html을 전달하고
    // 만약 그 외에 나머지를 요청하면? 없다고 반납해야 한다. (404 Not Found);
    // 힌트: req.url 비교 및 console.log(req.method, req.url) 출력 결과 참고해서 작성

    const url = req.url;

    try {
        // image folder를 요청하면, 우리는 static 폴더 안에 있는 그 파일을 전달해주는 
        if (req.method === 'GET') {
            if (url === '/') {
                res.writeHead(200, {'Content-Type':'text/html; charset=utf-8'});
                const data = await fs.readFile('./index.html');            
                res.end(data);
            } else if (url === '/about') {
                res.writeHead(200, {'Content-Type':'text/html; charset=utf-8'});
                const data = await fs.readFile('./about.html');
                res.end(data);
            } else if (url === '/user') {
                res.writeHead(200, {'Content-Type':'text/html; charset=utf-8'});
                res.end(JSON.stringify(users));
            } else if (url.startsWith('/image/')) {
                res.writeHead(200, {'Content-Type':'image/jpeg; charset=utf-8'});
                // console.log(`./static/${url.slice(0,6)}`);
                const imageName = path.basename(req.url);
                const imagePath = path.join('static', imageName);
                // console.log(`이미지 파일명: ${imageName}`);
                // console.log(`이미지 경로: ${imagePath}`);
                const imageData = await fs.readFile(imagePath);
                res.end(imageData);
                //const data = await fs.readFile(`./static/${url.slice(0,6)}`);
            } else {
                res.writeHead(404, {'Content-Type':'text/html; charset=utf-8'});
                res.end('404 Not Found');
            }
        } else if (req.method === 'POST') {
            // POST 요청 처리
            if (req.url === '/user') {
                let body = '';

                req.on('data', data => {
                    body += data;
                    // console.log(`데이터를 받는 동안의 chunk: ${data}`);
                })
                req.on('end', () => {
                    const parsedObject = parse(body); // 문자열 name=aaa가 객체 타입으로 변환되었다.
                    const username = parsedObject.name;
                    users[username] = username;

                    res.writeHead(200, {'Content-Type':'text/html; charset=utf-8'});
                    res.end(`${username} 등록 성공`);
                    console.log(users);
                });

            } else {
                res.writeHead(404, {'Content-Type':'text/html; charset=utf-8'});
                res.end('404 Not Found');
            }

        } else if (req.method === 'PUT') {
            console.log('아직 할 일 없음');
        } else if (req.method === 'DELETE') {
            if (url === '/user') {
                let userToDelete = '';
                req.on('data', data => {
                    userToDelete += data;
                })
                req.on('end', () => {
                    const parsedObject = parse(userToDelete); // 문자열 name=aaa가 객체 타입으로 변환되었다.
                    const username = parsedObject.name;
                    delete users[username];
                    
                    res.writeHead(200, {'Content-Type':'text/html; charset=utf-8'});
                    res.end(`${parsedObject} 삭제 성공`);
                    console.log(users);
                })
            }    
        }
        else {
            // GET도 아니고 POST도 아니면?
            res.writeHead(404);
            res.end('Not Found');
        }
        
    } catch (err) {
        console.error(err);
        // res.writeHead(500, {'Content-Type':'text/html; charset=utf-8'});
        res.end('알 수 없는 서버 오류가 발생했습니다. 관리자에게 문의하십시오');
    }

}).listen(3000, () => {
   console.log('Server is listening on port 3000');
});
