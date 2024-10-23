class Person {
    constructor(name, age, gender) { // Attribute / Properties
        this.name = name;
        this.age = age;
        this.gender = gender;
    }

    greet() { // Function - 클래스의 함수를 Method라고 부름
        console.log(`안녕, 나는 ${this.name}이고, ${this.age}살이야`);
    }
    greet(name) { // Function - 클래스의 함수를 Method라고 부름
        console.log(`안녕, ${name}님. 나는 ${this.name}이고, ${this.age}살이야`);
    }
    getInCar(car) {
        console.log(`${this.name}이/가 ${car.model}에 탔습니다.`);
    }

    walk(distance) {
        if (distance) { // distance의 truthy를 확인
            console.log(`${this.name}이(가) ${distance}m를 걷고 있습니다.`);
        } else {
            // console.log(`${this.name}이(가) 멍~하니 걷고 있습니다.`);
            throw new TypeError('거리 입력이 필수입니다');
        }
    }
    eat() {
        console.log(`${this.name}이(가) 먹고 있습니다.`);
    }
}

module.exports = Person;
