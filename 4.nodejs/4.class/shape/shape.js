class Shape {
    constructor(type) {
        this.type = type;
    }

    getArea() {
        // 이 함수 구현을 강제하기 위해서, 다른 언어의 abstract class처럼 만들기
        // Node.js에는 추상 클래스가 없다. (완전한 객체지향 언어가 아니다.)
        throw new Error("getArea() must be implemented by a subclass");
    }
    getInfo() {
        throw new Error("getInfo() must be implemented by a subclass");
    }
}
class Square extends Shape {
    constructor(length) {
        super("Square");
        this.length = length;
        //this.height = height;
    }

    getArea() {
        return this.length ** 2; // 제곱
    }

    getInfo() {}

    toString() {
        return `${this.type} - 넓이: ${this.getArea()}`;
    }
}

class Triangle extends Shape {
    constructor(base, height) {
        super("Triangle");
        this.base = base;
        this.height = height;
    }

    getArea() {
        return (this.base * this.height) / 2; // = * 0.5
    }

    getInfo() {}
}

class Circle extends Shape {
    constructor(radius) {
        super("Circle");
        this.radius = radius;
    }

    getArea() {
        return Math.PI * this.radius ** 2;
    }

    getInfo() {}
}

// 사다리꼴
class Trapezium extends Shape {
    constructor(uWidth, lWidth, height) {
        super("Trapezium");
        this.type = "Trapezium";
        this.uWidth = uWidth;
        this.lWidth = lWidth;
        this.height = height;
    }

    getArea() {
        return ((this.uWidth + this.lWidth) * this.height) / 2;
    }

    getInfo() {}
}

// 사용 예시
const square = new Square(5);
const triangle = new Triangle(4, 3);
const circle = new Circle(3);
const trapezium = new Trapezium(4, 6, 5);

/* 
console.log("Square Area:", square.getArea()); // 출력: 25
console.log("Triangle Area:", triangle.getArea()); // 출력: 6
console.log("Circle Area:", circle.getArea()); // 출력: 28.27
console.log("Trapezium Area:", trapezium.getArea()); // 출력: 25
 */
/* 
console.log(square.getInfo());
console.log(triangle.getInfo());
console.log(circle.getInfo());
console.log(trapezium.getInfo());
 */

console.log(square);
console.log(triangle);
console.log(circle);
console.log(trapezium);
