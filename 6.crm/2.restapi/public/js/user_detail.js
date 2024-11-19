const userDetail = document.getElementById('user-detail');

const userId = window.location.pathname.split('/').pop();
console.log(userId);

function fetchUserDetail() {
    fetch(`/api/users/${userId}`)
        .then(response => response.json())
        .then(data => {
            renderUserDetail(data);
        })
}

function renderUserDetail(user) {
    const row = document.createElement('p');
    row.textContent = JSON.stringify(user);

    userDetail.appendChild(row);
}

fetchUserDetail();
