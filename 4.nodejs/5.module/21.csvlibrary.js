const fs = require("fs");

function readCSV(filePath, callback) {
    fs.readFile(filePath, "utf8", (err, data) => {
        if (err) {
            callback(err, null);
            // console.error("파일 읽는 도중 오류 발생", err.message);
            return;
        }
        console.log(data);
        console.log(typeof data);

        const rows = data.split('\n');
        const result = rows.map((row => row.split(',')));

        callback(null, result);;
    });
}


function writeCSV(filePath, Content, callback) {
    // 사용자가 전달한 자료구조를, 다시 String 포맷으로 변환한다.
    const csvContent = content.map((row) => row.join(',')).join('\n');

    fs.writeFile(filePath, csvContent, (err) => {
        if (err) {
            console.error("파일 쓰기 오류", err.message);
            callback(err);
            return;
        }

    console.log("쓰기 완료");
    });
}

module.exports = { readCSV, writeCSV };
