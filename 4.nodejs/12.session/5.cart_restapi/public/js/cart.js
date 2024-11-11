import { fetch_checkLoginStatus } from './checkuser.js';

document.addEventListener('DOMContentLoaded', () => {
    fetch_checkLoginStatus();
    loadCart();
});

function loadCart() {
    fetch('/api/cart')
        .then((response) => {
            if (response.ok) {
                // 카트 가져오기 성공
                return response.json();
            } else if (response.status === 401) {
                response.json()
                    .then((data) => {
                        alert(data.message);
                        if (data.redirectUrl) {
                            window.location.href = data.redirectUrl;
                        }
                    })
            }
        })
        .then((cart) => {
            displayCart(cart);
        })
}

function displayCart(cartData) {
    const cart = cartData.cart;
    const cartTableBody = document.querySelector('#cartTable tbody');

    cart.forEach((item) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${item.id}</td>
            <td>${item.name}</td>
            <td>${item.price}</td>
            <td>${item.quantity}
                <button class="increase-btn" data-product-id="${item.id}">+</button>
                <button class="decrease-btn" data-product-id="${item.id}">-</button>
            </td>
            <td><button class="remove-btn" data-product-id="${item.id}">삭제</button></td>
        `
        cartTableBody.appendChild(row);

        // 이벤트 리스너 등록
        document.querySelectorAll('.increase-btn').forEach((button) => {
            button.addEventListener('click', () => {
                const productId = button.getAttribute('data-product-id');
                updateQuantity(productId, 1);
            })
        });

        document.querySelectorAll('.decrease-btn').forEach((button) => {
            button.addEventListener('click', () => {
                const productId = button.getAttribute('data-product-id');
                updateQuantity(productId, -1);
            })
        });

        document.querySelectorAll('.remove-btn').forEach((button) => {
            button.addEventListener('click', () => {
                const productId = button.getAttribute('data-product-id');
                removeFromCart(productId);
            })
        });
    })
}

function updateQuantity(productId, change) {
    console.log(productId);
    fetch(`/api/cart/${productId}?change=${change}`, {
        method: 'PUT'
    })
        .then((response) => response.json())
        .then((data) => {
            // 업데이트 성공
        })
}

function removeFromCart(productId) {
    fetch(`/api/cart/${productId}`, {
        method: 'DELETE'
    })
        .then((response) => response.json())
        .then((data) => {
            // 삭제 성공
        })
}