class Animal {
    constructor(name) {
        this.name = name;
    }

    makeSound() {
        return "동물소리";
    }

    walk() {
        return `${this.name}이 걷고 있습니다.`
    }
}

class Dog extends Animal {
    makeSound() {
        return "멍멍";
    }

    walk() {
        return `${this.name}가 껑총깡총 뛰고 있습니다.`
    }
}

const myDog = new Dog("멍멍이");
console.log(myDog.makeSound());
console.log(myDog.walk());
