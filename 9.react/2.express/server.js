const express = require('express');
const path = require('path');

const app = express();

// 이 build 폴더를 정적 폴더로 제공
app.use(express.static(path.join(__dirname, 'build')));

app.listen(3000, () => {
    console.log('Server is running on 3000 port');
});
