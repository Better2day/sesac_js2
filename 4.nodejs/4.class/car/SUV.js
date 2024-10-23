const Car = require('./Car.js');

class SUV extends Car {
    constructor(brand, model, color) {
        super(brand, model, color);
    }

    offRoad() {
        console.log(`${this.model}로 오프로드를 달립니다. oh yeah!`);
    }
}

module.exports = SUV;
