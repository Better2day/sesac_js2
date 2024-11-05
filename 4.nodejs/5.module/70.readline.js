
const readline = require('readline');

console.log('입력값 받기 전');

function askQuestion(query) {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    return new Promise((resolve) => {
        rl.question(query, (answer) => {
            console.log(`입력한 값은: ${answer}`);
            rl.close();
            resolve(answer);
            // 실패했으면 reject() 호출. 이렇게 하려면 promise 생성자에 reject 함수도 인자로 주어야 함
        });
    });
}

// 내 안에 비동기 있다.
async function askQuestions() {
    const answer1 = await askQuestion('원하는 값 1을 입력하세요: ');
    console.log(`입력한 값 1은: ${answer1}`);
    
    const answer2 = await askQuestion('원하는 값 2을 입력하세요: ');
    console.log(`입력한 값 2은: ${answer2}`);
}

askQuestions();

/* 
askQuestion('원하는 값1을 입력하세요')
    .then((answer) => {
        console.log(`입력한 값 1은: ${answer}`);
        return askQuestion('원하는 값2을 입력하세요');
    })
    .then((answer) => {
        console.log(`입력한 값 2은: ${answer}`);
        console.log('입력 모두 종료');
    });
     */

// console.log('입력값 받은 후');
//console.log(result);

console.log('프로그램 끝');
