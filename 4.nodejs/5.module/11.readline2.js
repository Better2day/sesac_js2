const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('구구단의 단을 입력하시오: ', (input) => {
    const num = parseInt(input);
    if (isNaN(num) || num < 0 || num > 9) {
        console.log('올바른 입력값이 아닙니다.');;
        rl.close();
        return;
    }
    console.log(`${input} 단을 입력하셨습니다.`);

    // 입력받은 단의 구구단을 출력하시오.
    for (let i = 1; i <= 9; i++) {
        console.log(`${input} * ${i} = ${input * i}`);
    }

    rl.close();    
});