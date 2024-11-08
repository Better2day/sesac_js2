document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('loginButton').addEventListener('click', login);
    document.getElementById('logoutButton').addEventListener('click', logout);

    checkLoginStatus();
});

function checkLoginStatus() {
    // 내 로그인 정보가 아직 유효한지 어떻게 알까? 서버에게 문의
    //const {userid, username} = req.session;

    fetch('/check-login', {
/* 
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({userid}),
*/            
    })
        .then(response => {
            // BE에게 내 세션이 살아 있는지 보고, 살아 있으면 사용자 이름을 받아온다.
            if (response.ok) {
                console.log('로그인 성공');
                // window.location.href = '/profile';
                // showProfile(username);
                return response.json();
            } else {
                console.log('로그인 실패');
            }
        })        
        .then(data => {
            console.log(data.username);
            showProfile(data.username);
        })    
}

function logout() {
    fetch('/logout')
        .then(response => {
            if (response.ok) {
                showLoginForm();
            }
        })
}

function login(e) {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    console.log('로그인 버튼 클릭');

    fetch('/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({username, password}),
    })
        .then(response => {
            if (response.ok) {
                console.log('로그인 성공');
                // window.location.href = '/profile';
                showProfile(username);
            } else {
                console.log('로그인 실패');
            }
        })
}

function showProfile(username) {
    document.getElementById('loginFormContainer').style.display = 'none';
    document.getElementById('profile').style.display = 'block';
    document.getElementById('usernameSpan').innerText = username;
}

function showLoginForm() {
    document.getElementById('loginFormContainer').style.display = 'block';
    document.getElementById('profile').style.display = 'none';
}
