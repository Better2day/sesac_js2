const path = require("path");

const filePath = path.join(
  "D:/src/SESAC_JS2/sesac_js2/4.nodejs/5.module",
  "project1/dir1",
  "file1.txt"
);
console.log("파일 경로: ", filePath);

const extName = path.extname(filePath);
console.log("파일 확장자: ", extName);

const dirName = path.dirname(filePath);
console.log("디렉토리명: ", dirName);

const fileName = path.basename(filePath);
console.log("파일명: ", fileName);
