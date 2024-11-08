const express = require('express');
const session = require('express-session');
const path = require('path');

const app = express();
const port = 3000;

const products = [
    { id: "1", name: '바나나', price: 2000 },
    { id: 2, name: '사과', price: 3000 },
    { id: 3, name: '오렌지', price: 1500 },
]

console.log(JSON.stringify(products));

// 정적 폴더를 public으로 정의
// 사용자가 route를 요청했는데, 처리 조건문에 없으면 정적 폴더에서 상응하는 파일을 가져간다.
app.use(express.static(path.join(__dirname, 'public')));
// 요청 리소스 앞에 /static 이 들어있어도, public 폴더로 연결하려면 아래 추가
// app.use('/static', static(path.join(__dirname, 'public')));

// app('/') 없어도 기본값(index.html)으로 설정됨

app.use(session({
    secret: 'my-secret-1234',
    resave: false,
    saveUninitialized: true
    }));

app.get('/products', (req, res) => {
    res.json(products);
    const a = document.getElementById('');
    const b = document.getElementById('');

})

app.get('/cart', (req, res) => {
    const cart = req.session.cart || [];
    console.log(`카트 요청: ${JSON.stringify(cart)}`);
    res.json(cart);

    // To-do: 장바구니에 있는 모든 상품의 합산 가격  반환하기
})

app.post('/add-to-cart/:productId', (req, res) => {
    const productId = parseInt(req.params.productId);
    console.log(productId, typeof productId);
    const product = products.find((p) => p.id === productId);

    // console.log(product);

    if (!product) {
        return res.status(404).json({message: '상품이 없다!'});
    }

    // To-do: 장바구니에 담는 코드 작성
    const cart = req.session.cart || [];

    cart.push({
        id: product.id,
        name: product.name,
        price: product.price,
    });

    req.session.cart = cart;
    console.log(cart);

    res.json({ message: '상품이 장바구니에 담겼습니다'});
})

app.listen(port, () => {
    console.log('Server ready');
});
