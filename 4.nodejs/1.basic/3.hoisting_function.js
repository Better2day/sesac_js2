// 다른 언어는 오류가 발생할 아래 상황을, js는 자동으로 호이스팅해서 처리해준다.
console.log(multiply(4, 2));

function multiply(x, y) {
    return x * y;
}

functionA();

function functionA() {
    functionB();
}

function functionB() {
    console.log("함수 B");
}

// 변수에 함수를 담으면?? 이런 형태는 hoisting 불가능

console.log("곱셈: ", multiply2(4, 2));

let multiply2 = function (x, y) {
    return x * y;
}
