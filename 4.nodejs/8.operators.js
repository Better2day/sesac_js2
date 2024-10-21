let a = 10;
let b = 5;

console.log(a + b);
console.log(a - b);
console.log(a * b);
console.log(a / b);
console.log(a % b); // 모듈러 연산나. 나눈 이후 나머지 값
console.log(a ** b); // a의 b제곱. 10^5 승을 의미.

let x = 10;
x += 5; // x = x + 5;
console.log(x);

x -= 3; /// x = x - 3;
console.log(x);

x *= 2; // x = x * 2;
console.log(x);

console.log(a > b);
console.log(a < b);

// 논리 연산자
let sunny = true;
let warm = false;

console.log(sunny && warm); // true && false = AND(1,0) = 0 = false
console.log(sunny || warm); // true || false = OR(1,0) = 1 = true

console.log('--- AND ---');
console.log(1 && 0); // 0 = false
console.log(0 && 1); // 0 = false
console.log(2 && 3); // 0 = false, 1이거나 나머지 숫자는 다 true에 해당
console.log(3 && 2); // 0 = false, 1이거나 나머지 숫자는 다 true에 해당. 다 true일 때는 뒤에 있는 숫자를 결과값으로 출력

console.log('--- OR ---');
console.log(1 || 0); // 1 = true;
console.log(0 || 1); // 1 = true;
console.log(2 || 3); // 2; // OR 연산은 앞의 조건이 참이면 뒤 조건은 확인하지도 않는다. (AND 연산과 결과값이 다르다.)
console.log(3 || 2); // 3;

console.log('--- 연산자 우선순위 ---');
console.log(2 + 3 * 2);
console.log(2 + 3 * 2 && 3 % 7 || 2* 3 && 1 * 8);
console.log(((2 + (3 * 2)) && (3 % 7)) || ((2 * 3) && (1 * 8)));
