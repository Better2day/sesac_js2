class Car {
    constructor(brand, model, color) {
        this.brand = brand;
        this.model = model;
        this.color = color;
    }

    start() {
        console.log(`${this.model}의 시동을 걸었습니다.`);
    }

    stop() {
        console.log(`${this.model}의 시동을 껐습니다.`);
    }

    drive() {
        console.log(`${this.model}을 운행중입니다.`);
    }
}

module.exports = Car;
