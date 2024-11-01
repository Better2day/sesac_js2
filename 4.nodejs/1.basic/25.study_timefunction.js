console.log('코드 시작');

/* setTimeout(() => {
    console.log('여기는 setTimeout()에 인자로 준 콜백 함수 내부. (1초 뒤 실행)');
}, 1000); */

let count = 0;

const callbackFunc = () => {
    count++;
    console.log('여기는 setTimeout()에 인자로 준 콜백 함수 내부. (1초마다 실행)');
    if (count === 2) { return; }

    setTimeout(callbackFunc, 1000);
};

// callbackFunc();
/* 
const stopTest = setTimeout(callbackFunc, 1000);
clearTimeout(stopTest); // 이 문장 없으면 setTimeout 실행됨 (일단 실행되면 그 뒤에는 clearTimeout 효과 없음)
console.log(stopTest);

const intervalId = setInterval(() => {
    console.log('2초마다 실행됩니다.');
  }, 2000);
  setTimeout(() => {
    clearInterval(intervalId);
  }, 5000);
 */

function a() {

}
console.log('코드 끝');


const dog = {
    // name: '멍멍이',
};

function getName(animal) {
/* if (animal) {
    return animal.name;

    return undefined;
    } */
    const name = animal && animal.name;
    return name || '이름이 없는 동물입니다.';
}

const name = getName(dog);
console.log(name);
