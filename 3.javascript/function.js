function greet(name) {
    console.log('Hello' + name);
}

greet("John");
greet("Tom");
greet("shpark");
greet("kim");


// 가장 기본 함수
function add(a, b) {
    return (a + b);
}

// 변수에 함수를 담는다.
let sum = add(2, 3)
console.log(sum)
// add(5, 10)
console.log(add(2, 3))

let sum2 = function(a, b) { // 변수 sum2을 통해서 호출할 것이므로, 함수명이 필요 없다. 이름 없는 함수를 익명 함수라고 한다.
    return a + b;
}

console.log(sum2(2, 3));

// 변수에 함수를 담는데, 불필요한 function keyword를 없애기 위해서 생겨난 게? 화살표 함수.
let sum3 = (a, b) => {
    return a + b;
}

console.log(sum3(3, 4));

// 중괄호까지 없앤 게 아래 코드
let sum4 = (a, b) => (a + b);

console.log(sum4(10, 10));

console.log(4 + 3);
console.log(4 - 3);
console.log(4 * 3);
console.log(Math.round(parseInt("4") / parseInt("3")));
console.log(4 % 3);

