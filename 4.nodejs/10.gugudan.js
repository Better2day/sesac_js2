
function gugudan() {
    for (let i = 2; i < 10; i++) {
        console.log (`=== ${i}단 ===`);
        for (let j = 1; j < 10; j++) {
            console.log(`${i} * ${j} = ${i*j}`);
        }
        console.log('');
    }
}


gugudan();

function gugudan_n(dan) {
    console.log (`\n=== ${dan}단 ===`);
    for (let j = 1; j < 10; j++) {
        console.log(`${dan} * ${j} = ${dan*j}`);
    }
    console.log('');
}

gugudan_n(2);

const obj = {};
console.log(obj);
obj.prop = 123;