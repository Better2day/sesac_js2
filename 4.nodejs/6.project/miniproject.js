const { v4: uuidv4 } = require('uuid');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const fs = require('fs'); // built-in
const csv = require('csv-parser'); // 외부

const userCsvWriter = createCsvWriter({
    path: 'D:\\src\\SESAC_JS2\\sesac_js2\\4.nodejs\\6.project\\user.csv',
    header: [ // CSV file header
        { id: 'id', title: 'Id' },
        { id: 'name', title: 'Name' },
        { id: 'gender', title: 'Gender' },
        { id: 'age', title: 'Age' },
        { id: 'birthdate', title: 'Birthdate' },
        { id: 'address', title: 'Address' },
    ]
});

const storeCsvWriter = createCsvWriter({
    path: 'D:\\src\\SESAC_JS2\\sesac_js2\\4.nodejs\\6.project\\store.csv',
    header: [
        { id: 'id', title: 'Id' },
        { id: 'name', title: 'Name' },
        { id: 'type', title: 'Type' },
        { id: 'address', title: 'Address' },
    ]
});

const orderCsvWriter = createCsvWriter({
    path: 'D:\\src\\SESAC_JS2\\sesac_js2\\4.nodejs\\6.project\\order.csv',
    header: [
        { id: 'id', title: 'Id' },
        { id: 'orderAt', title: 'OrderAt' },
        { id: 'storeId', title: 'StoreId' },
        { id: 'userId', title: 'UserId' },
    ]
});

class NameGenerator {
    constructor() {
        this.lastname = ['김', '이', '박', '최', '정', '강', '조', '장', '임', '오'];
        this.firstname = ['민준', '서진', '재윤', '민찬', '지성', '서윤', '수빈', '주아', '현서', '지수'];
    }

    generateName() {
        return this.lastname[Math.floor(Math.random() * this.lastname.length)] + this.firstname[Math.floor(Math.random() * this.firstname.length)];
    }
}

class GenderGenerator {
    generateGender() {
        return Math.random() < 0.5 ? '남성' : '여성';
    }
}

class Utility {
    static getRandomInRange(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
}
// 다른 파일에서 Utility.getRandomInRange(~, ~) 식으로 객체를 생성하지 않고도 사용 가능

class BirthdateGenerator {
    generateBirthdate() {
        // YYYY-MM-DD 포맷으로 반환하기
        // const year = Math.floor(Math.random() * (2010 - 1960 + 1)) + 1960;
        const year = Utility.getRandomInRange(1960, 2010);
        // const month = Math.floor(Math.random() * 12) + 1;
        const month = Utility.getRandomInRange(1, 12);
        // const day = Math.floor(Math.random() * 28) + 1; // 1~30일까지가 나온다.
        const day = Utility.getRandomInRange(1, 28);
        
        // return `${year}-${month}-${day}`;
        // 생년월일에서 월이나 일이 한 자리일 때는 앞에 0을 한 개 채워서(padding) YYYY-MM-DD 양식 유지
        return `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
    }
}

class AddressGenerator {
    constructor() {
        // this.cities = ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Philadelphia'];
        this.cities = ['서울', '수원', '대전', '광주', '용인', '성남', '당진' ];
        this.gu = ['성동구', '성북구', '중구', '노원구', '강서구', '양천구', '관악구'];
    }

    generateAddress() {
        // 앞에 1~100 까지의 번지수를 붙인 주소를  생성하시오.        
        const city = this.cities[Math.floor(Math.random() * this.cities.length)];
        const gu = this.gu[Math.floor(Math.random() * this.gu.length)];
        const street = Utility.getRandomInRange(1, 100);
        return `${city} ${gu} ${street}`;
    }
}

class UserGenerator {
    constructor() {
        // this.id = null;
        this.nameGen = new NameGenerator();
        this.genderGen = new GenderGenerator();
        this.birthGen = new BirthdateGenerator();
        this.addressGen = new AddressGenerator();
    }

    generateData(count) {
        const data = [];
        for (let i = 0; i < count; i++) {
            const id = uuidv4();
            const name = this.nameGen.generateName();
            const gender = this.genderGen.generateGender();
            const birthdate = this.birthGen.generateBirthdate();
            const age = 2024 - parseInt(birthdate.slice(0, 4));
            const address = this.addressGen.generateAddress();
            data.push({id, name, gender, age, birthdate, address});
        }
        // console.log(data);
        return data;
    }
}

class StoreTypeGenerator {
    constructor() {
        this.type = ['스타벅스', '투썸', '커피빈', '이디야', ];
    }

    generateStoreType() {
        return this.type[Math.floor(Math.random() * this.type.length)];
    }
}

class StoreBranchGenerator {
    constructor(name1) {
        this.branch = ['홍대', '송파', '강서', '신촌', '잠실', ];
    }

    generateStoreBranch() {
        return `${this.branch[Math.floor(Math.random() * this.branch.length)]}${(Math.floor(Math.random() * 10))+1}호점`;
    }
}

class StoreGenerator {
    constructor() {
        this.storeTypeGen = new StoreTypeGenerator();
        this.storeBranchGen = new StoreBranchGenerator();
        this.addressGen = new AddressGenerator();
    }

    generateData(count) {
        const stores = [];
        for(let i = 0; i < count; i++) {
            const id = uuidv4();
            const type = this.storeTypeGen.generateStoreType();
            const branch = this.storeBranchGen.generateStoreBranch();
            const name = type + ' ' + branch;
            const address = this.addressGen.generateAddress();
            stores.push({id, name, type, address});
        }
        // console.log(stores);
        return stores;
    }
}

class OrderAtGenerator {
    generateOrderAt() {
        const year = Utility.getRandomInRange(1980, 2024);
        const month = Utility.getRandomInRange(1, 12);
        const day = Utility.getRandomInRange(1, 28);
        const hh = Utility.getRandomInRange(0, 23);
        const mm = Utility.getRandomInRange(0, 60);
        const ss = Utility.getRandomInRange(0, 60);
        return `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')} ${hh.toString().padStart(2, '0')}:${mm.toString().padStart(2, '0')}:${ss.toString().padStart(2, '0')}`;
    }
}


class StoreIdList {
    getStoreIdList() {
        return new Promise((resolve, reject) => {
            const storesFromFile = [];
            fs.createReadStream('D:\\src\\SESAC_JS2\\sesac_js2\\4.nodejs\\6.project\\store.csv')
            .pipe(csv())
            .on('data', (data) => {
                // 데이터를 스트림으로 읽으면서 처리            
                storesFromFile.push(data.Id);
            })
            .on('end', () => {
                // 데이터 읽는 게 끝났을 때 처리하는 로직
                resolve(storesFromFile);
            })
        })
    }
}

class UserIdList {
    getUserIdList() {
        return new Promise((resolve, reject) => {
            const userFromFile = [];

            fs.createReadStream('D:\\src\\SESAC_JS2\\sesac_js2\\4.nodejs\\6.project\\user.csv')
            .pipe(csv())
            .on('data', (data) => {
                // 데이터를 스트림으로 읽으면서 처리
                userFromFile.push(data.Id);
            })
            .on('end', () => {
                // 데이터 읽는 게 끝났을 때 처리하는 로직
                resolve(userFromFile);
            })
        })
    }
}

class OrderGenerator {
    constructor() {
        this.orderAtGen = new OrderAtGenerator();
        this.storeIdList = new StoreIdList();
        this.userIdList = new UserIdList();
    }

