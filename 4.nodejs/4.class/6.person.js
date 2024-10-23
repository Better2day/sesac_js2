
const person1 = new Person('철수', 25, '남성');
person1.greet();
person1.walk(10);
person1.eat();

const employee1 = new Employee('영희', 30, '여성', '매니저', 50000);
const employee2 = new Employee('영수', 31, '남성', null, 50000);
employee1.greet();
employee2.greet();
employee1.displayInfo();
employee2.displayInfo();
employee1.walk(5);
employee1.work();

/* 
console.log("직원1이 직원 객체인가요?", employee1 instanceof Employee);
console.log("직원1이 사람인가?", employee1 instanceof Person);

console.log("사람1이 직원 객체인가요?", person1 instanceof Employee);
console.log("사람1이 사람인가?", person1 instanceof Person);
 */
console.log("직원1 이라는 변수는?", typeof employee1);
console.log("사람1 이라는 변수는?", typeof person1);

class Manager extends Employee {
    constructor(name, age, gender, jobTitle, salary, team) {
        super(name, age, gender, jobTitle, salary);
        this.team = team;
    }

    assignTask() {
        console.log(`${this.name} 매니저가 ${this.team}에 업무를 배분하고 있습니다.`);
    }
}

const manager1 = new Manager('수현', 35, '남성', '팀장', 60000, '개발');
manager1.assignTask();

class Customer extends Person {
    constructor(name, age, gender, customerId, orderHistory) {
        super(name, age, gender);
        this.customerId = customerId;
        this.orderHistory = orderHistory; 
    }
    placeOrder(product) {
        this.orderHistory.push(product);
        // this.orderHistory += product;
        console.log(`${this.name} 고객이 ${product}를 주문하였습니다.`);
    }

    orderHistory2() {
        let orderHistoryPrn = `${this.name} 고객님의 전체 주문 기록: `;
        
        for(let orderItem of this.orderHistory) {
            orderHistoryPrn += orderItem + ' ';
        }
   /*      
        this.orderHistory.forEach(orderItem => {
            orderHistoryPrn += orderItem + ' ';
            
        });
 */
        console.log(orderHistoryPrn);

        // console.log(this.orderHistory);
    }
    
}

const student1 = new Student('지연', 20, '여성', '20240101', '컴퓨터공학');
student1.study();

const customer1 = new Customer('지민', 22, '여성', 'C1001', ['커피', '라떼']);
customer1.placeOrder('생크림케이크');
customer1.orderHistory2();

console.log('-'.repeat(50));

const people = [manager1, student1, customer1, employee1, employee2];
introduce(people);

function introduce() {
    for (const person of people) {
        person.greet('철수');
    }

    for (let i = 0; i < people.length; i++) {
        people[i].walk(Math.floor(Math.random()*10+1));
    }

    people.forEach((person) => {
        if (person instanceof Employee) {
            person.work();
        } else if (person instanceof Student) {
            person.study();
        }
    });
}




let i = 0;
while (true) {
    if (i++ === 100) {
        break;
    }
    console.log(Math.random());
};
