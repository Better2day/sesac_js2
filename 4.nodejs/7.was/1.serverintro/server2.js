const http = require('http');

http.createServer((req, res) => {
    res.writeHead(200, {'Content-Type':'text/html; charset=utf-8'});
    res.end('<P>Hello Again on Port 3000</P>');
    // 이전 server.on('request', (req, res) => { }); 과 같은 동작. 하지만 압축해서 만든 것
}).listen(3000, () => {
   console.log('Server is listening on port 3000');
});

http.createServer((req, res) => {
    res.writeHead(200, {'Content-Type':'text/html; charset=utf-8'});
    res.end('<P>Hello Again on Port 4000</P>');
    // 이전 server.on('request', (req, res) => { }); 과 같은 동작. 하지만 압축해서 만든 것
}).listen(4000, () => {
   console.log('Server is listening on port 4000');
});

http.createServer((req, res) => {
    res.writeHead(200, {'Content-Type':'text/html; charset=utf-8'});
    res.end('<P>Hello Again on Port 5000</P>');
    // 이전 server.on('request', (req, res) => { }); 과 같은 동작. 하지만 압축해서 만든 것
}).listen(5000, () => {
   console.log('Server is listening on port 5000');
});
