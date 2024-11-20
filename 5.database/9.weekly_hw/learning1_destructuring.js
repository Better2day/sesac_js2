// 객체 구조 분해 할당 (비구조화 할당)
function print({actor, alias, name, }) {
    // function print(hero) {
    //     const {alias, name, actor} = hero;
        console.log(`${alias}(${name}) 역할을 맡은 배우는 ${actor}입니다`);
    }

    const ironMan = {
        name: '토니 스타크',
        actor: '로버트 다우니 주니어',
        alias: '아이언맨',
    };

// print(ironMan);

const object1 = {
    str: 'somestring',
    num: 35,
    bb: false
};
/* 
console.log('Object.keys(object1) = ', Object.keys(object1));
console.log('Object.values(object1) = ', Object.values(object1));
console.log('Object.entries(object1) = ', Object.entries(object1));
console.log(Object.entries(object1).toString());
 */

// 배열 안의 3번째 배열의 key-value 값을 인수로 받아서 출력
// 공백이나 __를 사용하면 되는 줄 알았는데, __도 식별자로 작동하는지 중복으로 사용하면 오류 발생
/* 
function print2([[_,__], [___,____], [a, b]]) {
    console.log(`[0][0] = ${a}, [0][1] = ${b}`)
}
 */

// print2(object1); // 함수 매개변수가 2차원 배열로 되어 있으므로, 그냥 객체를 인수로 주면 오류 발생
// print2(Object.entries(object1)); // Object.entries는 key-value 쌍을 2차원 배열 형태로 반환


// 여기 좀 만져봐야 함! (배열 안의 배열 요소에 접근하려면?)

Object.entries(object1).forEach(arr => {
    // b = arr[__, a];
    // printValue(arr);
    // for(key of arr) {
    //     console.log(key);
    // }
});

Object.entries(object1).forEach(arr => {
    // 객체 매개변수로는 배열을 못 받아옴
    // printValue2(arr);
});

function printValue([__, value]) {
    console.log(`printValue([__, value] = ${value}`);
}
function printValue2({__, value}) {
    console.log(value);
}
/* 
for([key] of Object.entries(object1)) {
    console.log(key);
}
for([__, value] of Object.entries(object1)) {
    console.log(value);
}
 */
// [value]만 하면 [key] 와 동일한 결과. 객체가 아니라 배열이므로, 순서대로 접근 가능

// 객체 매개변수로는 배열을 못 받아옴. 전부 undefined
/* 
for({key} of Object.entries(object1)) {
    console.log(key);
}
for({__, value} of Object.entries(object1)) {
    console.log(value);
}
 */

const object2 = [
    1, 'somestring',
    2, 35,
    3, false
];
/* 
console.log(Object.entries(object2));

Object.entries(object2).forEach(arr => {
    printValue(arr);
});
 */

// printValue2(object1);

function printValue3({__, num}) { // 배열과 다르게 {, num} 식은 오류 발생
    console.log(num);
}
// printValue3(object1);

function printValue4({str}) {
    console.log(str);
}
// printValue4(object1);


// Object is not iterable
/* 
for(key of object1) {
    console.log(key);
};
for([__, value] of object1) {
    console.log(value);
};
 */



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
        console.log('calculate() 함수 실행');
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
    },
}

/* 
console.log(`numbers.a (getter func): ${numbers.a}`);
console.log(`numbers.b (getter func): ${numbers.b}`);
numbers.a = 5; // setter func
numbers.b = 5; // setter func
console.log(numbers.sum);
 */

/* 
for (let i=0; i<5; i++) {
console.count('hello'); // 메시지 + console.count가 몇 번 호출됐는지 횟수도 출력
};
 */


// URLSearchParams
/* 
const paramsString = "q=URLUtils.searchParams&topic=api";
let searchParams = new URLSearchParams(paramsString);
for (let p of searchParams) {
    console.log(p);
}

console.log(searchParams.has("topic") === true); // true
console.log(searchParams.get("topic") === "api"); // true
console.log(searchParams.getAll("topic")); // [ 'api' ]
console.log(searchParams.get("foo")); // null // undefined 아닌가?
searchParams.append("topic", "webdev");
console.log(searchParams.toString());
console.log(searchParams.getAll("topic"));
searchParams.set("topic", "More webdev");
console.log(searchParams.toString());
console.log(searchParams.getAll("topic"));
searchParams.delete("topic");
console.log(searchParams.toString());
 */

/* 
let paramsObj = { foo: "bar", baz: "bar" };
let searchParams2 = new URLSearchParams(paramsObj);

console.log(searchParams2.toString());
console.log(searchParams2.has("foo"));
console.log(searchParams2.get("foo"));
console.log(searchParams2.getAll("foo"));
 */

