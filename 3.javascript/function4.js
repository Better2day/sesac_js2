
// add(+), subtract(-), multiply(*), division(/)
// 4개의 함수를, 일반 함수 및 화살표 함수로 작성해보기

function add(a, b) {
    console.log(a + b);
    // return a + b;
}

function subtract(a, b) {
    return a - b;
}

let multiplication = function multiply(a, b) {return a * b};

function divide(a, b) {
    console.log(a % b);
}

console.log(add(2,3))
add(2,3)
console.log(subtract(3,4))
console.log(multiplication(2, 10));
//console.log();

// 화살표 함수로 4개 구현
// const addArrow = (a, b) => a + b;
// console.log(addArrow(2, 3));

// let addAroow = function add(a, b) { return a+b; }
// let addArrow = function (a, b) {return a+b; }
// let addArrow = (a, b) => {return a+b};
let addArrow = (a, b) => (a + b);
let subtractArrow = (a, b) => (a - b);

console.log(addArrow(7, 7));

// let multiplyArrow = function multi(a, b) { return a * b; }
// let multiplyArrow = function (a, b) { return a * b; }
// let multiplyArrow = (a, b) => {return a * b; }
 let multiplyArrow = (a, b) => (a * b);

console.log(multiplyArrow(10, 100));

