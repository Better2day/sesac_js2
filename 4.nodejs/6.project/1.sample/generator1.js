const names = ['John', 'Jane', 'Michael', 'Emily', 'William', 'Olivia'];
const lastname = ['박', '김', '이', '조', '최'];
const firstname = ['가', '나', '다', '라', '마'];
const cities = ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Philadelphia'];

function generateName() {
    return lastname[Math.floor(Math.random() * lastname.length)] + firstname[Math.floor(Math.random() * firstname.length)];
}

function generateGender() {
    return Math.random() < 0.5 ? '남성' : '여성';
}

function getRandomInRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateBirthdate() {
    // YYYY-MM-DD 포맷으로 반환하기
    // const year = Math.floor(Math.random() * (2010 - 1960 + 1)) + 1960;
    const year = getRandomInRange(1960, 2010);
    // const month = Math.floor(Math.random() * 12) + 1;
    const month = getRandomInRange(1, 12);
    // const day = Math.floor(Math.random() * 28) + 1; // 1~30일까지가 나온다.
    const day = getRandomInRange(1, 28);
    
    return `${year}-${month}-${day}`;
    //return new Date(year, month, day);
}

function generateYYYY() {
    // 1960 ~ 2010 범위 지정 어떻게?
    let year = 0;
/* 
    while (true) {
        const year = Math.floor(Math.random() * 10000);
        if (year >= 1960 && year < 2010) {
            break;
        }
    }
 */

    // 0~50 사이의 숫자를 생성
    
}
/* 
for (let i = 0; i < 10; i++) {
    console.log(generateYYYY());
}
 */

function generateAddress() {
    // 앞에 1~100 까지의 번지수를 붙인 주소를  생성하시오.
    const street = getRandomInRange(1, 100);
    const city = cities[Math.floor(Math.random() * cities.length)]
    return `  ${street} ${city}`;
    // return Math.floor(Math.random() * 100 + 1) + ' ' + cities[Math.floor(Math.random() * cities.length)];
}

const userdb = [];

for (let i = 0; i < 5; i++) {
    // console.log(generateName(), generateGender(), generateBirthdate(), generateAddress());
    userdb.push([generateName(), generateGender(), generateBirthdate(), generateAddress()]);
    
}

// db (db 아직 안 배워서, 실제로는 메모리)에 있는 내용
/* 
for (const user of userdb) {
    console.log(user);
};
 */
console.log(userdb);

// csv 형태로 파일에 저장
// user.csv

const fs = require('fs');

function writeDataToCSV(data, filePath) {
    const header = ['Name', 'Gender', 'Birthdate', 'Address'];
    // const rows = data.map(row => row.join(','));
    const rows = data.map(row => row.join(','));
    const csvContent = [header, ...rows].join('\n');

    fs.writeFileSync(filePath, csvContent, 'utf8');
}

console.log('사용자 데이터 출력: ', userdb);
writeDataToCSV(userdb, './user.csv');
// writeCSV(filePath, userdb, (err) => { console.log(''); });


// -----  여기서부터는 상점  -----
class NameGenerator {

}

class User {

}

// -----  여기서부터는 아이템  -----
