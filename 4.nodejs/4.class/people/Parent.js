const Person = require('./Person.js');
const Car = require('../car/Car.js');

class Parent extends Person {
/*     
    constructor(name, age, gender) {
        this.name = name;
        this.age = age;
        this.gender = gender;
    };
 */
    driveCar(car) {
        console.log(`${this.name}이/가 ${car.model}을 운행하고 있습니다.`);
    }
};

module.exports = Parent;