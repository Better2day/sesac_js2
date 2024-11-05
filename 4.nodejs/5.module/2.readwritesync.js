const fs = require('fs');

// 파일 읽기
try {
    const data = fs.readFileSync('example.txt', 'utf8'); // 동기 함수. 작업이 끝날 때까지 대기. 그동안 다른 작업 진행 안 됨
    console.log(data);
} catch (e) {
    console.error('파일을 읽는데 실패함', e.message);
}

// 파일 쓰기
const content = '이것이 파일에 쓰일 내용.....';
fs.writeFileSync('newfile.txt', content);

console.log('쓰기 완료');
