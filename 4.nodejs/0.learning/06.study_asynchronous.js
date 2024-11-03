// 1. Promise
// new Promise(callback)
// Promise.then(callback)  // resolve() 호출시 사용할 콜백 함수
// Promise.catch(callback) // reject()  호출시 사용할 콜백 함수

/* 
const p1 = new Promise((resolve, reject) => {
    resolve('success');
});
p1.then((data) => {
    console.log(data);
});
const p2 = new Promise((resolve, reject) => {
    // reject('error');
});
p2.catch((error) => {
    console.log(error);
});
 */

/* 
const setTimeoutPromise = ms => new Promise((resolve, reject) => {
    setTimeout(resolve, ms);
});

const promise = setTimeoutPromise(0);
console.log('다른 일을 하다가 필요할 때');
console.log('then()을 호출하세요');
promise.then(() => {
    return 'a';
})
.then((data) => {
    console.log('then 실행중. data: ' + data);
    return 'b';
})
.then((data) => {
    console.log('then 실행중. data: ' + data);
    return 'c';
})
.catch((err) => {
    console.log('에러 발생시 실행! 에러 메시지: ' + err);
})
.finally((err) => {
    console.log('finally 도달!', err || '오류는 없습니다');
});
 */

/* 
setTimeoutPromise(1000).then(() => {
    console.log('1초 뒤에 실행 예정');
});
console.log('여기가 먼저 실행 예정');
 */
/* 
const main = async () => {
    await setTimeoutPromise(1000);
    console.log('1초 뒤에 실행 예정');
    console.log('나중에 실행');
}
main();
 */

/* 
var count = 0;
var cbFunc = function() {
    console.log(count);
    if(++count > 4) clearInterval(timer);
};
console.log('callback 함수 표현식과 setInterval() 호출 사이');
var timer = setInterval(cbFunc, 300);
 */
/* 
const Promise = new Promise((resolve, reject)  => {
    // Prmoise 함수의 콜백 함수 내부에서 비동기 처리를 수행한다.
    if (true) { // 비동기 처리 성공
        resolve('result');
    } else { // 비동기 처리 실패
        reject('error');
    }
});
 */
/* 
const fulfilled = new Promise(resolve => resolve(1));
console.log(fulfilled);

fulfilled.finally(() => console.log('finally'));

const resolvedPromise = Promise.resolve([1, 2, 3]);
resolvedPromise.then(console.log);
// const rejectedPromise = Promise.reject(new Error('Error!'));
// rejectedPromise.then(console.log);
const rejectedPromise = new Promise((_, reject) => reject(new Error('Error!')))
.catch(console.log);
*/

// const requestData1 = () => new Promise(resolve => setTimeout(() => resolve(1), 1500));
// const requestData2 = () => new Promise(resolve => setTimeout(() => resolve(2), 1000));
// const requestData3 = () => new Promise(resolve => setTimeout(() => resolve(3), 500));

// Call Stack, Task Queue 상태를 보면서 코드 실행 순서(특히 콜백 함수)를 확인하고 싶어서 함수명 명명
// VS Code에서 Task Queue 상태 보는 법은 아직 못 알아냄
const requestData1 = () => new Promise(function a1(resolve) {
    console.log('Promise 객체(requestData1)에 인수로 준 함수 a1 시작');
    console.log('setTimeout( function b1() { resolve(1) }, 3000) 실행 예정');
    setTimeout( function b1() { resolve(1) }, 3000);
    console.log('Promise 객체(requestData1)에 인수로 준 함수 a1 종료');});
const requestData2 = () => new Promise(function a2(resolve) {
    console.log('Promise 객체(requestData2)에 인수로 준 함수 a2 시작');
    console.log('setTimeout( function b2() { resolve(2) }, 2000) 실행 예정');
    setTimeout( function b2() { resolve(2) }, 2000);
    console.log('Promise 객체(requestData2)에 인수로 준 함수 a2 종료');});
const requestData3 = () => new Promise(function a3(resolve) {
    console.log('Promise 객체(requestData3)에 인수로 준 함수 a3 시작');
    console.log('setTimeout( function b3() { resolve(3) }, 1000) 실행 예정');
    setTimeout( function b3() { resolve(3) }, 2000);
    console.log('Promise 객체(requestData3)에 인수로 준 함수 a3 종료');});

const res = []; // 세 개의 비동기 처리를 순차 처리

