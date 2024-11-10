const express = require('express');
const session = require('express-session');
// const bodyParser = require('body-parser');

const path = require('path');

const app = express();
const port = 3000;

const products = [
    { id: 1, name: '바나나', price: 2000 },
    { id: 2, name: '사과', price: 3000 },
    { id: 3, name: '오렌지', price: 1500 },
]
// console.log(`products = ${products}`);
// console.log(`JSON.stringify(products) = ${JSON.stringify(products)}`);

// 정적 폴더를 public으로 정의
// 사용자가 route를 요청했는데, 처리 조건문에 없으면 정적 폴더에서 상응하는 파일을 가져간다.
app.use(express.static(path.join(__dirname, 'public')));
// 요청 리소스 앞에 /static 이 들어있어도, public 폴더로 연결하려면 아래 추가
// app.use('/static', static(path.join(__dirname, 'public')));

// app('/') 없어도 기본값(index.html)으로 설정됨

// app.use(bodyParser.json());
app.use(express.json());

app.use(session({
    secret: 'my-secret-1234',
    resave: false,
    saveUninitialized: true
    }));

app.get('/products', (req, res) => {
    res.json(products);
});

app.get('/cart', (req, res) => {
    const cart = req.session.cart || [];
    // console.log(`카트 요청: ${JSON.stringify(cart)}`);
    res.json(cart);

    // To-do: 장바구니에 있는 모든 상품의 합산 가격  반환하기
});

app.post('/cart/:productId', (req, res) => {
    const productId = parseInt(req.params.productId);
    const product = products.find((product) => product.id === productId);
    // console.log(product);

    if (!product) {
        return res.status(404).json({ "status" : "FAIL" });
    }

    // To-do: 장바구니에 담는 코드 작성
    const cart = req.session.cart || [];
    cart.push({
        id: product.id,
        name: product.name,
        price: product.price,
        quantity: 1,
        priceperitem: product.price
    }); // 객체 형식이 같으므로 product를 통채로 넘겨주는 게 간결
    req.session.cart = cart;

    // res.json({ message: '상품이 장바구니에 담겼습니다'});
    res.json({ "status" : "SUCCESS" });
});

app.delete('/cart/:productId', (req, res) => {
    // productId 품목을 카트에서 삭제
    // req.session.cart 에서 req.params.productId에 해당하는 항목 삭제
    const productId = parseInt(req.params.productId);

    const cart = req.session.cart;
    // 장바구니 목록(객체 배열)에서 해당 품목이 있는 인덱스를 찾아서, 해당 객체 삭제
    cart.splice(cart.findIndex((product) => product.id === productId), 1);
    req.session.cart = cart;

    res.json({ "status" : "SUCCESS" });
});

app.patch('/cart/:productId', (req, res) => {
    const productId = parseInt(req.params.productId);

    const cart = req.session.cart;
    const product = cart.find((product) => product.id === productId);
    if (!product) {
        return res.status(404).json({ "status" : "FAIL" });
    }

    product.quantity = req.body.quantity;
    product.priceperitem = product.quantity * product.price;
    cart.splice(cart.findIndex((product) => product.id === productId), 1, product);

    req.session.cart = cart;

    // res.json({ message: '상품이 장바구니에 담겼습니다'});
    res.json({ "status" : "SUCCESS" });
});

app.listen(port, () => {
    console.log('Server ready');
});
