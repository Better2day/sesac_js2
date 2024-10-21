function doSomething(func) {
    console.log('내가 하고 싶은 일을 먼저 하고..');
    // 그 다음에 함수 호출하기
    func();
}

function sayHello() {
    console.log('안녕하세요?');
}

doSomething(sayHello);

// 함수를 반환하는 고차 함수. 배수기. x n을 해주는 함수를 만들어서 반환
function createMultiplier(multiplier) {
    return function (x) {
        return x * multiplier;
    };
}

const double = createMultiplier(2);
console.log(double(5));
const quad = createMultiplier(4);
console.log(quad(5));
