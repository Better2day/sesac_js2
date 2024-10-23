const Person = require('./Person.js');

class Child extends Person {
    constructor(name, age, gender, grade) {
        super(name, age, gender);
        this.grade = grade;
    }

    playInCar(car) {
        console.log(`${this.name}이/가 ${car.model} 안에서 놀고 있습니다.`);
    }

    sing() {
        console.log(`${this.name}이/가 노래를 부릅니다. 끼요옷`);
    }
}

module.exports = Child;