function sum_to_100() {
    let sum = 0;
    
console.time('for');
    for(let i = 1; i <= 1000000; i++) {
        sum += i;
    }
console.timeEnd('for');

console.time('while');
    let i = 1;
    while (i <= 1000000) {
        sum += i++;
    }
console.timeEnd('while');

console.time('while');
    let min = 1;
    let max = 1000000;

    let result = (min + max) * (max/2);
    //let result = (max % 2 == 0) ? (min + max) * (max/2) : (min + max-1) * ((max-1)/2) + max;    
    // console.log(`min = ${min}, max = ${max}, max/2 = ${max/2}, result = ${result}`);
console.timeEnd('while');

    return result;
}

console.log(sum_to_100());
