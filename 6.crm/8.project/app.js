require('dotenv').config({path: '.env.development'});
const express = require('express');
const nunjucks = require('nunjucks');
const morgan = require('morgan');
const debug = require('debug');
const userRouter = require('./routes/userRouter');
const otherRouter = require('./routes/otherRouter');

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
    watch: true,
});
app.set('view engine', 'html');


// Route - 사용자

app.get('/', (req, res) => {
    res.redirect('/crm/users');
});

app.use('/crm/users', userRouter);
app.use('/crm/', otherRouter);


app.listen(PORT, () => {
    console.log(`CRM server is listening on ${PORT}`);
});
