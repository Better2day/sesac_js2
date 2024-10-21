// filter는 말 그대로 조건에 맞는 요소를 걸러내는 함수
const numbers = [10, 15, 20, 25, 30];
// const aboveTwenty = nubmers.filter(); // <-- 안에 받을 함수가, 필터링 조건이 된다.

/* 
function aboveTwentyCondition(n) {
    if (n > 20) {
        return true;        
    } else {
        return false;
    }
}

function belowTwentyCondition(n) {
    if (n < 20) {
        return true;        
    } else {
        return false;
    }
}

const aboveTwenty = numbers.filter(aboveTwentyCondition);
console.log(aboveTwenty);

const belowTwenty = numbers.filter(belowTwentyCondition);
console.log(belowTwenty);
*/

// 익명 함수. 화살표 함수를 이용해서 위 코드를 한 줄로 줄여보기

// const aboveTwenty = numbers.filter(n => { return (n > 20) ? true : false; });
const aboveTwenty = numbers.filter(n => n > 20);
console.log(aboveTwenty);

// const belowTwenty = numbers.filter(n => { return (n < 20) ? true : false; });
const belowTwenty = numbers.filter(n => n < 20);
console.log(belowTwenty);

/* 
const belowTwenty2 = [15, 30].filter(n => n < 20);
console.log(belowTwenty2);
 */

// ----------------------------------------------

const number2 = [1,2,3,4,5,6,7,8,9];

const evenNumbers = number2.filter(n => n % 2 === 0);
const oddNumbers = number2.filter(n => n % 2 === 1);

console.log(evenNumbers);
console.log(oddNumbers);


// 특정 문자열을 필터링
const words = ['apple', 'banana', 'grape', 'blueberry', 'avocado'];

function containALetter(word) {
    // 이 단어를 for 문으로 단어 길이만큼 반복하면서
    // 만약 현재 검사하는 char 위치에 'a'가 있으면 true를 반환하는 하수 작성

    // word.forEach(n => {
    for (let i = 0; i < word.length; i++) {    
        if (word[i] === 'a') {
            return true;
        }
    };
    return false;
}

// const containsA = words.filter(word => containALetter(word)); // a라는 글자를 포함하는 것 담기
const containsA = words.filter(word => word.endsWith('a')); // 위 함수와 같은 기능을 하는 String 객체 안의 built-in 함수
console.log(containsA);

// 객체 배열 (Object를 담고 있는 Array)에서 무언가 골라내고 싶음
const people = [
    { name: "Alice", age: 25 },
    { name: "Bob", age: 30 },
    { name: "Charlie", age: 20},
    {name: "David", age: 35 }
]

// const adults = people.filter(); // 30세 이상
const adults = people.filter(p => p.age >= 30);
    //n.age > 30); // 30세 이상
console.log(adults);

const people2 = [
    { name: "Alice", age: 25 },
    { name: "Bob", age: 30 },
    { name: "Charlie" },
    {name: "David", age: 35 }
]

// Object가 어떤 속성을 갖고 있는가??
const unknownAge = people2.filter(p => !p.hasOwnProperty('age')); // 나이가 없는 사람을 고르시오.
console.log(unknownAge);
