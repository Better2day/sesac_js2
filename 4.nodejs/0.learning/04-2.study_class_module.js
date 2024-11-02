class Game { // 게임 클래스
    constructor (name) {
        this.monster = null;
        this.hero = null;
        this.monsterList = [
            { name: '슬라임', hp: 25, att: 10, xp: 10 },
            { name: '스켈레톤', hp: 50, att: 15, xp: 20 },
            { name: '마왕', hp: 150, att: 35, xp: 50},
        ]
        this.start(name);
        this.updateHeroStat();
    }

    start(name) {
        this.hero = new Hero(name);
    }
    updateHeroStat() {
        const { hero } = this;
        if (hero === null) {
            console.log('주인공이 없습니다');
            return;
        }
        console.log(hero);
    }
    createMonster() {
        const randomIndex = Math.floor(Math.random() * this.monsterList.length);
        const randomMonter = this.monsterList[randomIndex];
        this.monster = new Monster(
            randomMonter.name,
            randomMonter.hp,
            randomMonter.att,
            randomMonter.xp,
        )
        this.updateMonsterStat();
        this.showMessage(`몬스터와 마주쳤다. ${this.monster.name}인 것 같다.`);
    }
    updateMonsterStat() {
        const { hero } = this;
        if (hero === null) {
            console.log('주인공이 없습니다');
            return;
        }
        console.log(hero);
    }
}

class Unit { // 공통 클래스
    constructor(name, hp, att, xp) {
        this.name = name;
        this.maxHp = hp;
        this.hp = hp;
        this.att = att;
        this.xp = xp;
    }
    attack(target) {
        target.hp -= this.att;
    }
}

class Hero extends Unit {
    constructor(name) {
        super(name, 100, 10, 0);
        this.lev = 1;
        // this.maxHp = hp;
    }
    heal(monster) {
        this.hp += 20;
        this.hp -= monster.att;
    }
}

class Monster extends Unit {
} // 부모 클래스와 하는 일이 같으면 메소드 생략 가능

let game = new Game('JS');

