const fs = require('fs');
const path = require('path');

const directoryPath = '../3.function';

fs.readdir(directoryPath, (err, files) => {
    if (err) {
        console.log('읽기 실패:', err.message);
        return;
    }
    
    console.log(files);
    console.log(files[0]);

    files.forEach(file => {
        const filePath = path.join(directoryPath, file);
        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) {
                console.log('파일 내용 읽기 실패: ', err.message);
                // return;
            }

            console.log(data);
        });
    });
});
