// 객체 구조 분해 할당 (비구조화 할당)
function print({alias, name, actor}) {
    // function print(hero) {
    //     const {alias, name, actor} = hero;
        console.log(`${alias}(${name}) 역할을 맡은 배우는 ${actor}입니다`);
    }
    
    const ironMan = {
        name: '토니 스타크',
        actor: '로버트 다우니 주니어',
        alias: '아이언맨',
    };
    
print(ironMan);
    

const object1 = {
    a: 'somestring',
    b: 35,
    c: false
};
console.log(Object.entries(object1));


/* 
// 콜백 함수의 매개변수인 배열을 괄호로 한 번 더 감싼다. ※ 괄호를 없애고 실행했더니 오류 발생!
Object.entries(object1).forEach(([key, value]) => {
    console.log(`${key}: ${value}`);
})

// 여기는 배열 대괄호만 있고, 일반 괄호 없음. 오히려 일반 괄호로 감싸면 오류 발생!
for (const [__, value] of Object.entries(object1)) {
    // console.log(`${key}: ${value}`);
    console.log(`${value}`);
}
 */


// 객체 안 함수
const dog = {
    name: '멍멍이',
    sound: '멍멍!',
    say: function () {
        console.log(this.sound);
    }
};
// dog.say();


// Getter 함수
/* 
const numbers = {
    a: 1,
    b: 2,
    get sum() {
        console.log('sum 함수가 실행됩니다');
        return this.a + this.b;
    }
}
console.log(numbers.sum);
numbers.b = 5;
console.log(numbers.sum);
*/

// Setter 함수
const numbers = {
    _a: 1,
    _b: 2,
    sum: 3,
    calculate() {
        console.log('calculate');
        this.sum = this._a + this._b;
    },
    get a() {
        return this._a;
    },
    get b() {
        return this._b;
    },
    set a(value) {
        console.log('a가 바뀝니다');
        this._a = value;
        this.calculate();
    },
    set b(value) {
        console.log('b가 바뀝니다');
        this._b = value;
        this.calculate();
    }
}

console.log(numbers.sum);
numbers.a = 5;
numbers.b = 7;
numbers.a = 9;
console.log(numbers.sum);