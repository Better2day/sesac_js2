// 삼각형/하트 출력 함수 만들기

// 1. 먼저 함수로 각각 출력한다.

function leftTriangle() {
    let currentLine = '';
    for(let i = 0; i < 5; i++) {
        for(let j = 0; j <= i; j++) {
            currentLine += '*';
        }
        console.log(currentLine);
        currentLine = '';
    }
}

function rightTriangle() {
    let currentLine = '';
    for(let i = 5; i > 0; i--) {
        for(let j = i; j > 0; j--) {
            currentLine += '*';
        }
        console.log(currentLine);
        currentLine = '';
    }
}

function leftInvertTriangle() {
    let currentLine = '';
    for(let i = 0; i < 5; i++) {
        for(let j = 4; j > i; j--) {
            currentLine += ' ';
        }
        for(let j = 0; j <= i; j++) {
            currentLine += '*';
        }
        console.log(currentLine);
        currentLine = '';
    }
}

function rightInvertTriangle() {
    let currentLine = '';
    for(let i = 0; i < 5; i++) {
        for(let j = 1; j <= i; j++) {
            currentLine += ' ';
        }
        for(let j = 5; j > i; j--) {
            currentLine += '*';
        }
        console.log(currentLine);
        currentLine = '';
    }
}

function equalTriangle() {
    let currentLine = '';
    for(let i = 0; i < 5; i++) {
        for(let j = 4; j > i; j--) {
            currentLine += ' ';
        }
        for(let j = 1; j <= i*2+1; j++) {
            currentLine += '*';
        }
        console.log(currentLine);
        currentLine = '';
    }
}

function equalInvertTriangle() {
    let currentLine = '';
    for(let i = 0; i < 5; i++) {
        for(let j = 1; j <= i; j++) {
            currentLine += ' ';
        }
        for(let j = 1; j <= 9-i*2; j++) {
            currentLine += '*';
        }
        console.log(currentLine);
        currentLine = '';
    }
}

/* 
leftTriangle();
console.log('');
rightTriangle();
console.log('');
leftInvertTriangle();
console.log('');
rightInvertTriangle();
console.log('');
equalTriangle('');
console.log('');
equalInvertTriangle('');
*/

// 1-2. 함수화: 파라미터로 row를 입력받아서 출력한다.
function leftTriangle2(row) {
    let currentLine = '';
    for(let i = 0; i < row; i++) {
        for(let j = 0; j <= i; j++) {
            currentLine += '*';
        }
        console.log(currentLine);
        currentLine = '';
    }
}

function rightTriangle2(row) {
    let currentLine = '';
    for(let i = row; i > 0; i--) {
        for(let j = i; j > 0; j--) {
            currentLine += '*';
        }
        console.log(currentLine);
        currentLine = '';
    }
}

function leftInvertTriangle2(row) {
    let currentLine = '';
    for(let i = 0; i < row; i++) {
        for(let j = row-1; j > i; j--) {
            currentLine += ' ';
        }
        for(let j = 0; j <= i; j++) {
            currentLine += '*';
        }
        console.log(currentLine);
        currentLine = '';
    }
}

function rightInvertTriangle2(row) {
    let currentLine = '';
    for(let i = 0; i < row; i++) {
        for(let j = 1; j <= i; j++) {
            currentLine += ' ';
        }
        for(let j = row; j > i; j--) {
            currentLine += '*';
        }
        console.log(currentLine);
        currentLine = '';
    }
}

function equalTriangle2(row) {
    let currentLine = '';
    for(let i = 0; i < row; i++) {
        for(let j = row-1; j > i; j--) {
            currentLine += ' ';
        }
        for(let j = 1; j <= i*2+1; j++) {
            currentLine += '*';
        }
        console.log(currentLine);
        currentLine = '';
    }
}

function equalInvertTriangle2(row) {
    let currentLine = '';
    for(let i = 0; i < row; i++) {
        for(let j = 1; j <= i; j++) {
            currentLine += ' ';
        }
        for(let j = 1; j <= ((row*2)-1)-i*2; j++) {
            currentLine += '*';
        }
        console.log(currentLine);
        currentLine = '';
    }
}

/* 
leftTriangle2(9);
console.log('');
rightTriangle2(9);
console.log('');
leftInvertTriangle2(9);
console.log('');
rightInvertTriangle2(9);
console.log('');
equalTriangle2(9);
console.log('');
equalInvertTriangle2(9);
*/

// 3. 하트 그리기
function heart() {
    let currentLine = '';
    for(let i = 0; i < 3; i++) {
        for(let j = 3; j > i; j--) {
            currentLine += ' ';
        }
        for(let j = 1; j <= i*2+1; j++) {
            currentLine += '*';
        }
        for(let j = 1; j <= 5-i*2; j++) {
            currentLine += ' ';
        }
        for(let j = 1; j <= i*2+1; j++) {
            currentLine += '*';
        }
        console.log(currentLine);
        currentLine = '';
    }
    console.log('*************');
    for(let i = 0; i < 3; i++) {
        for(let j = 0; j < (i+1)*2; j++) {
            currentLine += ' ';
        }
        for(let j = 1; j <= 9-i*4; j++) {
            currentLine += '*';
        }
        console.log(currentLine);
        currentLine = '';
    }
}

// heart();
// console.log('');

// 4. 하트 그리기 함수화: 파라미터로 row를 입력받아서 출력한다.
function heart2(row) {
    let currentLine = '';
    for(let i = 0; i < row; i++) {
        for(let j = row; j > i; j--) {
            currentLine += ' ';
        }
        for(let j = 1; j <= i*2+1; j++) {
            currentLine += '*';
        }
        for(let j = 1; j <= ((row*2)-1)-i*2; j++) {
            currentLine += ' ';
        }
        for(let j = 1; j <= i*2+1; j++) {
            currentLine += '*';
        }
        console.log(currentLine);
        currentLine = '';
    }
    
    // 중간줄
    for(let i = 0; i < row*4+1; i++) {
        currentLine += '*';        
    };
    console.log(currentLine);
    currentLine = '';

    for(let i = 1; i <= row; i++) {
        for(let j = 1; j <= i*2; j++) {
            currentLine += ' ';
        }
        for(let j = 1; j <= 4*(row-i)+1; j++) {
            currentLine += '*';
        }
        console.log(currentLine);
        currentLine = '';
    }
}

// 중간줄 아래 줄은 loop 회차와 반비례해서 *을 반복 출력해야 한다. 4 (한 줄마다 별 증감 개수) x (row 개수 - 중간줄 아래 기준 현재 줄 번호(i)) + 1
// 1 13  4*3+1 // 1회차일 때 4 x (4줄 - 첫째줄) + 1
// 2 9   4*2+1
// 3 5   4*1+1
// 4 1   4*0+1 // 4회차일 때 4 x (4줄 - 넷째줄) + 1

heart2(4); 
console.log('');
