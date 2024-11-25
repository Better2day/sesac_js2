/* document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.getElementsByTagName('button');
    console.log(document.getElementsByTagName('button'));
    buttons.forEach(btn, () => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
        });
    });
}); */
// Collection이라 일반 배열과 다른지, 오류 발생

const userName = document.getElementById('userName');
const gender = document.getElementById('gender');
const prev = document.getElementById('prev');
const next = document.getElementById('next');
const page = parseInt(document.getElementById('page').textContent);

document.getElementById('searchBtn').addEventListener('click', (e) => {
    e.preventDefault();
    console.log(userName.value, gender.value, page);
    location.replace(`/crm/users?userName=${userName.value}&gender=${gender.value}`);
    // location.replace(`/crm/users?userName=${userName.value}&gender=${gender.value}&page=${page}`);
});
prev.addEventListener('click', (e) => {
    // e.preventDefault();
    location.replace(`/crm/users?userName=${userName.value}&gender=${gender.value}&page=${prev.value}`);
});
next.addEventListener('click', (e) => {
    // e.preventDefault();
    location.replace(`/crm/users?userName=${userName.value}&gender=${gender.value}&page=${next.value}`);
});
// fetch(`/crm/users?page=${prev.value}`);
// fetch(`/crm/users?page=${next.value}`);
// fetch로 하면 이전/다음 페이지 오프셋으로 DB 쿼리 후 새 데이터로 res.render해도 변화가 없어서 보류