
const jsonString = `{
  "name": "test",
  "age": 25
  }`;

/* 
// ※ 아래처럼 하면 오류 발생 ∵ JSON 객체는 키와 값(문자열일 때) 모두 '쌍'따옴표로 묶어야 한다.
const jsonString = '{ name: test, age: 25}';
const jsonString = "{ 'name': 'test', 'age': 25}";
const jsonString = '{ "name": test, "age": 25}';
const jsonString = '{ "name": \'test\', "age": 25}';

// ※ 함수는 JSON 객체로 담을 수 없다 ∴ JSON.parse/stringify도 당연히 불가능)
"testFunc": function testFunc() {
  console.log("testFunc 함수 안");
}

console.log('jsonString =', jsonString);
console.log('JSON.parse(jsonString) =', JSON.parse(jsonString));
 */

// JSON.parse: JSON  형태의 문자열을 객체로 변환
// console.log('jsonString.name =', jsonString.name);
// console.log('JSON.parse(jsonString) =', JSON.parse(jsonString));
// console.log('JSON.parse(jsonString).name =', JSON.parse(jsonString).name);

const jsonObject = {
  name: 'test2',
  // name: "test2", // 둘 다 객체 상태로 출력하면 외따옴표로 바뀜
  age: 50,
};

console.log('jsonObject =', jsonObject);
console.log(`JSON.stringify(jsonObject) = ${JSON.stringify(jsonObject)}`);
console.log(`JSON.stringify(jsonObject).name = ${JSON.stringify(jsonObject).name}`);
// 위 . 형태는 undefined를 출력할 뿐이지만, 아래 [ ] 형태는 ReferenceError로 실행 종료
// console.log(`JSON.stringify(jsonObject)[name] = ${JSON.stringify(jsonObject)[name]}`);

console.log(`JSON.stringify(jsonObject) = ${JSON.stringify(jsonObject, null, 2)}`);
