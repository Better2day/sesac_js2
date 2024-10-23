function add(a, b) {
    return a + b;
}
function sub(a, b) {
    return a - b;
}
function mul(a, b) {
    return a * b;
}
function div(a, b) {
    if (b === 0) {
        return '0으로 나눌 수 없습니다.';
    } else {
        return a / b;
    }
}

module.exports = {
    add, sub, mul, div
}