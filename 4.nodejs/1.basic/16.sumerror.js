let sum = 0; // 이렇게 일반 형태로 하면 0.1을 10번 더한 게 1이 아니라 0.999... 형태로 나옴 (0.1을 2진수로 처리 불가능)
let sum = BigInt(0);
for (let i = 0; i < 10; i++) {
    sum += 0.01;
}

console.log(sum);
