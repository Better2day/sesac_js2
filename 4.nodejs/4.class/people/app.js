const Parent = require('./Parent.js');
const Child = require('./Child.js');
const Sedan = require('../car/Sedan.js');

const dad = new Parent('철수', 45, '남성');
const daughter = new Child('지연', 10, '여성', '4학년');
const son = new Child('민수', 8, '남성', '2학년');

const familyCar = new Sedan('현대', '그랜져', '검정', 3000);

familyCar.start();
/* 
dad.getInCar(familyCar);
dad.driveCar(familyCar);
daughter.getInCar(familyCar);
son.getInCar(familyCar);
 */
daughter.playInCar();
son.playInCar();
familyCar.stop();



/*
const Employee = require('./Employee');
const Student = require('./Student');

const employee = new Employee('영희', 20, '여자', '사원', 20000);
const student = new Student('철수', 33, '남자', '12345678', '법학');

employee.greet('대표');
student.greet('교수');
*/

