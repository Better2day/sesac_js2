function sayHello() {
    console.log('안녕하세요');
}

console.log('시작');
// sayHello();
setTimeout(sayHello, 2000); // 2000 ms 후에 실행
console.log('끝');
