const readline = require('linebyline');
var rl = readline('./example.txt'); // old한 방법
//import readline from 'readline';


rl.on('line', function(line, lineCount, byteCount) {
    console.log(line, lineCount, byteCount);
// do something with the line of text
}).on('error', function(e) {
// something went wrong
    console.log('오류 발생:', e.message);
});