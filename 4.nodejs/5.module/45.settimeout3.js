console.log('1. 타이머를 통한 비동기 처리');


setTimeout(() =>  {
    console.log('2. 첫 번째 작업은 2초 후 실행');
}, 2000); // 2초

setTimeout(() =>  {
    console.log('3. 첫 번째 작업은 1초 후 실행');
}, 2000); // 1초

console.log('4. 모든 작업이 완료되었습니다');