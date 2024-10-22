console.log(a); // var 변수 자체는 호이스팅 되지만, 해당 값은 초기화(initialize)되지 않아서 이 위치에서는 undefined 상태이다.

var a = 5;

console.log(a);

//console.log(b); // let 변수는 호이스팅되지 않는다. 그래서 언제나 사용 전에 선언해야 한다.
// BE에서는 let을 주로 사용하고, var는 없는 셈 치는 게 낫다.

let b = 7;

console.log(b);

