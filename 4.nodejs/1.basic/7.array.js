const numbers = [1,2,3,4,5];
const fruits = ['apple', 'banana', 'orange'];
const mixed = [1, 'hello', true, null, {key: 'value'}];

/* 
console.log(mixed);
console.log(numbers[0]); // 배열 첫 번째 인덱스는 0
console.log(fruits.length);
console.log(fruits[fruits.length - 1]);

fruits[1] = 'BANANA';
console.log(fruits);
 */

// 배열 순회 - 전통적인/고전적인 메모리 주소값을 순회(iterate) 하는 방식
for (let i = 0; i < fruits.length; i++) {
    console.log(fruits[i]); // 이해 + 암기. 1/2/3 모두 다
}

function print_fruit(fruit) {
    console.log(fruit);
}

//fruits.forEach(print_fruit()); // 객제지향적. 객체를 중심으로 호출
/* 
fruits.forEach(function (fruit) {
    console.log(fruit);
})
 */
fruits.forEach((fruit) => {
    console.log(fruit);
})

console.log('------');
console.log(numbers);

//numbers.push(6); // 맨 뒤에 삽입
numbers.push(6);
const num_length = numbers.push(7);
console.log(numbers);
console.log('배열의 길이는: ', num_length);
const removed_elem = numbers.pop();
console.log(numbers);
console.log('삭제된 항목은: ', removed_elem);

// 이 줄까지 왔으면 numbers == [1, 2, 3, 4, 5, 6] 상태
/* 
const slicedArray = numbers.slice(1, 3);
console.log(slicedArray);
 */

const slicedArray = fruits.slice(1,3); // 배열 내의 1부터 3전까지. 즉 1과 2
console.log(slicedArray);
console.log(fruits);

const slicedNumbers = numbers.slice(2,4); // 2~4보다 작은 것까지. 2와 3의 인덱스
console.log(slicedNumbers);

// slice는 원본을 건드리지 않고, 복제본을 생성
// splice는 원본을 건드린다.

console.log('------');

const removedElements = numbers.splice(1, 2);
console.log(removedElements);
console.log(numbers);

// 배열을 합치기
const array1 = [1,2,3];
const array2 = [4,5,6];
const array3 = [7,8,9];

const mergedArray = array1.concat(array2, array3); // 복제본
console.log(array1);
console.log(array2);
console.log(array3);
console.log(mergedArray);

const mergedArrayWithSpread = [...array1, ...array3]
// const mergedArrayWithSpread = [...array1, ...array2];
console.log(mergedArrayWithSpread);

const originalArray = [1,2,3];
const elementsToInsert = [4,5,6];
/* 
originalArray.splice(1, 0, ...elementsToInsert); // 1번 인덱스부터 0개를 삭제하고, 중간에 다른 배열 삽입
console.log(originalArray);
 */

//originalArray.splice(0, 2, ...elementsToInsert); // 1번 인덱스부터 0개를 삭제하고, 중간에 다른 배열 삽입
console.log(originalArray);
