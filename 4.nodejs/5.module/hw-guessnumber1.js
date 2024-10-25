// const readline = require('readline');
// await, async를 사용하려면 ES6 방식으로 import를 사용해야 함
 import * as readline from 'node:readline/promises';
// import { stdin as input, stdout as output } from 'node:process';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: '1부터 100 사이의 숫자를 맞춰보세요: ',
});

const randomNum = Math.floor(Math.random() * 100) + 1;
let count = 0;

// 사용자가 랜덤값을 맞출 때까지 추측값 입력 받기 → 랜덤값과 입력값 비교 작업 반복

// 1. async await 방식
/* 
let guessing = true;

async function getNum() {
    // const guessedNum = await rl.question('1부터 100 사이의 숫자를 맞춰보세요: ')
    while (guessing) {
        getNum();
    };
    
    const userInput = await rl.question('1부터 100 사이의 숫자를 맞춰보세요: ');
    const guessedNum = parseInt(userInput );
    console.log(userInput);
    
    if (guessedNum > randomNum) {
        console.log('더 작은 숫자입니다.');
    } else if (guessedNum < randomNum)  {
        console.log('더 큰 숫자입니다.');
    } else {
        console.log('정답입니다!');
        guessing = false;
        rl.close();
    }
};
 */


// 2. readline.on() 함수 방식
/* 
function getNum() {
    rl.on('line', (userInput) => {
        const guessedNum = parseInt(userInput);
        count++; // 추측 횟수

        if (guessedNum > randomNum) {
            console.log('더 작은 숫자입니다.');
        } else if (guessedNum < randomNum) {
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
 */
getNum();
