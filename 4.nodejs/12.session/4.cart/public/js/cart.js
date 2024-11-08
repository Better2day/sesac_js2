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
            <tr>
                <td>${product.id}</td>
                <td>${product.name}</td>
                <td>${product.price}</td>
                <td><button onclick="addToCart(${product.id})">담기</button></td>
            </tr>
                        `;
        productTableBody.appendChild(row);
    });
    // 비어있으면 '상품 목록이 없습니다' 태그 문자열 생성

    // 생성한 태그를 부모에게 appendChild로 붙인다.
    

    // document.getElementById('productTable', 
}

function displayCart(products) {
    // 여기에 DOM 요소 가져와서 tbody에 상품 목록 출력
    const productTableBody = document.querySelector('#cartTable tbody');
    
    products.forEach((product) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <tr>
                <td>${product.id}</td>
                <td>${product.name}</td>
                <td>${product.price}</td>
                <td><button onclick="addToCart(${product.id})">담기</button></td>
            </tr>
                        `;
        productTableBody.appendChild(row);
    });
}

function addToCart(productId) {
    fetch(`/add-to-cart/${productId}`, {method: 'POST'});
    // 성공/실패 확인하는 코드 작성
}