// 입력값을 인자로 받아서 처리
function sum_to_n(n) {
    let sum = 0;

    for(let i = 1; i <= n; i++) {
        sum += i;
    }
    
    return sum;
}

function sum2_to_n(n) {
    let i = 1;
    let sum = 0;
    while (i <= n) {
        //sum += i++; // C 스타일인데, 지금 시대에는 의미가 확실한 코드를 선호한다고 한다. (요새는 옛날 C 스타일을 잘 사용하지 않는다고 한다.)
        sum += i;
        i++;
    }
    return sum;
}

function sum3_to_n(n) {
    let min = 1;
    let max = n;

    let sum = (min + n) * (n/2);
    //let result = (max % 2 == 0) ? (min + max) * (max/2) : (min + max-1) * ((max-1)/2) + max;    
    // console.log(`min = ${min}, max = ${max}, max/2 = ${max/2}, result = ${result}`);
    return sum;
}


sum2_to_n(1_000_000_000);
sum_to_n(1_000_000_000);

console.time('while');
console.log(sum2_to_n(1_000_000_000));
console.timeEnd('while');

console.time('for');
console.log(sum_to_n(1_000_000_000));
console.timeEnd('for');

console.time('gauss');
console.log(sum3_to_n(1_000_000_000));
console.timeEnd('gauss');
