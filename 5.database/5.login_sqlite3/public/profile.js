document.addEventListener('DOMContentLoaded', () => {
    loadProfileData();
    document.getElementById('logout-button').addEventListener('click', logout);
});

async function loadProfileData() {
    // try - catch 안넣었음..
    const response = await fetch('/profile-data');
    if (response.ok) {
        const data = await response.json();
        // console.log(data);
        
        document.getElementById('username').textContent = data.username;
        document.getElementById('email').textContent = data.email;
        document.getElementById('created_at').textContent = data.created_at;
        document.getElementById('role').textContent = data.role;
    } else {
        console.log(response.status);
    }
}

async function logout() {
    // try-catch 안넣었음.
    const response = await fetch('/logout');
    if (response.ok) {
        console.log('로그아웃 왜 안가냐...');
        window.location.href = '/'; // 로그아웃 후 홈페이지로 이동
    } else {
        console.error('로그아웃 실패');
    }
}