/* 
let paramStr = "foo=bar&foo=baz";
let searchParams = new URLSearchParams(paramStr);

console.log(searchParams.toString());
console.log(searchParams.has("foo"));
console.log(searchParams.get("foo"));
console.log(searchParams.getAll("foo"));
 */



// 구조 분해 (비구조화) 할당 활용 추가 학습
const object = {a: 1, b: 2};
const { a, b } = object;
console.log(b);
console.log(object.b);

// 일반 매개변수를 생각하고 { pa, pb } 식으로 받았더니 인수를 못 받아온다.]
// 구조분해 할당을 이용할 때는, 순서만이 아니라 객체의 키 값도 일치해야 한다!
function print5({ b, a }) {
    console.log(b, a);
}

const arr1 = [1, 2, 3, 4, 5];
// const arr2 { , , a, b, } = arr1;
print5(object);



// Spread: 객체, 배열을 펼치는 기능 (이미 있는 객체, 배열에 일부 속성이나 요소를 추가해서 새 객체, 배열 생성))
const slime = {
    name: '슬라임',
}
const cuteSlime = {
    ...slime,
    attribute: 'cute',
}
const purpleCuteSlime = {
    ...cuteSlime,
    color: 'purple',
}
console.log(purpleCuteSlime);

// Rest: 객체, 배열, 함수 파라미터에서 사용 가능
// 이미 있는 객체, 배열에서 일부 속성이나 요소를 제거해서 새 객체, 배열 생성
// Rest는 목록에서 제일 끝(오른쪽)에만 위치할 수 있다는 제약이 있다.
const { color, ...rest } = purpleCuteSlime;
console.log(rest);
const { attribute, ...remainder } = rest;
console.log(purpleCuteSlime);
console.log(rest);
console.log(remainder);

// const { attribute, ...remainder} = purpleCuteSlime; 
// console.log(remainder);
const alphabet = ['a', 'b', 'c'];
const alphabetAdded = ['e', ...alphabet, 'd'];
console.log(alphabetAdded);

function sum(...rest) {
    return rest.reduce((acc, cur) => acc + cur, 10);
};
console.log(sum(1, 2, 3, 4, 5));

const object3 = { c: 1 };

function print8({ c = 3, d = 5 }) {
    console.log(c, d);
}
// console.log('');
print8(object3);

const { c: e, d = 2 } = object3;
console.log(e);
console.log(d);

const array = [1];
const [cc, dd = 2 ] = array;
console.log(cc);
console.log(dd);

const deepObject = {
    state: {
        information: {
            name2: 'J',
            languages2: ['Korean', 'English', 'Spanish']
        }
    },
    value2: 5
};

// const { name, languages} = deepObject.state.information;
// console.log(name);
// console.log(languages);
/* 
const extracted = {
    name, // name: name의 축약형
    languages, // languages: languages의 축약형
};
console.log(extracted);
 */

const {
    state: {
        information: { name2, languages2 },
    },
    value2,
} = deepObject;

const extracted2 = {
    name2,
    languages2,
    value2,
};

console.log(extracted2);


const testObj = { // 속성은 대소문자 구별
    headers: {
        'method': 'POST',
        'Content-Type': 'application/json',
    },
};

/* 
console.log(testObj.headers.method);
// console.log(testObj.headers.Content-Type); // 식별자 가운데에 - 기호가 있어서 오류 발생
console.log(testObj.headers['Content-Type']); // 대괄호 안에는 문자열 처리해서 - 기호 정상 처리
console.log(testObj['headers']['method']);
 */

function print6 (Object) {
    console.log(Object.headers.method);  // POST 정상 출력
}
// print6(testObj);

// function print7 ({Object}) {  // 객체 중괄호 안에 매개변수
//     console.log(Object.method); // Cannot read properties of undefined
function print7 ({headers}) { // 객체 중괄호 안에 매개변수. 식별자도 일치시킴
    console.log(headers.method);  // POST 정상 출력
}
// print7(testObj);



// URL encoding/decoding
// const name = 
// console.log(encodeURIComponent(name));
// console.log(encodeURIComponent(message));
//console.log(encodedName, encodedMessage);
/* 
const values = ['홍길동', '안녕하세요, 백엔드' ];
const encodedValues = values.map((qs) => encodeURIComponent(qs));
console.log(encodedValues);
console.log(decodeURIComponent('%ED%99%8D%EA%B8%B8%EB%8F%99'));
 */
const params = {
    name: "홍길동",
    age: 30,
    message: "안녕하세요",
};
/* 
const queryString = new URLSearchParams(params);
console.log(queryString);
console.log(queryString.toString());
queryString.append('extra', 'this is extra');
console.log(queryString);

console.log(queryString.get('name'));
console.log(queryString.get('age'));
queryString.set('name', '이도');
console.log(queryString.get('name'));
queryString.delete('extra');
console.log(queryString);
 */
