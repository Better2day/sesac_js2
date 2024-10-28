const fs = require('fs');
const path = require('path');

const directoryPath = './';

function checkFileSync(filePath) {
    // 파일에 대한 정보를 가져다가, 준비가 되면 나를 불러 줘

    const stats = fs.statSync(filePath);
        // 준비가 됐을 때 처리할 로직

    if (stats.isFile()) {
        console.log(`이것은 파일입니다.`);
    } else if (stats.isDirectory()) {
        console.log(`이것은 디렉토리입니다.`);
    } else {
        console.log(`모르겠습니다..`);
    }
}

function checkFile(filePath) {
    // 파일에 대한 정보를 가져다가, 준비가 되면 나를 불러 줘
    fs.stat(filePath, (err, stats) => {
        // 준비가 됐을 때 처리할 로직
        if (err) {
            console.log('정보 조회 실패');
            return;
        }

        if (stats.isFile()) {
            console.log(`${filePath} 이것은 파일입니다.`);
        } else if (stats.isDirectory()) {
            console.log(`${filePath} 이것은 디렉토리입니다.`);
        } else {
            console.log(`${filePath} 모르겠습니다..`);
        }
    })
}

fs.readdir(directoryPath, (err, files) => {
    // 콜백 함수 내용: 디렉토리 읽는 게 끝났을 때 호출할 내용
    if (err) {
        console.log('읽기 오류');
        return;
    }
    // console.log(files);

    
    files.forEach(file => {
        const filePath = path.join(directoryPath, file);
        console.log('파일: ', filePath);
        checkFileSync(filePath);
    })
    
});
