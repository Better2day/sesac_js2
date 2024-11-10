document.addEventListener('DOMContentLoaded', () => {
    fetch('/products')
        .then(response => response.json())
        .then(products => displayProducts(products));

    refreshCart();
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
            <td>${product.quantity}</td>
            <td>
                <button onclick="increaseQty(this)">+</button>
                <button onclick="decreaseQty(this)" ${(product.quantity === 1) ? 'disabled' : ''}>-</button>
                <button onclick="updateQty(this)">수량 확정</button>
            </td>
            <td>${product.priceperitem}</td>
            <td><button onclick="deleteItem(${product.id})">삭제</button></td>
            `;
            cartTableBody.appendChild(row);
            amount += product.priceperitem;
        });

    if (cart.length === 0) { // 장바구니가 비어 있으면        
        cartTableBody.innerHTML = `<tr><td colspan=7>장바구니가 비어 있습니다.</td></tr>`;
    } else {
        cartTableBody.innerHTML += `<tr><td colspan=7>합계 금액: ${amount}</td></tr>`;
    }
}

function refreshCart() { // 장바구니 갱신
    document.querySelector('#cartTable tbody').textContent = ''; // 현재 장바구니 화면에서 삭제
    
    fetch('/cart') // 갱신된 장바구니 목록을 서버에서 다시 받아오기
    .then(response => response.json())
    .then(products => displayCart(products));
}

function addToCart(productId) {
    fetch(`/cart/${productId}`, {method: 'POST'})
        .then(response => response.json())
        .then(result => {
            if(result.status === 'SUCCESS') {
                console.log('장바구니에 담기 성공');
            } else {
                console.log('장바구니에 담기 실패');
            }
        })
        .catch(error => console.error(error));

    refreshCart(); // 장바구니 갱신
}

function deleteItem(productId) {
    fetch(`/cart/${productId}`, {method: 'DELETE'})
        .then(response => response.json())
        .then(result => {
            if(result.status === 'SUCCESS') {
                console.log('장바구니에서 삭제 성공');
            } else {
                console.log('장바구니에서 삭제 실패');
            }
        })
        .catch(error => console.error(error));

    refreshCart(); // 장바구니 갱신
}

function increaseQty(button) {
    const tr = button.parentNode.parentNode;
    const quantity = parseInt(tr.children[3].textContent) + 1;
    tr.children[3].textContent = quantity; // 수량 변경
    tr.children[5].textContent = tr.children[2].textContent * quantity; // Price per Item 변경
    minusBtn = button.parentNode.children[1];
    if (minusBtn.disabled) {
        minusBtn.removeAttribute("disabled")
    };
}

function decreaseQty(button) {
    const tr = button.parentNode.parentNode;
    let quantity = parseInt(tr.children[3].textContent);
    if (quantity > 1) { // 장바구니에 2개 이상 있는 상품만 수량을 줄일 수 있음. (0개로 만들려면 삭제 버튼 이용)
        quantity--;
        tr.children[3].textContent = quantity;
        tr.children[5].textContent = tr.children[2].textContent * quantity;
    }
    if (quantity == 1) {
        button.setAttribute("disabled", "true");
    }
}

function updateQty(product) {
    const tr = product.parentNode.parentNode;
    productId = parseInt(tr.children[0].textContent);
    quantity = parseInt(tr.children[3].textContent);

    fetch(`/cart/${productId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({quantity: quantity}),
    })
    .then(response => response.json())
    .then(result => {
        if(result.status === 'SUCCESS') {
            console.log('품목 수량 변경 성공');
        } else {
            console.log('품목 수량 변경 실패');
        }
    })
    .catch(error => console.error(error));

    refreshCart(); // 장바구니 갱신
}

// 장바구니에 있는 여러 상품의 수량을 이것저것 변경 후 일괄 확정하는 함수는 아직 못 만들었음