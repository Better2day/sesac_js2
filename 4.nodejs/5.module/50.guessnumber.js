//const readline = require('readline');
import * as readline from 'node:readline/promises';
// import { stdin as input, stdout as output } from 'node:process';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const randomNum = Math.floor(Math.random() * 100) + 1;
let guessing = true;

async function getNum() {
    const guessedNum = await rl.question('1부터 100 사이의 숫자를 맞춰보세요: ');
    console.log(guessedNum);
    // const guessedNum = await rl.question('1부터 100 사이의 숫자를 맞춰보세요: ')
    //return guessedNum;
};

getNum();
//console.log();



//console.log(getNum());

// 사용자가 랜덤값을 맞출 때까지 아래 작업 반복
//while (guessing) {

    // 사용자로부터 추측값 입력받아서 비교 후 결과를 알려준다.
/* 
    rl.question('1부터 100 사이의 숫자를 맞춰보세요: ', guessNum => {
        if (guessNum > randomNum) {
            console.log('더 작은 숫자입니다.');
        } else if (guessNum < randomNum) {
            console.log('더 큰 숫자입니다.');
        } else {
            console.log('정답입니다!');
            guessing = false;
            rl.close();
        }        
    });
 */
//}

// console.log('이 줄은 언제 실행되나?');