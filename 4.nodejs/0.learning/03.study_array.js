// 자습 - 배열 객체 메소드

let arr = [1, 2, 3, 4, 5];
let arr2 = [1, 2, 2, 2, 3, 4, 5, 5];

/*
Array.slice();
Array.splice();
Array.concat();
Array.forEach();
 */
/*
console.log([1, 2].concat([3, 4]));
arr.forEach((v, i) => {
    console.log(v, i);
})
 */

/* 
// join: 배열 요소를 합쳐서 문자열 생성
console.log([1, 2, 3].join(' '));
console.log(['1', '2', '3'].join());
// split: 문자열을 나눠서 배열 생성
console.log('2345'.split(''));
console.log('2,3,4,5'.split(','));
 */

// at: 배열의 특정 인덱스 값 반환. -1 = 배열 끝 인덱스
/* 
console.log(arr.at(4));
console.log(arr.at(-1));
console.log([1, 2].concat([3, 4]));
 */

/* 
Array.indexOf();
Array.lastIndexOf();
 */
// 특정 요소를 발견하면 해당 요소의 인덱스 반환, 없으면 -1 반환
// if (Array.indexOf(arg)) 식으로 하면, 배열 첫 요소를 발견했을 때 if (0)이 되어서 조건문이 실행되지 않으니 주의!
// 조건문에서 참인지 확인하려면 if (Array.indexOf(arg) > -1) 식으로 사용해야 한다!
/* 
console.log(arr2.indexOf(2, 3));
console.log(arr2.lastIndexOf(2, 1));

// Array.includes();
console.log(arr2.includes(2));
 */

// console.log(typeof userList); // JS에서 배열은 객체 자료형


// Array.filter() method: 조건을 만족하는 요소 반환
const filterResult = arr.filter(item => {
    return (item % 2 === 0);
});
const result2 = arr.filter(item => item % 2 === 1);

console.log('Array.filter() method')
console.log(filterResult);
console.log(result2);
console.log('');

// Array.map() method: 함수를 받아서 특정 기능을 수행하고, 그 결과 생성된 새로운 배열을 반환. 1:1 mapping 개념인 듯

console.log('Array.map() method')
/* 
const mapResult = arr.map(item => item * 10);
console.log(mapResult);
 */
let userList = [
    { name: 'Mike', age: 30 },
    { name: 'Jane', age: 27 },
    { name: 'Tom', age: 15 },
]

// callback function's parameter identifier는 임의로 지어도 된다.
// map 메소드가 콜백 함수를 호출할 때 넘기는 인자가 첫 번째는 배열의 요소, 두 번째(optional)는 index라는 것만 기억하면 된다!
// forEach, filter 등 Array 객체의 여러 메소드가 비슷한 인자를 받는 것 같다.
let newUserList = userList.map((user, index) => {
    return Object.assign({}, user, {
        id: index + 1,
        isAdult: user.age > 18,
    });
});
// 요소의 인덱스를 사용할 일이 없으면 value(요소) 인자만 받아도 된다.
// 반대로 인덱스를 사용해야 하면, value index 인자 둘 다 받아야 한다.
// 첫 번째 매개변수가 있어야, 두 번째 매개변수도 있을 수 있기 때문이다!

console.log(newUserList);
console.log('');


//Array.reduce()
// Array.reduce()
// Array.map()
