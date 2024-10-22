// 참조 오류 예제
try {
     console.log(underfinedVar);
} catch (e) {
    if (e instanceof ReferenceError) {
        console.log("참조 오류 발생!", e.message);
    } else {
        console.log("알 수 없는 오류 발생!");
    }
}

// 2. 구문 오류 예제 (SyntaxError)
try {
    sum = eval("1++2");
    console.log(sum);
} catch (e) {
    if (e instanceof SyntaxError) {
        console.log("입력하신 문법에 오류가 있습니다", e.message);
    } else {
        console.log("알 수 없는 오류 발생", e);
    }
}

// 3. 타입 오류 (TypeError)
try {
    let obj = {a:1};
    obj.method();
} catch (e) {
    if (e instanceof TypeError) {
        console.log("타입 오류 발생", e.message);
    } else {
        console.log("알 수 없는 오류 발생", e);
    }
}

// 4. 범위 오류 (RangeError)
try {
    let array = new Array(-1);
} catch (e) {
    if (e instanceof RangeError) {
        console.log("범위 오류 발생", e.message);
    } else {
        console.log("알 수 없는 오류 발생", e);
    }
}