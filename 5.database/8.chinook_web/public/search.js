// html 파일에서 script 태그에 defer 속성 줬으므로 DOMContentLoaded 사용하지 않음

document.getElementById('searchForm').addEventListener('submit', (e) => {
    e.preventDefault(); // 기본 폼 기능 비활성화 (GET/POST 폼이 직접 요청하는 것을 방지)

    // 1. 폼 대신 직접 처리 - 입력값을 가져온다.
    const searchQuery = document.getElementById('searchQuery').value;

    search(searchQuery, 1); // 검색의 시작은 1페이지부터 한다.
});

async function search(searchQuery, page) {
    // console.log(searchQuery);
    
    // 2. 요청 (GET은 body가 없는 것이 표준)
    /* 
    const response = await fetch('/api/search', { // 이런 형태로 보낼거면 POST로 하거나
        method: 'GET',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ searchQuery }),    
    });
     */
    // 아니면 GET 파라미터. URL에 ?뒤 인수로 보낸다.ㅏ
    const response = await fetch(`/api/search?searchQuery=${encodeURIComponent(searchQuery)}&page=${page}`);
    const data = await response.json();
    console.log(data);
    
    // 3. 받아온 정보를 DOM에 렌더링
    const results = document.getElementById('results');
    results.innerHTML = '';
    
    if (data.results && data.results.length > 0) {
        data.results.forEach((artist) => {
        const li = document.createElement('li');
        li.textContent = artist.Name;
        results.appendChild(li);
        });
    } else {
        const li = document.createElement('li');
        li.textContent = '검색 결과가 없습니다.';
        results.appendChild(li);
    }

    // 4. Paging 처리
    displayPagination(searchQuery, parseInt(data.currentPage), parseInt(data.totalPage));
}

function displayPagination(searchQuery, currPage, totalPage) {
    const pagination = document.getElementById('pagination');
    pagination.innerHTML = ''; // 현재 내용 다 지우기

    // 이전 버튼 추가
    const prevButton = document.createElement('button');
    prevButton.textContent = '이전';
    pagination.appendChild(prevButton);
    
    // 내용 출력
    const pageInfo = document.createElement('span');
    pageInfo.textContent = `페이지: ${currPage} / ${totalPage}`;
    pagination.appendChild(pageInfo);

    // 다음 버튼 추가
    const nextButton = document.createElement('button');
    nextButton.textContent = '다음';
    nextButton.onclick = () => search(searchQuery, currPage + 1);
    pagination.appendChild(nextButton);
}