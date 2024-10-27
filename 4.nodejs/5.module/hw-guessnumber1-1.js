const readline = require('readline');
// await, async를 사용하려면 ES6 방식으로 import를 사용해야 함
//  import * as readline from 'node:readline/promises';
// import { stdin as input, stdout as output } from 'node:process';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: '1부터 100 사이의 숫자를 맞춰보세요: ',
});

const randomNum = Math.floor(Math.random() * 100) + 1;
console.log(randomNum);
let count = 0;
let guessing = true;

// 1. async await 방식
async function getNum() {
    // const guessedNum = await rl.question('1부터 100 사이의 숫자를 맞춰보세요: ')
    // const userInput = await rl.question('1부터 100 사이의 숫자를 맞춰보세요: ', () => {
        while (guessing) {

        };
        // 사용자 추측값 입력 받기 (랜덤값을 맞출 때까지 반복)
        await rl.question('1부터 100 사이의 숫자를 맞춰보세요: ', (userInput) => {
        // let userInput = await rl.question('1부터 100 사이의 숫자를 맞춰보세요: ');
        
            const userInputNum = parseInt(userInput);
            console.log(userInputNum);
            
            // 랜덤값과 입력값 비교
            if (userInputNum > randomNum) {
                console.log('더 작은 숫자입니다.');
            } else if (userInputNum < randomNum)  {
                console.log('더 큰 숫자입니다.');
            } else {
                console.log('정답입니다!');
                guessing = false;
                rl.close();
                process.exit(0);
            }
            
            getNum();
        });
    // }
    //console.log('await method 탈출!');
    
};

getNum();
