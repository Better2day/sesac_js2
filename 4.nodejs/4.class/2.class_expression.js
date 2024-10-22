const car = class {
    constructor(make, model) {
        this.make = make;
        this.model = model;
    }

    drive() {
        return `${this.make} ${this.model}이 운행중입니다.`;
    }
}

const myCar = new car('Honda', 'Civic');
const status2 = myCar.drive();
console.log(status2);
