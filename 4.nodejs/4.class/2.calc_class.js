// 사용자로부터 입력받는다. 숫자와 부호와 숫자를 입력받아서 연산

class Calculator {
    add(num1, num2) {
        return num1 + num2;
    };

    subtract(num1, num2) {
        return num1 - num2;   
    };

    multiply(num1, num2) {
        return num1 * num2;   
    };
    
    divide(num1, num2) {
        if (num2 === 0) {
            return 'Error: Division by zero is not allowed';
        }
        return num1 / num2;   
    };

     calculate(num1, operator, num2) {
        switch (operator) {
            case '+':
                return this.add(num1, num2);
            case '-':
                return this.subtract(num1, num2);
            case '*':
                return this.multiply(num1, num2);
            case '/':
                return this.divide(num1, num2);
            default:
                return 'Invalid operator';
        }
        // return 0;
    }
}

/* 
class EngineeringCalculator extends GenericCalculator {
    // 추가적인 공학용 계산기 기능 구현
    exponential() {

    }

    logarithm() {

    }
}

class StandardCalculator extends GenericCalculator {
    // 제곱근, 반올림 등등
}

class ProgrammerCalculator extends GenericCalculator {
    // 비트 연산, 논리 연산 등등
}
 */

class UserInput {
    constructor(calculator) {
        this.calculator = calculator;
        this.readline = require('readline').createInterface({
            input: process.stdin,
            output: process.stdout
        });
    }

    getCalculator() {
        console.log('계산기 모드를 선택해 주세요: ');
        console.log('1. 공학용 계산기');
        console.log('2. 일반 계산기');
        console.log('3. 프로그래머 계산기');
    }

    getUserInput() {
        this.readline.question('첫 번째 숫자를 입력하시오: ', (num1) => {
            this.readline.question('연산자를 입력하시오 (+ - * /): ', (operator) => {
                this.readline.question('두 번째 숫자를 입력하시오: ', (num2) => {
                    const number1 = parseFloat(num1);
                    const number2 = parseFloat(num2);

                    const result = this.calculator.calculate(number1, operator, number2);
                    console.log(`결과: ${result}`);
                    this.readline.close();
                });
            });
        });
    }

    start() {
        this.getUserInput();
    }
}

const calculator = new Calculator();
const userInput = new UserInput(calculator);

userInput.start(); // 함수 호출
