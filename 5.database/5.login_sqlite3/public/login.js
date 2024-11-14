document.addEventListener('DOMContentLoaded', () => {
    // 폼 잡아다가... 폼의 기본 기능 못하게 하고...
    document.getElementById('login-form').addEventListener('submit', async (e) => {
        e.preventDefault(); // 폼의 기본 기능 무력화

        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        const response = await fetch('/login', {
            method: 'POST',
            // headers: { 'Content-Type': 'application/json' },
            // body: JSON.stringify({ username, password })
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: new URLSearchParams({username: username, password: password})
        });

        if (response.redirected) {
            const data = await response.text();
            console.log(response.url);
            window.location.href = response.url;
        } else {
            const data = await response.text(); // 응답이 어떤 형태냐??? 백엔드가 결정한걸로 파싱...
            document.getElementById('login-message').textContent = data;
        }
    });
    // fetch 로 /login 요청해서... 결과 받아서...
    // 실패했으면, 이 DOM 의 어딘가에.. 결과를 출력한다...
    // 성공했으면, 원래 하던대로.. redirect로 /profile 로 이동한다...
});
