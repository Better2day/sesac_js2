let car = {
    brand: "현대",
    year: 2024,
    start: function() {
        return "엔진 시작";
    },
    stop: function() {
        return "엔진 중지";
    }
}

console.log(car);
console.log(car.brand);
console.log(car.year);
console.log(car.start);   // 변수를 호출
console.log(car.start()); // 변수 안에 담긴 함수를 호출
console.log(car.stop);    // 함수를 담고 있는 변수를 출력
console.log(car.stop());  // 그 변수가 담고 있는 함수를 호출

car.name = "K5";
console.log(car);