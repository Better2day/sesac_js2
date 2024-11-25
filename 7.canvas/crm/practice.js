
var kvArray = [
    { key: 1, value: 10},
    { key: 2, value: 20},
    { key: 3, value: 30},
]

var reformattedArray = kvArray.map(function (obj) {
    var rObj = {};
    const key = obj.key;
    // rObj.key = obj.value;
    rObj[obj.key] = obj.value;
    return rObj;
});

console.log(reformattedArray);
console.log(kvArray);

const person = {
    name: "홍길동",
}
const copyPerson = person;
copyPerson.name = '이도';
person['age'] = 10;
console.log(person);