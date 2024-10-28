console.log('0. 타이머를 통한 비동기 처리');

function setTimeoutSync(message, delay) {
    return new Promise(resolve => {
        setTimeout(() => {
            console.log(message);
            resolve();
        }, delay);
    });
}

async function executeTask() {
    await setTimeoutSync('1. 첫 번째 작업: 1초 후 실행', 1000);
    await setTimeoutSync('2. 두 번째 작업: 2초 후 실행', 1000);
    await setTimeoutSync('3. 세 번째 작업: 3초 후 실행', 1000);
    console.log('4. 모든 작업이 종료되었습니다.');
}

executeTask();

// Callback Hell
/* 
setTimeoutSync('1. 첫 번째 작업: 1초 후 실행', 1000)
    .then(() => {
        setTimeoutSync('2. 두 번째 작업: 2초 후 실행', 1000)
            .then(() => {
                setTimeoutSync('3. 세 번째 작업: 3초 후 실행', 1000)
                    .then(() => {
                        console.log('4. 모든 작업이 종료되었습니다.');
                    });
            });
    });
 */


// Promise Chaining
/* 
setTimeoutSync('1. 첫 번째 작업: 1초 후 실행', 1000)
    .then(() => {
        setTimeoutSync('2. 두 번째 작업: 2초 후 실행', 1000)
    })
    .then(() => {
        setTimeoutSync('3. 세 번째 작업: 3초 후 실행', 1000)
    })
    .then(() => {
        console.log('4. 모든 작업이 종료되었습니다.');
    });    
     */
// console.log(result);

/* 
setTimeout(() =>  {
    console.log('1. 첫 번째 작업은 1초 후 실행');
}, 1000); // 1초

setTimeout(() =>  {
    console.log('2. 두 번째 작업은 2초 후 실행');
}, 2000); // 2초

setTimeout(() =>  {
    console.log('3. 세 번째 작업은 3초 후 실행');
}, 3000); // 1초
 */
