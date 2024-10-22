// 직접 필요한 곳에 try-catch를 통해서 오류 해결하기

const scores = [85, 90, 'invalid', 78, 88 ]; // 국영수과
let sum = 0;
let validNum = 0;

// 학생 시험 점수의 합산 구하기
for (let i = 0; i < scores.length; i++) {
    try {
        if (typeof scores[i] !== 'number') {
            throw new Error(`숫자가 아닌 값이 입력되었습니다: 입력된 문자열 ${scores[i]}, ${i}번째 입력값`);
        }
        sum += scores[i];
        validNum++;
    } catch (e) {
        console.log('에러 발생: ' + e.message);
    }
    
}

console.log("합산은: ", sum, validNum);

const average = sum / validNum;

 try {
    const average = sum / validNum;
} catch (e) {
    if (e instanceof TypeError) {
        console.log('타입 오류입니다. ', e.message);
    }
}


if (average >= 80) {
    console.log('합격입니다');
} else {
    console.log('불합격입니다');
}

console.log('평균은: ', average);
// console.log(('b'+'a'+ +'a'+'a').toLowerCase());
