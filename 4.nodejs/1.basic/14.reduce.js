// redduce() 함수는, 전체 배열 내의 데이터를 합산 등을 통해서 누계하는 것 (accumulator)
const numbers = [1, 2, 3, 4, 5]; // 하나로 합치면? 합산

//                          이전 리턴값,  현재값        => (        함수 연산        ), 초기값
const sum = numbers.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
console.log(sum);
const sum2 = numbers.reduce((accumulator, currentValue) => accumulator + currentValue);
console.log(sum2);

// 모든 수의 곱셈
const product = numbers.reduce((accumulator, currentValue) => (accumulator * currentValue));
console.log(product);

const numbers2 = [-999, -10, -20, -8, -15];
// 저 배열에서 가장 큰 값은?
const max = numbers2.reduce((accumulator, currentValue) => accumulator = accumulator < currentValue ? currentValue : accumulator, (0, 0));
console.log(max);
// console.log(Math.max(numbers2));
console.log(Math.max(5, 10, 5, 20, 8, 15));

// 내가 max 함수를 구현한다면?
function my_max(numbers) {
    let max = numbers[0];
    
/* 
    for(let i = 0; i < numbers.length; i++) {
        if (numbers[i] > max) {
            max = numbers[i];
        }
    }
 */
/* 
    numbers.forEach(number => {
        if (number > max) {
            max = number;
        }
    });
 */

    console.log(numbers);
    for (let number of numbers) {
        console.log(number);
        if (number > max) {
            max = number;;
        }
    };

/* 
    console.log(numbers);
    for (let idx in numbers) { // in과 of는 작동 방식이 다르다. in으로 하면 index를 받아오고, of로 하면 element를 받아온다.
        console.log(`idx = ${idx}, numbers[${idx}] = ${numbers[idx]}`);
        if (numbers[idx] > max) {
            max = numbers[idx];
        }
    };
 */


    return max;
}

console.log(my_max(numbers2));
// 20이 나오도록 for loop로 구현해보기