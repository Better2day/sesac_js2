// 사람이라는 변수에 사람에 해당하는 객체(objects)를 담기
let person = {
    name: 'John',
    age: 25,
    address: '서울시 강남구 \'1\'번지 \\ 2번지',
    greet: function() {
        console.log("안녕하세요, 저는 " + this.name + "입니다.")
    }
}

console.log("사람의 이름은: ", person.name);
console.log("나이는: ", person.age);
console.log("주소는: ", person.address);

person.greet();
person.name = 'Tom';
person.greet();
