try {
    // 실제 여러가지 코드 내용
    invalidFunc();
} catch (e) {
    if (e instanceof TypeError) {
        console.log("타입 오류", e.message)
    } else if (e instanceof ReferenceError) {
        console.log("참조 오류", e.message)
    } else if (e instanceof RangeError) {
        console.log("범위 오류", e.message)
    } else {
        console.log("기타 오류", e.message)
    }
}
