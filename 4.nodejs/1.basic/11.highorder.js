function doSomething(func) {
    console.log('내가 하고 싶은 일을 먼저 하고..');
    // 그 다음에 함수 호출하기
    func();
}

function sayHello() {
    console.log('안녕하세요?');
}

doSomething(sayHello);

// 함수를 반환하는 고차 함수. 배수기 x(곱하기) n을 해주는 함수를 만들어서 반환

function createMultiplier(multiplier) {
    return function(x) {
        return x * multiplier;
    }
}

const double = createMultiplier(2);
console.log(double(5));

// 위 두 문장을 차례대로 분석하면 우선
// 1.
/* 
createMultiplier(2) → function (x) {
                        return x * 2;
                        }
const double2 = function (x) { return x * 2 };
 */
// 2.
// double(5) = function(5) → return 5 * 2 → 반환값 10 출력
    
const quad = createMultiplier(4);
console.log(quad(5));




// 즉시 실행 함수 (수업 외)
/* 
(function sub(a, b) {
    console.log(a - b);
}) (10, 5);
 */


// init = function dupTest() { console.log('일부러 중복'); }