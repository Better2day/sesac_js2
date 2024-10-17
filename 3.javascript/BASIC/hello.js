console.log('hello');

let score = 75;

if (score >= 90) {
    console.log('A');
} else if (score >= 80) {
    console.log('B');
} else {
    console.log('C');
}

for (let i = 5; i >= 1; i -= 1) {
    console.log(i);
}

let count = 1;
while (count <= 5) {
    console.log("While Loop 반복중: ", count);
    // count = count + 1;
    // count += 1;
    count++;
}

console.log(('b' + 'a' + + 'a' + 'a').toLowerCase());