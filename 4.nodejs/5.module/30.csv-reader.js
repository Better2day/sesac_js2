// npm i csv-parser
const fs = require('fs'); // built-in
const csv = require('csv-parser'); // 외부
 // 내부 (자체 라이브러리)

 const results = [];

fs.createReadStream('D:\\src\\SESAC_JS2\\sesac_js2\\4.nodejs\\5.module\\hello.csv')
    .pipe(csv())
    .on('data', (data) => {
        // 데이터를 스트림으로 읽으면서 처리
        results.push(data)
    })
    .on('end', () => {
        // 데이터 읽는 게 끝났을 때 처리하는 로직
        console.log(results);
    })