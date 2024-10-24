const fs = require("fs");

const filePath = "hello.txt";

function csv_readfile(filePath, callback) {
    fs.readFile(filePath, "utf8", (err, data) => {
        if (err) {
            console.error("파일 읽는 도중 오류 발생", err.message);
            return;
        }
        console.log(data);
        console.log(typeof data);

        // 이 문자열을 다시 우리가 원하는 자료구조(데이터형)으로 변환시켜야 함
        // 1. 데이터를 한 줄 한 줄 구분한다.
        const rows = data.split('\n'); // \n은 new line (줄바꿈)
        console.log(rows);

        // 2. 한 줄 한 줄 안에서 , (comma)로 구분짓는다.
        for (let i = 0; i < rows.length; i++) {
            const row = rows[i];
            // console.log(row);
            const columns = row.split(',');
            console.log(columns);
        }

        const result = rows.map((row => row.split(',')));

        callback(result);;
    });
}

const content = [
    ["이름", "나이", "직업"],
    ["홍길동", 30, "개발자"],
    ["김철수", 25, "디자이너"],
    ["이영희", 28, "기획자"],
];

function csv_writeFile(filePath, csvContent) {

    console.log(content);
    console.log(typeof content);

    const csvContent = content.map((row) => row.join(',')).join('\n');

    fs.writeFile(filePath, csvContent, (err) => {
    if (err) {
        console.error("파일 쓰기 오류", err.message);
        return;
    }

    console.log("쓰기 완료");
    });
}

// csv_readfile(filePath, data => {
//     console.log('CSV 파일 내용: ', data);
// });


csv_writeFile(filePath, csvContent);
