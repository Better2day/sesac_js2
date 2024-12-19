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
    users: []
}

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'signup.html'));
});

// 인증 코드 생성 함수
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
            res.json({ message: '이메일로 인증코드가 발송되었습니다' });
        }
    });

});

app.post('/verify', (req, res) => {
    const { email, code } = req.body;
    console.log(`FE 입력값 - email: ${email}, code: ${code}`);
    // console.log('우리 DB: ', database);
    // To-do 여기에서 두 개를 비교해서 사용자에게 응답 주기
    /* 
        if (database.users.filter((user) => (user.email === email && user.code === code))) {
            res.json({ message: '인증되었습니다!' });
        } else {
            res.status(404).json({ message: '인증에 실패했습니다.' });
        }
     */

    // console.log('database.users: ', database.users);

    // const user = database.users.filter((user) => user.email === email);
    // filter는 필터링된 결과가 한 개여도 배열로 반환 ∴ 다시 forEach 등 순환문을 돌리면서 확인해야 함
    // 이 결과값으로 순환문 없이 그냥 비교하려고 했으니 undefined

    const user = database.users.find((user) => user.email === email);
    // find는 조건에 맞는 것 한 개만 찾으면 바로 요소(배열 아님)를 반환하고 종료
    console.log('user: ', user);

    // console.log(`BE 임시 사용자 데이터: email: ${user.email}, code: ${user.code}`);

    if (user.email === email) {
        if (user.code === code) {
            res.json({ message: '인증되었습니다!' });
        } else {
            res.json({ message: '인증 코드가 틀렸습니다.' });
        }
    } else {
        res.status(401).json({ message: '인증에 실패했습니다.' });
    };

    // 제일 쉽게, forEach 순환문 돌리면서 비교
    /* 
        database.users.forEach(user => {
            console.log(`BE 임시 사용자 데이터: email: ${user.email}, code: ${user.code}`);
            if (user.email === email) {
                if (user.code === code) {
                    res.json({ message: '인증되었습니다!' });
                } else {
                    res.json({ message: '인증 코드가 틀렸습니다.' });
                }
            } else {
                res.status(401).json({ message: '인증에 실패했습니다.' });
            };
        });
    */
});

app.listen(PORT, () => {
    console.log('Server is running');
});