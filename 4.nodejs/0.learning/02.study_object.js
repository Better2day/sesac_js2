// 자습 - 객체 (배열, 객체 리터럴)

// 배열에는 JS의 모든 자료형을 넣을 수 있다. (복합 가능)
const array1 = []; // 빈 배열은 나중에 데이터를 동적으로 추가하려고 사용
const array2 = [4, 'test', true, undefined, null, [], {}, function (){console.log('func');}, function test(){}];
const array3 = [[1, 2], {a:3, n:'test'}]; // array3[1]이 객체 리터럴. key: value 쌍으로 이뤄진 property가 들어간다.
/* 
console.log(array1);
console.log(array1[0]);
console.log(array2);
console.log(array2[3] == null);
console.log(array2[3] === null);
console.log(array2[5]);
console.log(array2[5][0]); // 배열 안의 빈 배열
console.log(array2[6]);
console.log(array2[7]);

let execFunc = array2[7];
execFunc();
console.log(execFunc()); // return 값이 없는 함수라서, 함수 실행 후 console.log 출력값은 undefined

console.log(array3);
console.log(array3[0]);
console.log(array3[0][1]);
console.log(array3[1]);
console.log(array3[1].n);
 */

// const name = 'tester';
// const year = 2024;
// Object literal을 이용한 객체 선언. 객체 속성에 변수 할당 가능
// const testObj = {
//     name: name,
//     year: year,
// };
// 객체 속성명과 변수명이 같으면 ': 변수명' 생략 가능
/* 
const testObj = { name, year, };
console.log(testObj);
delete testObj.year;
console.log(testObj);
console.log(testObj.year);
testObj.age = 30;
console.log(testObj);
 */

// 구조 분해 할당 (destructuring assignment)
/* 
const testObj = { aaa: 'test', year: 2024, };
// const aaa = testObj.aaa;
// const year = testObj.year;
const { aaa, year } = testObj;
console.log(aaa);
console.log(year);
 */



let obj = {name:'재규', age:30};
for(let key in obj) {
    // console.log(typeof key); // // key:value 쌍에서 key는 string
    console.log(`obj.${key} == ${obj.key}`);  // key 부분이 문자열이라서 obj.'name' 인 셈이라서 오류 발생
    console.log(`obj.${key} == ${obj[key]}`); // 객체 리터럴을 배열 형태로 참조하는 것은 원래 [] 안에 문자열이 들어가서 정상 실행 가능


}

// array3.forEach()


// Computed Property
let a = 'age';

const user = {
    name: 'tester',
    [a]: 19, // Computed Property
    gender: 'male'
}

// console.log(user);

console.log(Object.keys(user));
console.log(Object.values(user));
console.log(Object.entries(user)); // [키, 값] 배열

