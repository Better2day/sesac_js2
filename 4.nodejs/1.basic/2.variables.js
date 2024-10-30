// 1. 숫자형 변수
let a = 10;
// 부동소수점
let pi = 3.14;

let sum = a + pi;
console.log(sum);

// 상수 = 변경할 수 없음
const gravity = 9.81;
//gravity = 10;

console.log("오류 발생 이후");

// boolean
let isLogged = true;
if (isLogged) {
    console.log("사용자가 로그인하였습니다");
} else {
    console.log("로그인이 필요합니다");
}

// 변수의 scope
var globalA = 10; // 전역 변수. FE에서 변수를 어디서나 쉽게 선언해서 쓰려고 사용. BE에서는 웬만하면 사용하지 않는 게 좋다.
let globalB = 20; // BE에서의 글로벌 변수. BE에서는 웬만하면 let과 const만 사용한다고 생각하는 게 버그를 줄일 수 있는 길!

function myfunction() {
    let localC = 30; // 로컬 변수 (지역 변수)
    console.log(`글로벌A: ${globalA}, 글로벌B: ${globalB}, 로컬C: ${localC}`);
}

console.log(`글로벌A: ${globalA}, 글로벌B: ${globalB}`); // 지역 변수를 함수 바깥에서 참조해서 오류
myfunction(); // 이건 localC를 참조하지만, 그 변수가 선언된 함수 안에서 참조하기 때문에 정상 실행됨
// console.log(`글로벌A: ${globalA}, 글로벌B: ${globalB}, 로컬C: ${localC}`); // 지역 변수를 함수 바깥에서 참조해서 오류


