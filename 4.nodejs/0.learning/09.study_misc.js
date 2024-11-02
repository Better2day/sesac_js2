// Truthy, Falsy
/* 
console.log(!undefined);
console.log(!null);
console.log(!NaN);
console.log(!0);
console.log(!'');
console.log(![]);
console.log(1);
console.log(!1);
console.log(!!1);
 */


// 단축 평가 논리 계산법
const dog = {
    name: '멍멍이'
};
const namelessDog = {
    name: ''
};

// && 연산자로 코드 단축시키기
function getName(animal) {
    return animal && animal.name;
}
  
const name1 = getName();
console.log(name1); // undefined
const name2 = getName(dog);
console.log(name2); // 멍멍이

// || 연산자로 코드 단축시키기
function getName2(animal) {
    const name = animal && animal.name;
    return name || '이름이 없는 동물입니다.';
}

const name4 = getName2(namelessDog);
console.log(name4); // 이름이 없는 동물입니다.


// Destructuring Assignment (구조 분해 할당)
// 구조화된 배열과 같은 이터러블 또는 객체를 비구조화(구조 파괴)하여 1개 이상의 변수에 개별 할당하는 작업
// 배열과 같은 이터러블 또는 객체 리터럴에서 '필요한 값만 추출해서 변수에 할당'할 때 유용하다.
// 1. 배열 구조 분해 할당
var arr = [1, 2, 3];
// ES5
// var one = arr[0];
// var two = arr[1];
// var three = arr[2];

// ES6 
/*
const [ one, two, three ] = arr;
console.log(one, two, three); // 1 2 3
console.log(arr);
console.log(typeof one); // number. 배열 구조 분해 할당을 했다고, one two three가 배열 요소가 되지는 않음

const [a, b] = [2, 1]; // 구조 분해 할당은 배열의 index 순서대로 할당된다.
console.log(a, b); // 2, 1
const [c, d] = [3];
console.log(c, d); // 3, undefined
const [e, f] = [4, 5, 6];
console.log(e, f); // 4, 5
const [g, , h] = [7, 8, 9];
console.log(g, h); // 7, 9

const [a, b, c = 3] = [1, 2]; // 기본값 설정
console.log(a, b, c);
const [e, f, g = 3] = [1, 2, 4]; // 기본값 설정했어도 할당값이 있으면 그게 우선
console.log(e, f, g);
*/

// 2. 객체 구조 분해 할당
// ES5
var user = { firstName: 'JK', lastName: 'Kim' };
// var firstName = user.firstName;
// var lastName  = user.lastName;
// console.log(firstName, lastName);

// ES6
var { lastName, firstName } = user; // 배열과 다르게 프로퍼티 키로 할당하므로, 순서는 의미가 없다.
console.log(firstName, lastName);
console.log(typeof firstName, typeof lastName);
var { firstName: fn, lastName: ln } = user; // 프로퍼티 키와 다른 이름의 변수로 프로퍼티 값을 할당
console.log(fn, ln);

const { firstName: fn2 = 'Gildong', lastName: ln2 = 'Hong' } = user;
console.log(fn2, ln2);

const str = 'Hello';
const { length } = str;
console.log(length);

const todo = { id: 1, content: 'HTML', completed: true };
const { id } = todo;
console.log(id);

function printTodo(todo) {
    console.log(`할 일 ${todo.content}은 ${todo.completed ? '완료' : '비완료'} 상태입니다.`);
}
printTodo({ id: 1, content: 'HTML', completed: true });

function printTodo2({ content, completed }) {
    console.log(`할 일 ${content}은 ${completed ? '완료' : '비완료'} 상태입니다.`);
}
printTodo2({ id: 1, content: 'Javascript', completed: false });

// 3. 배열 객체 혼합 
const todos = [
    { id: 1, content: 'HTML', completed: true },
    { id: 2, content: 'CSS', completed: false },
    { id: 3, content: 'JS', completed: false },
];
const [, { id: id2 }] = todos;
console.log(id2);

// 중첩 객체
const user2 = {
    name: 'Lee',
    address: {
        zipCode: '03068',
        city: 'Seoul',
    }
};
const { address: { city } } = user2;
console.log(address);