class Car { // 실명 필수. 호이스팅 가능(초기화는 안 됨)
    constructor(make, model) {
        this.make = make;
        this.model = model;
    }

    drive() {
        return `${this.make} ${this.model}이 운행중입니다.`;
    }
    open() {
        return `${this.model}의 문이 열렸습니다.`;
    }
    close() {
        return `${this.model}의 문이 닫혔습니다.`;
    }
}

// 클래스를 사용하는 방법은?

const myCar = new Car('Honda', 'Civic');
console.log(myCar);

// myCar.drive();
// console.log(myCar.drive());
const status2 = myCar.drive();
console.log(status2);
console.log(myCar.open());
console.log(myCar.close());
