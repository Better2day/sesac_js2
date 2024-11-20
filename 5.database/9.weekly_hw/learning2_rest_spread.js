// 1. Rest: 전달된 목록을 '배열'로 변환해준다.(함수 매개 변수일 때)
// 그 외에 배열이나 객체 리터럴 내부에서 쓸 때는, 각 객체 유형으로 변환)
function foo(... rest) { // ... 이후 공백이 한 칸 들어갔는데도 rest 인식
    console.log(rest);
}
// foo(1,2,3,4,5);
/* 
function foo_arg() {
    console.log(arguments);
}
foo_arg(1,2,3,4,5);
 */

// ※ rest는 매개변수 목록에서 한 번만 선언될 수 있고, 마지막에 있어야 한다.
// (두 번 이상 선언되거나, 처음이나 중간에 있으면 오류 발생)
function foo2(param1, param2, ...rest) {
    console.log(param1);
    console.log(param2);
    console.log(rest);
}
// foo2(1,2,3,4,5);
/* 
console.log(foo.length);  // 0 매개변수가 1개 있는데 이상하게 매개변수의 개수를 나타내는 length는 0
console.log(foo2.length); // 2 매개변수 3개인데 length 2. 배열처럼 index로 표시하나?
console.log(foo2[2]); // undefinced. 이런 식으로 매개변수에 접근할 수는 없는 듯
console.log(foo2); // [Function: foo2]
 */

// cf. Rest parameter & arguments Object
function sum1() {
    console.log(arguments);
}
// sum1(1,2);

function sum2(...args) {
    return args.reduce((pre, cur) => pre + cur, 0);
}
// console.log(sum2(1, 2, 3, 4, 5));



// 2. Spread: (ES6) 하나로 뭉쳐 있는 여러 값의 집합을 펼쳐서 개별 값의 '목록'으로 만든다. ('값'이 아니다.)
// 같은 표기(...)와 달리 Rest와 정반대 기능을 하고, 문법을 사용할 수 있는 대상은 Array, String, Map, Set,
// DOM collection (NodeList, HTMLCollection), arguments와 같이 for of로 순회할 수 있는 iterable에 한정된다.
// 결과물은 쉼표로 구분한 값의 목록을 사용하는 문맥에서만 사용 가능: 함수 호출문의 인수 목록, 배열 리터럴의 요소 목록, 객체 리터럴의 '속성' 목록
/* 
console.log(1, 2, 3);
console.log([1, 2, 3]);
console.log(...[1, 2, 3]);
console.log(typeof [1, 2, 3]); // object (JS는 Array도 순수 배열이 아니라 객체형)
console.group(..."Hello"); // H e l l o // 그런데 오류 있나? 이거 한 뒤부터, 이 아래에 있는 모든 console.log 결과 앞에 공백 2개 추가됨
 */

// console.log(... {a: 1, b: 2}); // iterable 아닌 일반 객체는 spread 문법의 대상이 될 수 없다.
// const list = ...[1,2,3]; // spread가 반환하는 것은 값의 '목록'이라서 변수에 할당 불가능
/* 
const arr = [1,2,3];
console.log(Math.max(arr)); // NaN
console.log(Math.max(...arr)); // 3

console.log(Math.max(1));
console.log(Math.max(1,2));
console.log(Math.max(1,2,3));
// console.log(Math.max()); // Infinity
 */

// Rest는 목록을 받아서 배열로 반환
function foo2(...rest) {
    console.log(rest);
}
/* 
foo2(1,2,3);
// 1) 함수 호출문의 인수 목록에서 사용
foo2(...[1,2,3]); // ↔ Spread는 배열 등 iterable을 받아서 목록으로 반환 → foo2 함수에서 rest 매개변수에 인수로 줬으므로, 결국에는 다시 배열로 출력
 */

// 2) 배열 리터럴 내부(요소 목록)에서 사용
const arr1 = [1, 4];
const arr2 = [2, 3];
const arr3 = [...arr1, ...arr2];
console.log(arr3);

arr1.splice(1, 0, ...arr2);
console.log(arr1);

const arr1Copy = [...arr1];
console.log(arr1Copy);

// 3) 객체 리터럴 내부에서 사용
// console.log(...{a: 1, b: 2}); // 객체 리터럴 자체를 풀어서(spread) 처리할 수는 없다.
// 하지만 리터럴 '내부'에서 속성을 다룰 때는 사용할 수 있다.
const obj = {x: 1, y: 2};
const copy = {...obj};
console.log(copy);

const nestedObj = {x: 1, y:2, z:{a: 3, b: 4}};
console.log(nestedObj);
const merged1 = {x: 1, y:2, ...{a: 3, b: 4}};
console.log(merged1);
const merged2 = {x: 1, y:2, ...{y: 10, b: 4}};
console.log(merged2);
const merged3 = {x: 1, y:2, ...{z: 3}};
console.log(merged3);
