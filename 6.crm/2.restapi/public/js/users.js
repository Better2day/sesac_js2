const searchButton = document.getElementById('search-button');
const searchInput = document.getElementById('search-name');

searchButton.addEventListener('click', () => {
    searchName = searchInput.value;
    fetchUsers(searchName);
});

function fetchUsers(searchName) {
    // .then으로 작성하거나, async/await로 작성할 수 있음
    fetch('/api/users')
        .then(response => response.json())
        .then(data => {
            // 렌더링 코드 작성
            renderTable(data);
        });

        // const response = await fetch('/api/users'); // 위 코드와 동일
        // const data = await response.json() ;
}

function renderTable(data) {
    const tableHeader = document.getElementById('table-header');
    const tableBody = document.getElementById('table-body');

    // 기존 내용 지우고 시작
    tableHeader.innerHTML = '';
    tableBody.innerHTML = '';

    // Header rendering:  tr 안에 th
    const headerRow = document.createElement('tr');
    const fields = Object.keys(data[0]);
    console.log(fields);
    fields.forEach(f => {
        if (f !== 'Id' && f !== 'Address') {
            const th = document.createElement('th');
            th.textContent = f;
            headerRow.appendChild(th);
        };
    });
    tableHeader.appendChild(headerRow);
    
    // Body rendering: tr 안에 td 
    data.forEach(row => {
        const bodyRow = document.createElement('tr');
        bodyRow.addEventListener('click', () => {
            window.location = `/user/${row.Id}`;

        })
        // for (const [key, value] of Object.entries(row)) {
        for (const [key, value] of Object.entries(row)) {
            if (key !== 'Id' && key !== 'Address') {
                const td = document.createElement('td');
                td.textContent = value;
                bodyRow.appendChild(td);
                // console.log('한 줄 한 줄 읽고 있음:', key, value);
            }
        }
        tableBody.appendChild(bodyRow);
    });
/* 
    let values = Object.entries(data[0]);
    fields.forEach(f => {
        const td = document.createElement('td');
        td.textContent = f;
        bodyRow.appendChild(td);
        // values.push(Object.entries(f));
    })
    tableBody.appendChild(bodyRow);
    console.log(values);
 */
    // Object.entries(fields);
    // Object.entries()를 통해서 td를 추가한다.
    // const values = 
    // data[field]
}

fetchUsers(''); // 시작할 때는 그냥 빈값으로 조회 (모든 사용자 전체 조회)