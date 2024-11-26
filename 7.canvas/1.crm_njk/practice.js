
// Array function - index 활용
/* 
const sampleArr = [10, 20, 30];
let mappedArr = [];
mappedArr = sampleArr.map((v, i) => i + 1);
console.log(mappedArr);
 */

// 자료 구조를 원하는 형태로 가공하기
const kvArray = [
    { key: 1, value: 10},
    { key: 2, value: 20},
    { key: 3, value: 30},
];

// 배열 안에 있는 객체의 형태를 변형하고, 그 객체들을 요소로 가지고 있는 새 배열을 생성해서 반환
const mappedArray2 = kvArray.map(function(obj) {
    console.log('map 함수에 인수로 주는 익명 함수 진입! line 1');
    const tmpObject = {};
    tmpObject[obj.key] = obj.value;
    console.log('map 함수에 인수로 주는 익명 함수 진입! line 4');
    return tmpObject;
    // 이 부분은 실행되지 않는 영역
});
console.log(mappedArray2);

// 객체에 없는 키에 값을 할당하면, 해당 key: value 쌍을 객체에 추가
// 객체에 이미 있는 키에 값을 할당하면, 해당 값을 '수정'
const mappedArray3 = { key1: 5 };
mappedArray3.key2 = 10;
// console.log(mappedArray3);
mappedArray3.key1 = 20;
// console.log(mappedArray3);



// 참조형 변수 - 얕은 복사
const person = {
    name: "홍길동",
};
const copyPerson = person;
copyPerson.name = '이도';
person['age'] = 10;
console.log(person);

const numbers = Array(3).fill(10).map((v, i) => v + i);
console.log(numbers);


// Array functions
// 값만 사용할 때는 인수로 i를 받지 않아도 됨
// 그러나 인덱스를 사용하고 싶으면, 값을 사용하지 않아도 둘 다 인수로 받아야 함
const array = [1, 3, 5, 7];
const array2 = array.filter((v) => {
    return v > 1;
});
console.log(array2);

// ※ reduce 함수는 초기값을 주지 않으면 자동으로 1로 설정하고, 배열의 2번째 요소부터 연산을 시작한다.
// 초기값을 줬을 때와 주지 않았을 때 동작이 다르니, 사용할 때 주의해야 한다!
const array3 = [1, 2, 3, 4, 5].reduce((a, c) => { console.log(a, c);
                                                  return a + c });
                                               // return a + c }, 0);
