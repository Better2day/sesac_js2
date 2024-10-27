// async, await를 사용하려면 ES6 방식으로 import를 사용해야 한다고 함
import * as readline from 'node:readline/promises';
// import { stdin as input, stdout as output } from 'node:process';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const randomNum = Math.floor(Math.random() * 100) + 1;
// console.log(randomNum); // 빠른 테스트를 위한 엿보기
let count = 1; // 추측 횟수

// 1. async await 방식
async function getNum() {
    let userInputNum = 999;
    while (userInputNum != randomNum) {
        // 사용자 추측값 입력 받기 (랜덤값을 맞출 때까지 반복)
        // callback 함수를 인자로 주는 방식으로 호출하면 이상하게 응답이 없음
        // await rl.question('1부터 100 사이의 숫자를 맞춰보세요: ', (userInput) => { ~~ });
        const userInput = await rl.question('1부터 100 사이의 숫자를 맞춰보세요: ');
        userInputNum = parseInt(userInput, 10);
        
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
            //process.exit(0);
        }
    }
};

getNum();
