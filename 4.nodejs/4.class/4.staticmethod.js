class MathOperations {
    static add(x, y) {
        return x + y;
    }

    static sub(x, y) {
        return x - y;
    }
}

// const sum = new MathOperations(); // 객체 생성. 실체화(instantiation)
// console.log(sum.add(2, 3));

console.log(MathOperations.add(2, 3));
console.log(MathOperations.sub(2, 4));
