const {add, sub, mul, div} = require('./calculator');

const sum = add(5, 3);
console.log('덧셈:', sum);

const diff = sub(10, 4);
console.log('뺄셈:', diff);

let prod = mul(6, 7);
console.log('곱셈:', prod);

let quot = div(20, 4);
console.log('나눗셈:', quot);
