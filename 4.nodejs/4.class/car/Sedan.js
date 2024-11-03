const Car = require('./Car.js');

class Sedan extends Car {
    constructor(brand, model, color, displacement) {
        super(brand, model, color);
        this.displacement = displacement;
    }

    openTrunk() {
        console.log(`${this.model}의 트렁크를 열었습니다.`);
    }
}

module.exports = Sedan;
