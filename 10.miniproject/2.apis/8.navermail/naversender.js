const nodemailer = require('nodemailer');
require('dotenv').config();

console.log(process.env.NAVER_EMAIL);
console.log(process.env.NAVER_PASSWORD);

const transporter = nodemailer.createTransport({
    host: 'smtp.naver.com',
    port: 587, // pop/smtp를 이용할 때는 465, imap/smtp는 587
    auth: {
        user: process.env.NAVER_EMAIL,
        pass: process.env.NAVER_PASSWORD,
    },
    logger: true,
    debugger: true,
})

const mailOptions = {
    from: process.env.NAVER_EMAIL,
    to: process.env.SENDTO_EMAIL,
    subject: '테스트 이메일 3 (POP 사용 안 함 상태로 전송)',
    text: '안녕하세요, 메일 전송 API 테스트중입니다! 회원 가입을 완료하기 위해서는 다음 코드를 입력하세요 (136254)',
}

// 메일 발송
transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        console.error(error);
    } else {
        console.log('이메일 전송 성공: ', info.response);
    }
});
