// 1. 기본 헬로우 월드 출력
const greeting = "Hello, World!";

console.log(greeting);

// 2. 여러 개의 값을 출력하려면?
const a = 10;
const b = 20;
const c = "text";
console.log(a, b, c);
console.log("입력값들은: ", a, b, c);
console.log("입력값들은: a=", a , ", b=", b, ", c=", c);
console.log("입력값들은: a=" + a + ", b=" + b + ", c=" + c);
console.log(`입력값들은: a=${a}, b=${b}, c=${c}`);

// 3. 객체
const person = { name: "shpark", age: 30 }
console.log("Person 이름: ", person.name);
console.log("Person 나이: ", person.age);
console.log("Person 나이: ", person.agk); // 없는 멤버는 undefined 출력

// 4. 배열
const fruits = ["애플", "바나나", "오렌지"];
console.log("과일: ", fruits);
console.log(fruits[0]);
console.log(fruits[1]);
console.log(fruits[2]);
console.log(fruits[3]);  // 없는 index는 undefined 출력

// 7. 성능 측정 같은 것을 하려면 (예를 들어 작성한 코드가 느려졌을 때 쓴다.)
console.time("test");
console.log("복잡한 로직을 처리할 때");
console.timeEnd("test");

// 8. 스타일
console.log("%c 스타일 적용한 텍스트", "color: blue; font-weight: bold");
