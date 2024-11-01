class Unit {
    constructor(name, hp, att) {
        this.name = name;
        this.hp = hp;
        this.att = att;
    }
    attack(target) {
        target.hp -= this.att;
    }

    // printName() { console.log('name: ' + this.name) };
    // printAge() { console.log('age: ' + this.age) };

    // Computed Property를 이용해서 속성값 출력 함수를 한 개로 통일
    // 속성값이 엄청 많다고 가정했을 떄, 출력값만 다를 뿐 같은 작업을 하는 메소드를 수십 개 만들 필요가 없다.
    // 단, 함수 호출시 인자로 문자열로 된 속성값을 하나하나 줘야 하는 번거로움이 있다.
    print(prop) { console.log(`${prop}: ${this[prop]}`); }
    
    // 속성값 목록을 문자열 배열로 넘겨서, 한 번에 출력하도록 개선하는 게 나을 듯
    print2(propArr) {
        let info = '';
        propArr.forEach(prop => {
            info += (`${prop}: ${this[prop]}  `);
        });
        console.log(info);
    }

    print3(propArr) {
        for(let prop of propArr) { // 속성을 순환할 때마다 콜백 함수를 호출하는 것보다는 순환문을 이용하는 게 더 낫지 않을까?
            console.log(`${prop}: ${this[prop]}`);
        };
    }    
}

class Monster extends Unit {
    // 부모 클래스와 하는 일이 같으면 메소드 생략 가능
 /*     constructor(name, hp, att) {
        super();
    }
    attack(target) {
        super.attack(target);
    } */
}

class Human extends Unit {
    constructor(name, hp, att) {
        super(name, hp, att);
        this.maxHp = hp;
    }
    attack(target) {
        super.attack(target); // 부모 클래스의 attack과 아예 다른 동작을 하려면 이 라인 생략 가능
        // 부모 클래스의 attack 외에 추가할 동작은 여기에 작성
        console.log('Critical Hit!');
    }
    heal() {
        this.hp = this.maxHp;
    }

}

const human1 = new Human('Tester', 100, 15, 100);
// human1.printName();
// human1.printAge();
/* 
human1.print('name');
human1.print('hp');
human1.print('att');
human1.print('age');
 */

/* 
console.log('nullifying caching effect\n');

console.time();
human1.print2(['name', 'hp', 'att', 'maxHp']);
console.timeEnd();
console.log('');

console.time();
human1.print3(['name', 'hp', 'att', 'maxHp']); // 속성 서너 개로는 시간 복잡도 차이 없는 듯. 수십 수백 개 정도도 비슷할지도
console.timeEnd();
 */

const mon1 = new Monster('Slime', 25, 10);
human1.print2(['name', 'hp']);
mon1.attack(human1);
human1.print2(['name', 'hp']);

mon1.print2(['name', 'hp']);
human1.attack(mon1);
mon1.print2(['name', 'hp']);




/* 
const mon1 = new Monster('Slime', 25, 10);
const mon2 = new Monster('Slime', 26, 9);
const mon3 = new Monster('Slime', 25, 10);
 */