    async generateData(count) {
        const storeIdPool = await this.storeIdList.getStoreIdList();
        const userIdPool = await this.userIdList.getUserIdList();
        const orders = [];
        for(let i = 0; i < count; i++) {
            const id = uuidv4();
            const orderAt = this.orderAtGen.generateOrderAt();
            const storeId = storeIdPool[Math.floor(Math.random() * storeIdPool.length)];
            const userId = userIdPool[Math.floor(Math.random() * userIdPool.length)];
            // console.log({id, orderAt, storeId, userId});
            orders.push({id, orderAt, storeId, userId});
        }
        // console.log(orders);
        // return orders;
        const dataPrinter = new DataPrinter(orders);
        dataPrinter.writeToCSV(orderCsvWriter, 'order.csv');
    }
}

// class DataPrinter extends UserGenerator{
//     printData(count) {
//         const data = this.generateData(count);
//         for (const [name, birthdate, gender, address] of data) {
//             console.log(`이름: ${name}, 생년월일: ${birthdate}, 성별: ${gender}, 주소: ${address}`);
//         }
//     }

// }

class DataPrinter {
    constructor (data) {
        this.data = data; // 의존성. 의존성 삽입
    }

    printConsole() {
        for (const {id, name, gender, age, birthdate, address} of this.data) {
            console.log(`이름: ${name}, 성별: ${gender}, 나이: ${age}, 생년월일: ${birthdate}, 주소: ${address}`);
        }
    }
    
    printHTML() {
        console.log('HTML 형태로 내보냈습니다.');
    }

    writeToCSV(writer, filename) {
        // console.log('CSV 파일에 저장이 완료되었습니다');
        writer.writeRecords(this.data)
        .then(() => {
            console.log(filename + ' 생성 완료!');
        });
    }
}


// 1. user (70m)
const userGenerator = new UserGenerator();
const users = userGenerator.generateData(1000);

let dataPrinter = new DataPrinter(users);
// dataPrinter.printConsole();
// dataPrinter.printHTML();
dataPrinter.writeToCSV(userCsvWriter, 'user.csv');

// 2. store (+35m)
const storeGenerator = new StoreGenerator();
const stores = storeGenerator.generateData(100);

dataPrinter = new DataPrinter(stores);
dataPrinter.writeToCSV(storeCsvWriter, 'store.csv');

// 3. order (+190m)
const orderGenerator = new OrderGenerator();
orderGenerator.generateData(10000);
// const orders = orderGenerator.generateData(10000);
/* orders.then(orders => {
    dataPrinter = new DataPrinter(orders);
    dataPrinter.writeToCSV(orderCsvWriter, 'order.csv');
}) */
// 일부 함수를 Promise로 래핑하고 async/await를 사용했더니 리턴값도 프로미스 객체로 됐다.
// orders 값을 반환할 수 없게 되서, 아래 csv 출력 부분을 OrderGenerator 안쪽에서 처리
// dataPrinter = new DataPrinter(orders);
// dataPrinter.writeToCSV(orderCsvWriter, 'order.csv');

// 4. item
// const itemGenerator = new ItemGenerator();
// const items = itemGenerator.generateData(10);

// dataPrinter = new DataPrinter(items);
// dataPrinter.writeToCSV(itemCsvWriter, 'item.csv');

// 5. orderitem
// const orderitemGenerator = new OrderitemGenerator();
// const orderitems = orderitemGenerator.generateData(10);

// dataPrinter = new DataPrinter(orderitems);
// dataPrinter.writeToCSV(orderitemCsvWriter, 'orderitem.csv');