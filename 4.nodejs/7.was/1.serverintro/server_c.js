const http = require('http');
const server = http.createServer();

server.listen();
server.on('connection', () => {
    console.log('새로운 사용자가 접속합니다.');
});

server.on('request', (req, res) => {
    console.log('요청 왔숑');

    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.write('<H1>헬로우 노드</H1>');
    res.wrtie('<H2>헬로우 노드</H2>');
    res.end('<P>안녕</P>');

    
  

})