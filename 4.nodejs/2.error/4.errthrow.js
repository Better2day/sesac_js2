// 1. 문자열을 반환하는 에러 처리 방식 - 비추천
function divide(a, b) {
    try {
        if (b === 0) {
            throw '0으로 나눌 수 없습니다. (문자열을 반환하는 에러 처리(비추천))';
        }
        return a / b;
    } catch (e) {
        return "오류 발생: " + e;
    }
}

console.log(divide(5, 0));

// 2. 오류를 Error 객체에 담아서 반환(던지기)하는 에러 처리 방식
function divide2(a, b) {
    try {
        if (typeof a !== 'number' || typeof b !== 'number') {
            throw new Error('숫자만 입력하세요');
        }
        if (b === 0) {
            throw new Error('0으로 나눌 수 없습니다. (Error 객체를 통한 에러 처리)');
        }
        return a / b;
    } catch (e) {
        return "오류 발생: " + e.message;
    } finally {
        console.log("이 블록은 오류 발생 여부와 무관하게 실행됨");
    }
}

console.log(divide2(10, 2));
console.log(divide2(5, 7));
console.log(divide2(5, 0)); // 실패
console.log(divide2(5, "7")); // 이런 건 어떻게?

console.log('에러 처리 이후 코드도 정상 작동');
