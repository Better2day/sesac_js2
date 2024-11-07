document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById('form');
    const username = document.getElementById('username');

    // DOM이 로딩되자마자, 사용자 목록을 가져와서 화면에 출력
    updateUsers();

    // 새로운 사용자 추가
    form.addEventListener('submit', (event) => {
        event.preventDefault();

        // console.log(username);
        const name = username.value;
        if (!name) {
            alert('이름을 입력하세요.');
            return ;
        }

        registerUser(name);
    });
})

function registerUser(name) {
    fetch('/user', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name }),
    }).then((response) => {
        if (response.ok) {
            // alert('등록 성공');
            username.value = '';
            updateUsers();
        } else {
            alert('등록 실패');
        }
    }).catch((error) => {
        alert(`등록 중에 오류가 발생했습니다. ${error.message}`);
    })
}

function updateUsers() {
    fetch('/user')
    .then((response) => {
        const result = response.json();
        return result;
    })
    .then((users) => {
        // 결과 출력
        console.log(users);
        const userTable = document.getElementById('userTable');
        userTable.innerText = ''; // 테이블 초기화

        if (Object.keys(users).length === 0) {
            // 사용자가 하나도 없는 경우
            const row = document.createElement('div');
            row.textContent = '등록된 사용자가 없습니다';
            userTable.appendChild(row);
        } else {
            for (const key in users) {
                const row = document.createElement('div');
                row.innerText = `ID: ${key}, Name: ${users[key]}`;
                
                // '수정' 버튼 추가
                const modifyButton = document.createElement('button');
                modifyButton.textContent = '수정';
                row.appendChild(modifyButton);
    
                // '삭제' 버튼 추가
                const deleteButton = document.createElement('button');
                deleteButton.textContent = '삭제';
                deleteButton.addEventListener('click', () => deleteUser(key));
                row.appendChild(deleteButton);
    
                // 위의 모든 내용 (즉, 한 줄을 div 안에 넣어줌)
                userTable.appendChild(row);
            }
        }
    })
    .catch((error) => {
        console.error('사용자를 불러오는데 실패하였음', error.message);
        alert('사용자 로딩 오류');
    })
}

function modifyUser(userId) {
    const newName = prompt('수정할 이름을 입력핫요.');
    if (newName !== null) {
        fetch(`/user/${userId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then(response => {
            if (response.ok) {
                updateUsers(); // 화면 갱신
            } else {
                alert('수정 실패');
            }
        })
        .catch(error => {
            console.error('수정 중 오류 발생:', error);
            alert('수정 중 오류가 발생했습니다.');
        });
    }

}

function deleteUser(userId) {
    console.log(encodeURI(userId));
    console.log(encodeURIComponent(userId));
    fetch('/user/' + `${encodeURI(userId)}`, {
        method: 'DELETE',
        // headers: { 'Content-Type':'charset=utf-8' },
    })
    .then(response => {
        if (response.ok) {
            // alert('삭제 성공');
            updateUsers();
        } else {
            alert('삭제 실패');
        }

    })
    .catch(error => {
        console.error('삭제 중 오류??', error.message);
        alert('삭제 중 오류 발생!');
    })
}