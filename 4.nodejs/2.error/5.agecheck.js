// 살아있는 사람의 나이... 999
// 이 함수를 호출하는 사람은 에러 처리를 해야 함 (handling)
// 내가 가져다 쓰는 라이브러리
function checkAge(age) {
    if (age < 0 || age > 150) {
        throw new Error('유효하지 않는 나이입니다');
    }
    return `나이는 ${age}입니다`;
}

console.log(checkAge(10));
console.log(checkAge(55));
console.log(checkAge(99));

try {
    console.log(checkAge(-1));
} catch (e) {
    console.log('오류 발생: ', e.message);
}
