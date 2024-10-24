function greet(name, callback) {
    const message = `안녕, ${name}`;

    callback(message);
}

function displayGreeting1(greeting) {
    console.log(greeting);
}

function displayGreeting2(greeting) {
    console.log(`<H1>${greeting}</H1>`);
}

greet('홍길동', displayGreeting1);
greet('홍길동', displayGreeting2);

function add(a, b, callback) {
    const sum = a + b;
    callback(a, b, sum);
    //return sum;
}

function displaySum(a, b, result) {
    console.log(`두 수 (${a}, ${b})의 합은 ${result} 입니다.`);    
}

add(3, 4, displaySum)
/* 
const result = add(3, 4);
console.log(`두 수의 합은 ${result} 입니다.`);
 */
