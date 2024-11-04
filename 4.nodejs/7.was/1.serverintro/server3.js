const fs = require('fs');
const http = require('http');

// fs 콜백 기반의 비동기 함수를 Promise를 통해서 동기 처리
// 일종의 status를 ~~ 
function readFilePromise(filePath) {
    return new Promise((resolve, reject) => {
        fs.readFile(filePath, (err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        });
    });

}

// const dataToRender = fs.readFileSync('./index.html', 'utf8');
http.createServer(async (req, res) => {
    try {
        const data = await readFilePromise('./index.html');
        res.writeHead(200, {'Content-Type':'text/html; charset=utf-8'});
        res.end(data);
    } catch (err) {
        console.error(err);
        res.writeHead(500, {'Content-Type':'text/html; charset=utf-8'});
        res.end('알 수 없는 서버 오류가 발생했습니다. 관리자에게 문의하십시오');
    }


    // HTML 등 파일로부터 컨텐츠를 읽어오고, 그 내용을 여기에서 전달해주면 끝
    // fs.readFile('./index.html', (err, data) => {
/*         
        if (err) {
            console.log(err);
            res.writeHead(500, {'Content-Type':'text/html; charset=utf-8'});
            res.end('알 수 없는 서버 오류가 발생했습니다. 관리자에게 문의하십시오');
        } else {
            res.writeHead(200, {'Content-Type':'text/html; charset=utf-8'});
            res.end(data);
        }
 */
    // });
    
    // res.write(dataToRender); // 동기 함수 썼을 때
    /* 
    res.write('<H1>안녕</H1>'); // 이렇게 하면 번거롭고, 복잡
    res.write('<H1>안녕</H1>');
    res.write('<H1>안녕</H1>');
    // res.end('<P>Hello Again on Port 3000</P>');
    */
    // 이전 server.on('request', (req, res) => { }); 과 같은 동작. 하지만 압축해서 만든 것
}).listen(3000, () => {
   console.log('Server is listening on port 3000');
});
