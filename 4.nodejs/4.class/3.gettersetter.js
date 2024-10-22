class Circle {
    constructor(radius) {
        this._radius = radius; // _ (밑줄 붙은 변수는 내부에서만 사용할 변수라는 의미)
    }

    get diameter() { // 함수처럼 생겼지만, 변수처럼 할당
        return this._radius * 2;
    }

    set diameter(diameter) {
        this._radius = diameter / 2;
    }
}

const myCircle = new Circle(5);
console.log(myCircle.diameter);
// console.log(myCircle._radius); // 할 수는 있지만, 내부 변수이므로 하지 않아야 한다.ㅏ

myCircle.diameter = 14;
console.log(myCircle.diameter);
