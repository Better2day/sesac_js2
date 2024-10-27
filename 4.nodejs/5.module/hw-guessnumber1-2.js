const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: '1부터 100 사이의 숫자를 맞춰보세요: ',
});

const randomNum = Math.floor(Math.random() * 100) + 1;
// console.log(randomNum); // 빠른 테스트를 위한 엿보기
let count = 1; // 추측 횟수

// 2. readline.on() 함수 방식
function getNum() {
    // 사용자 추측값 입력 받기 (랜덤값을 맞출 때까지 반복)
    rl.on('line', (userInput) => {
        const userInputNum = parseInt(userInput, 10);
        
        // 랜덤값과 입력값 비교
        if (isNaN(userInputNum)) {
            console.log('1~100 사이의 [숫자]만 입력해주세요');
        } else if (userInputNum < 1 || userInputNum > 100) {
            console.log('[1~100 사이]의 숫자만 입력해주세요');
        } else if (userInputNum > randomNum) {
            count++;
            console.log('더 작은 숫자입니다.');
        } else if (userInputNum < randomNum) {
            count++;
            console.log('더 큰 숫자입니다.');
        } else {
            console.log(`정답입니다! ${count}번 만에 맞췄습니다.`);
            rl.close();
            // process.exit(0);
        }

        rl.prompt();
    }).on('close', () => {
        process.exit(0);
    });
};

rl.prompt();
getNum();
