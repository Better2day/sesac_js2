document.addEventListener('DOMContentLoaded', () => {
    fetch('/products')
        .then(response => response.json())
        .then(products => displayProducts(products));
});

function displayProducts(products) {
    // 여기에 동 요소 가져와서 tbody에 상품 목록 출력
    // console.log(products);

    // 실습중 (내 코드)
    // 목록이 비어있는지 확인해서
    
    // 상품이 있으면 순환하면서 상품 태그 생성
    /* 
    <tr>
        <td>1</td>
        <td>바나나</td>
        </tr>2000</td>
    </tr>
    형태
    */
    const productTableBody = document.querySelector('#productTable tbody');
    if (products) {
        for(let product of products) {
            const tagToCreate = `<tr>
                                    <td>${product.id}</td>
                                    <td>${product.name}</td>
                                    <td>${product.price}</td>
                                </tr>`;
            productTableBody += tagToCreate;
        }
        // document.getElementById('productTable')

    }
    // 비어있으면 '상품 목록이 없습니다' 태그 문자열 생성

    // 생성한 태그를 부모에게 appendChild로 붙인다.
    

    // document.getElementById('productTable', 

}