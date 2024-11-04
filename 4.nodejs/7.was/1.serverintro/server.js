const http = require('http');

const server = http.createServer();

server.listen()

server.on('connection', () => {
    console.log('새로운 사용자가 접속합니다.');
});

server.on('request', (req, res) => {
    console.log('요청이 왔습니다.'); // req는 정보 너무 많아서 생략
/* 
    console.log('req 중에서 유용한 정보');
    console.log(`req.method = ${req.method}`);
    console.log(`req.url = ${req.url}`);
    console.log(req.headers);
    console.log(`req.headers = ${req.headers}`);
    console.log(`req.headers = ${JSON.stringify(req.headers)}`);
    console.log(`req.headers['user-agent'] = ${req.headers['user-agent']}`);
    console.log(`req.headers['content-type'] = ${req.headers['content-type']}`);
    console.log(`req.socket.remoteAddress = ${req.socket.remoteAddress}`);
     */

    // Header
    res.writeHead(200, { 'Content-type': 'text/html; charset=utf-8' });
    res.write('<H1>헬로우 노드</H1>');
    res.write('<H2>헬로우 노드</H2>');
    res.end('<P>안녕</P>');

    console.log('나의 요청에 대한 응답 처리 완료');

    req.on('close', () => {
        console.log('클라이언트 접속 종료');
    });
})
// 3000번 port를 listen하고 있는 연결 인터페이스
// Node.js Application이 O/S에 요청.
server.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});

server.on('close', () => { // Ctrl + C 등으로 강제 종료했을 때는 실행 안 됨
    console.log('서버가 종료되었습니다');
});

/* 
// 우리 서버를 10초 뒤에 종료되도록 설정
const timer = setTimeout(() => {
    console.log('10초가 지나서 서버를 종료합니다...');
    server.close();
}, 10000);
 */

// 'q' 키를 누르면 종료되도록 설정
// (수업 때문에 중간에 불러왔지만, 실무에서 코드 중간에 갑자기 require로 외부 모듈을 불러오는 건 좋지 않다.)
const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

rl.on('line', input => {
    if (input === 'q') {
        console.log('q키가 입력되었습니다.');
        server.close();
        rl.close();
    }

})

console.log('서버 프로그램이 시작되었습니다');