/* 
requestData1()
// .then(data => {
.then(function t1(data) {
    res.push(data);
    console.log('requestData1().then() 실행중')
    return requestData2();
})
// .then(data => {
.then(function t2(data) {
    res.push(data);
    console.log('requestData2().then() 실행중')
    return requestData3();
})
// .then(data => {
.then(function t3(data) {
    res.push(data);
    console.log('requestData3().then() 실행중')
    console.log(res);
})
.catch(error => {
    console.log(error);
})
 */

/* 
Promise.all([requestData1(), requestData2(), requestData3()])
    .then(console.log)
    .catch(console.error);

Promise.all([
    new Promise((resolve) => setTimeout(() => resolve(1), 3000)),
    new Promise((_, reject) => setTimeout(() => reject(new Error('Error 2')), 2000)),
    new Promise((resolve) => setTimeout(() => resolve(3), 1000)),
])
.then(console.log)
.catch(console.error);

// Promise.all 메서드는 인수로 전달받은 iterable elements가 프로미스가 아니면
// Promise.resolve 메서드를 호출해서 프로미스로 래핑한다.
Promise.all([
    1,
    2,
    3,
])
.then(console.log)
.catch(console.error);
 */

/*
// XMLHttpRequest는 Web API라서 브라우저 환경에서만 동작한다는데,
// 웹브라우저 콘솔에서 실행해도 결과 제대로 나오지 않음 (시간 없어서 보류)
const promiseGet = url => {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', url);
        xhr.send();
        xhr.onload = () => {
            if (xhr.status === 200) {
                resolve(JSON.parse(xhr.resonse));
            } else {
                reject(new Error(xhr.status));
            }
        };
    });
};
const githubIds = ['jeresig', 'ahejlsberg', 'ungmo2'];
Promise.all(githubIds.map(id => promiseGet(`https://api.github.com/users/${id}`)))
    .then(users => users.map(user => user.name))
    .then(console.log)
    .catch(console.error);
*/

// XMLHttpRequest 비슷한 역할을 하는 fetch 함수 (IE를 제외한 모던 브라우저에서 지원한다고 한다)
// fetch('https://jsonplaceholder.typicode.com/todos/1')
//     .then(response => console.log(response));



// 2. async / await
/* 
// async 함수 선언문
async function foo(n) { return n; }
foo(99).then(v => console.log(v));

// async 함수 표현식
const bar = async function (n) { return n; };
bar(98).then(v => console.log(v));

// async 화살표 함수
const baz = async n => n;
baz(97).then(v => console.log(v));
const baz2 = async () => console.log('then에서 처리 안하고 여기서 처리하면 실행 순서 꼬임');
baz2();

// async 메서드
const obj = {
    async foo(n) { return n; }
};
obj.foo(95).then(v => console.log(v));

// async 클래스 메서드
class MyClass {
    async bar(n) { return n; }
}
const myClass = new MyClass();
myClass.bar(94).then(v => console.log(v));
 */

// 클래스의 생성자 메서드는 인스턴스를 반환하는데, async는 함수는 프로미스를 반환해야 하므로
// 클래스 생성자 메서드를 async 메서드로 만드는 것은 허용되지 않는다.
/* 
class MyClass {
    async constructor() { }
}
const myClass = new MyClass();
 */



async function foo() {
/* 
    const a = await new Promise(resolve => setTimeout(() => resolve(1), 3000));
    const b = await new Promise(resolve => setTimeout(() => resolve(2), 2000));
    const c = await new Promise(resolve => setTimeout(() => resolve(3), 1000));
    console.log(a, b, c);
     */
    const res = await Promise.all([
        new Promise(resolve => setTimeout(() => resolve(1), 3000)),
        new Promise(resolve => setTimeout(() => resolve(2), 2000)),
        new Promise(resolve => setTimeout(() => resolve(3), 1000)),
    ])

    console.log(res);
}
// foo();

async function bar(n) {
    const a = await new Promise(resolve => setTimeout(() => resolve(n), 1500));
    const b = await new Promise(resolve => setTimeout(() => resolve(a + 1), 1000));
    const c = await new Promise(resolve => setTimeout(() => resolve(b + 1), 500));

    console.log([a, b, c]);
}
// bar(1);

/* 
try {
    setTimeout(() => { throw new Error('Error!'); }, 1000);
} catch (e) {
    console.error('잡은 에러', e); // 에러 캐치 못 함
}
 */



/* 
const readline = require('readline');
const rl = readline.createInterface({
    input : process.stdin,
    output: process.stdout,
});
rl.question()
 */