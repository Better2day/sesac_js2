const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: '원하는 작업을 선택하세요: '
});

function printMenu() {
    console.log('ATM 메뉴');
    console.log('1. 잔액 확인');
    console.log('2. 입금');
    console.log('3. 인출');
    console.log('4. 종료');
};

function validateAmount(amount) {
    if (isNaN(amount)) {
        console.log('[입력 오류] 숫자로 된 금액을 입력해주세요.');
        return false;
    } else if (amount < 0) {
        console.log('[입력 오류] minus 금액은 입력하실 수 없습니다.');
        return false;
    }
    return true;
};

let menuDepth = 1; // 메뉴 단계: 메인 메뉴인지, 서브 메뉴(금액 입력 단계)인지 여부
                   // 서브 메뉴(2) 값으로 바뀌면 다음에 readline.on()을 호출할 때 메뉴 대신 금액을 입력받는다.
let curJob = 1; // 현재 처리중인 작업 (rl로 작업 종류와 금액을 모두 입력받고 있으므로,
                // 메인 메뉴에서 선택한 작업 종류를 미리 저장해둬야
                // 서브 메뉴에서 금액을 입력받을 때 현재 처리중인 작업이 무엇인지 알아서 분기 가능

function bankAtm () {
    let balance = 0; // 계좌 잔고
    printMenu();
    rl.prompt();
    
    // 사용자로부터 입력 받음
    rl.on('line', (userInput) => {
        const userInputNum = parseInt(userInput, 10);
        
        // 메인 메뉴이면 메뉴 선택
        if(menuDepth === 1) {
            if (isNaN(userInputNum)) {
                console.log('메뉴 번호를 입력해주세요 (1~4 사이의 숫자)')
            } else if (userInputNum < 1 || userInputNum > 4) {
                console.log('메뉴 번호를 입력해주세요 (1~4 사이의 숫자)')
            } else {
                curJob = userInputNum; // 현재 처리중인 작업 저장
            }
            
            if (curJob === 1) {
                console.log(`=> 현재 잔액은 ${balance}입니다`);
            } else if (curJob === 2) {
                menuDepth = 2;
                rl.setPrompt('입금할 금액을 입력하세요: ');
            } else if (curJob === 3) {
                menuDepth = 2;
                rl.setPrompt('인출할 금액을 입력하세요: ');
            } else {
                console.log('=> ATM을 종료합니다.');
                rl.close();
                process.exit();
            }

        // 서브 메뉴이면 금액 입력 및 작업에 상응하는 처리
        } else if(menuDepth === 2) {
            const amount = parseInt(userInputNum, 10);
            if (validateAmount(amount)) {
                if (curJob === 2) {
                    balance += amount;
                    console.log(`=> ${amount}원이 입금되었습니다.`);
                } else if (curJob === 3) {
                    if (amount > balance) {
                        console.log('=> 잔액이 부족합니다.');
                    } else {
                        balance -= amount;
                        console.log(`=> ${amount}원이 인출되었습니다.`);
                    }
                }
                rl.setPrompt('원하는 작업을 선택하세요: '); // 서브 메뉴 작업 후, 메인 메뉴 프롬프트로 원복
                menuDepth = 1;
            }
        }

        if (menuDepth === 1) {
            console.log('');
            printMenu();
        }
        rl.prompt();
    });
};

bankAtm();