const express = require('express');
const nodemailer = require('nodemailer');
const morgan = require('morgan')
const randomstring = require('randomstring');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(morgan('dev'));

const transporter = nodemailer.createTransport({
    host: 'smtp.naver.com',
    port: 465,
    auth: {
        user: process.env.NAVER_EMAIL,
        pass: process.env.NAVER_PASSWORD,
    },
});

const database = {
    users
}

app.get('/', (req, res) => {
    res.sendFile(path.sendFile(__dirname, 'public', 'signup.html'));
});

const generateVerificationCode = () => {
    return randomstring.generate({
        length: 6,
        charset: 'numeric',
    });
};

app.post('/signup', (req, res) => {
    const email = req.body.email;
    const verifyCode = generateVerificationCode();

    console.log(verifyCode);
    database.users.push({ email: email, code: verifyCode });

    const mailOptions = {
        from: process.env.NAVER_EMAIL,
        to: process.env.SENDTO_EMAIL,
        subject: '[새싹] 회원 가입 인증 코드',
        // text: `회원 가입 코드: ${verifyCode}`,
        html: `
        <div style="font-family: Arial, sans-serif; text-align: center; padding: 20px;">
            <h2 style="color: #4CAF50;">서비스 가입을 환영합니다!</h2>
            <p>아래의 6자리 코드를 입력하여 인증을 완료해주세요:</p>
            <h1 style="color: #333; letter-spacing: 5px;">${verifyCode}</h1>
            <p>이 요청을 본인이 하지 않았다면, 이 메일을 무시하세요.</p>
        </div>
        `,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error(error);
            res.status(500).json({ message: '이메일 발송 중 오류 발생!' });
        } else {
            console.log();
            res.status(250).json({ message: '???' });
        }
    });

});

app.post('/verify', (req, res) => {
    const { email, code } = req.body;
    console.log('입력값: ', email, code);
    console.log('우리 DB: ', database);
    // To-do 여기에서 두 개를 비교해서 사용자에게 응답 주기
});

app.listen(PORT, () => {
    console.log('Server is running');
});