// map은 배열의 멤버에게 공통으로 원하는 함수 내용을 적용할 때 쓰는 함수

const numbers = [1,2,3,4,5];
//const doubled = numbers.map(callbackFunction); // 각각의 멤버에게 이 함수가 적용된다.

function double(n) {
    return n * 2;
}

// const doubled = numbers.map(double);
const doubled = numbers.map(n => n * 2);
console.log(doubled);

const squared = numbers.map(n => n * n);
console.log(squared);

// 객체
const people = [
    { name: "Alice", age: 25 },
    { name: "Bob", age: 30 },
    { name: "Charlie", age: 20},
    {name: "David", age: 35 }
]

// 맵을 통해서 멤버의 이름만 가져오기
const name = people.map(p => p.name);
console.log(name);

const age = people.map(p => p.age);
console.log(age);

// Quiz 1
const fruits = ['apple', 'banana', 'grape'];
// const htmlTags = fruits.map(); // 좌우를 <li> 태그로 감싸기
// 원하는 출력 형태: ["<li>apple</li>", "<li>banana</li>", "<li>grape</li>"]

console.log(fruits);
const htmlTags = fruits.map(f => `<li>${f}</li>`); // 좌우를 <li> 태그로 감싸기
console.log(htmlTags);

// Quiz 2
const apiData = [
    {id: 1, firstName: 'John', lastName: 'Doe' },
    {id: 2, firstName: 'Jane', lastName: 'Smith' }
];

// const fullName = apiData.map(); // 각각의 사용자 객체에서 정보를 가져와서 full name 만들기
const fullName = apiData.map(p => p.firstName + " " + p.lastName); // 각각의 사용자 객체에서 정보를 가져와서 full name 만들기
console.log(fullName);
// 기대 결과값: ["John Doe", "Jane Smith"]
