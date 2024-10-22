let j = 0;
while (j < 6) {
    console.log(`while 구문: ${j}`);
    j++;
}

let k = 5;
do { // 최소 한 번은 실행해야 할 때
    console.log(`do-while 구문 ${k}`);
    k++;
} while (k < 5);

for (let i = 0; i < 10; i++) {
    console.log(`for 구문: ${i}`);
    if (i == 3) {
        break; // for/dlwhile/while 어디든지 블럭을 빠져나간다.
    }    
}

for (let i = 0; i < 10; i++) {
    if (i == 3) {
        continue; // for/dlwhile/while 어디든지 해당 블럭을 흐름을 건너뛴다.
    }
    console.log(`for 구문: ${i}`);    

}