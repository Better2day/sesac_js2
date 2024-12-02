require('dotenv').config({ path: '.env.development' });
const express = require('express');
const nunjucks = require('nunjucks');
const morgan = require('morgan');
const debug = require('debug');

// Router
const userRouter = require('./routes/userRouter');
const orderRouter = require('./routes/orderRouter');
const orderItemRouter = require('./routes/orderItemRouter');
const itemRouter = require('./routes/itemRouter');
const storeRouter = require('./routes/storeRouter');
const userDetailRouter = require('./routes/userDetailRouter');
const orderDetailRouter = require('./routes/orderDetailRouter');
const orderItemDetailRouter = require('./routes/orderItemDetailRouter');
const itemDetailRouter = require('./routes/itemDetailRouter');
const storeDetailRouter = require('./routes/storeDetailRouter');

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
app.use('/crm/orders', orderRouter); // 주문 정보
app.use('/crm/order_items', orderItemRouter); // 주문 내 상품 정보
app.use('/crm/items', itemRouter); // 상품 정보
app.use('/crm/stores', storeRouter); // 상점 정보
app.use('/crm/user_detail', userDetailRouter); // 고객 상세 정보
app.use('/crm/order_detail', orderDetailRouter); // 주문 상세 정보
app.use('/crm/orderitem_detail', orderItemDetailRouter); // 주문 내 상품 상세 정보
app.use('/crm/item_detail', itemDetailRouter); // 상품 상세 정보
app.use('/crm/store_detail', storeDetailRouter); // 상점 상세 정보


app.listen(PORT, () => {
    console.log(`CRM server is listening on ${PORT}`);
});
