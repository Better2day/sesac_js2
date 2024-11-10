document.addEventListener('DOMContentLoaded', () => {
    fetch('/products')
        .then(response => response.json())
        .then(products => displayProducts(products));
    fetch('/cart')
        .then(response => response.json())
        .then(products => displayCart(products));
});

function displayProducts(products) {
    // 여기에 DOM 요소 가져와서 tbody에 상품 목록 출력
    const productTableBody = document.querySelector('#productTable tbody');

    products.forEach((product) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${product.id}</td>
            <td>${product.name}</td>
            <td>${product.price}</td>
            <td><button onclick="addToCart(${product.id})">담기</button></td>
                        `;
        // 생성한 태그를 부모에게 붙인다.
        productTableBody.appendChild(row);
    });

    if (products.length === 0) { // 상품 목록이 없으면
        productTableBody.innerHTML = `<tr><td colspan=4>모든 상품의 재고가 없습니다.</td></tr>`;
    }    
}

function displayCart(cart) {
    // 여기에 DOM 요소 가져와서 tbody에 상품 목록 출력
    const cartTableBody = document.querySelector('#cartTable tbody');
    let amount = 0;

    cart.forEach((product) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${product.id}</td>
            <td>${product.name}</td>
            <td>${product.price}</td>
            <td><button onclick="deleteItem(${product.id})">삭제</button></td>
                        `;
        cartTableBody.appendChild(row);
        amount += product.price;
    });

    if (cart.length === 0) { // 장바구니가 비어 있으면        
        cartTableBody.innerHTML = `<tr><td colspan=4>장바구니가 비어 있습니다.</td></tr>`;
    } else {
        cartTableBody.innerHTML += `<tr><td colspan=4>합계 금액: ${amount}</td></tr>`;
    }
}

function refreshCart() {
    document.querySelector('#cartTable tbody').textContent = ''; 
}

function addToCart(productId) {
    fetch(`/cart/${productId}`, {method: 'POST'})
        .then(response => response.json())
        .then(result => {
            console.log(result.status);
            if(result.status === 'SUCCESS') {
                console.log('카트 담기 성공');
            } else {
                console.log('카트 담기 실패');
            }
        })
        .catch(error => console.error(error));

    // 화면 갱신
    refreshCart(); // 기존 장바구니 목록 화면에서 삭제
    
    fetch('/cart') // 갱신된(품목 추가된) 장바구니 목록 다시 받아오기
    .then(response => response.json())
    .then(products => displayCart(products));

    // 화면 갱신 (기존 장바구니 목록을 지우고 다시 보여줘야 하는데, 아래처럼 하면 '추가'되어버려서 문제. 지우는 함수 추가?)
    // displayCart();
/*    
    fetch('/cart')
        .then(response => response.json())
        .then(products => displayCart(products));
 */        
}

function deleteItem(productId) {
    fetch(`/cart/${productId}`, {method: 'DELETE'})

    

    refreshCart(); // 기존 장바구니 목록 화면에서 삭제
    
    fetch('/cart') // 갱신된(품목 삭제된) 장바구니 목록 다시 받아오기
    .then(response => response.json())
    .then(products => displayCart(products));
}