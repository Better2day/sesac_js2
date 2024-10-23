// 메인 파일을 보통 index.js 또는 app.js

/* 
const addFunction = require('./add');
const subFunction = require('./add');
 */

// 외부 모듈을 불러온다.
const { addNumbers, subNumbers } = require('./add');

const result = addNumbers(5, 3);
console.log('결과: ', result);

const diff = subNumbers(7, 4);
console.log('결과: ', diff);
