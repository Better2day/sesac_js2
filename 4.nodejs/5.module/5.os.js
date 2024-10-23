const os = require('os');

const hostname = os.hostname();
console.log('내 PC의 호스트명은? ', hostname);

const tmpDir = os.tmpdir();
console.log('임시 폴더 경로는? ', tmpDir);

const freemem = os.freemem();
console.log('잔여 메모리? ', freemem);

console.log('CPU는? ', os.cpus());
