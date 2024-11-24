require('dotenv').config({path: '.env.development'});
const express = require('express');
const nunjucks = require('nunjucks');
const morgan = require('morgan');
const debug = require('debug');

// Router
const userRouter = require('./routes/userRouter');
const otherRouter = require('./routes/otherRouter');
const userDetailRouter = require('./routes/userDetailRouter');
const storeDetailRouter = require('./routes/storeDetailRouter');
const otherDetailRouter = require('./routes/otherDetailRouter');

const PORT = process.env.PORT || 3000;
const app = express();
// const debugLog = new debug('log');
// const debugError = new debug('error');


// Middleware loading
app.use(express.static('public'));

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

nunjucks.configure('views', {
    autoescape: true,
    express: app,
});
app.set('view engine', 'html');


// Route - 사용자
app.get('/', (req, res) => {
    res.redirect('/crm/users');
});

app.use('/crm/users', userRouter); // 고객 정보
app.use('/crm', otherRouter); // 고객 외 정보
app.use('/crm/user_detail', userDetailRouter); // 고객 상세 정보
app.use('/crm/store_detail', storeDetailRouter); // 상점 상세 정보
app.use('/crm', otherDetailRouter); // 고객/상점 외 상세 정보


app.listen(PORT, () => {
    console.log(`CRM server is listening on ${PORT}`);
});
