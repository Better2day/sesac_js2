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

new Promise((resolve, reject) => {
    console.log('소스 코드 맨 아랫 줄. Promise 객체 생성중. 이거 바로 실행?');
});