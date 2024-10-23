const fs = require('fs');

// 파일 읽기
fs.readFile('example.txt', 'utf8', (err, data) => {
    if (err) {
        console.log('파일 읽기 실패');
    } else {
        console.log('파일 내용: ', data);
    }
});
// fs.readFileSync('example.txt', ~~ // 동기 함수. 작업이 끝날 때까지 대기. 그동안 다른 작업 진행 안 됨

const content = '파일 쓰기 테스트';
fs.writeFile('newfile.txt', content, 'utf8', (err) => {
    if (err) {
        console.log('파일을 쓰는 중 오류 발생');
    } else {
        console.log('파일에 내용이 성공적으로 쓰였습니다.');
    }
});
