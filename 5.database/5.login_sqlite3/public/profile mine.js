document.addEventListener('DOMContentLoaded', () => {
    console.log('profile.js 진입 성공');
    loadProfileData();
    // checkLogin();
});

function checkLogin() {
    fetch('/check-login')
    .then((response) => {
        if (response.ok) {
            console.log('로그인된 사용자입니다');
            return response.json();
        } else {
            console.log('로그인하지 않았습니다.');
        }
    })
    .then((userData) => {
        loadProfileData(userData);
    });
}

function logout() {
    fetch('/logout')
    .then((response) => {
        if (response.ok) {
            console.log('로그아웃되었습니다.');
        } else {
            console.log('로그아웃 오류');
        }
    })
    .then((userData) => {
        loadProfileData({});
    });
}

async function loadProfileData() {
// function loadProfileData(userData) {
    // console.log('loadProfileData() 진입 성공');
    // console.log(userData);

    const response = await fetch('/profile-data');
    if (response.ok) {
        const data = await response.json();
        // console.log('로그인된 사용자입니다');
        document.getElementById('username').textContent = data.username;
        document.getElementById('email').textContent = data.email;
        document.getElementById('created_at').textContent = data.created_at;
        document.getElementById('role').textContent = data.role;
    } else {
        console.log('로그인하지 않았습니다.');
    }
    
/* 
    if (userData) {
            document.getElementById('username').textContent = userData.username;
            document.getElementById('email').textContent = userData.email;
            document.getElementById('created_at').textContent = userData.created_at;
            document.getElementById('role').textContent = userData.role;
   }

     */
}

document.getElementById('logout').addEventListener('click', logout);
