import { fetch_checkLoginStatus } from './checkuser.js';

document.addEventListener('DOMContentLoaded', () => {
    checkLoginStatus();

    document.getElementById('login').addEventListener('click', (event) => {
        event.preventDefault();
        login();
    });
});

function checkLoginStatus() {
    fetch_checkLoginStatus()
        .then(username => {
            if (username) {
                showProfile(username);
            } else {
                showLoginForm();
            }
        })
}

function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    fetch('/api/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password })
    })
        .then((response) => {
            if (response.ok) {
                // 로그인 성공
                return response.json();
            } else {
                // 로그인 실패
                throw new Error('로그인 실패');
            }
        })
        .then((data) => { // 로그인 성공시 json 결과 파싱해서 다시 데이터 추출함
            checkLoginStatus();
        })
        .catch((error) => { // 로그인 실패시 오류 처리
            alert('로그인 실패');
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