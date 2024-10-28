const args = process.argv.slice(2); // 제일 앞쪽 두 인자 버리기: argv[0], argv[1]
// console.log(args);

if (args.length == 0) {
    console.log('입력 인자가 없습니다 !!');
} else {
    console.log('명령어 인수: ');
    args.forEach((arg, index) => {
        console.log(`인수 ${index + 1}은 ${arg} 입니다.`);
    })
}
