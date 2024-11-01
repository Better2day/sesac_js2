// Truthy, Falsy
/* 
console.log(!undefined);
console.log(!null);
console.log(!NaN);
console.log(!0);
console.log(!'');
console.log(![]);
console.log(1);
console.log(!1);
console.log(!!1);
 */

// 단축 평가 논리 계산법
const dog = {
    name: '멍멍이'
};
const namelessDog = {
    name: ''
};

// && 연산자로 코드 단축시키기
function getName(animal) {
    return animal && animal.name;
}
  
const name1 = getName();
console.log(name1); // undefined
const name2 = getName(dog);
console.log(name2); // 멍멍이

// || 연산자로 코드 단축시키기
function getName2(animal) {
    const name = animal && animal.name;
    return name || '이름이 없는 동물입니다.';
}

const name4 = getName2(namelessDog);
console.log(name4); // 이름이 없는 동물입니다.
