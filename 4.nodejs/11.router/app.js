const express = require('express');
const app = express();

const userRouter = require('./routes/userRouter');
const productRouter = require('./routes/productRouter');
const cartRouter = require('./routes/cartRouter');

app.use('/user', userRouter);
app.use('/product', productRouter);
app.use('/cart', cartRouter);

app.get('/', (req, res) => {
    res.send('Welcome');
});

app.listen(3000, () => {
    console.log("Server's ready");
});
