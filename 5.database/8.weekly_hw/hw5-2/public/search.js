document.addEventListener('DOMContentLoaded', () => {
    console.log('DOMContentLoaded event 진입');

    // document.getElementById('searchBtn').addEventListener('click', (e) => {
    document.getElementById('searchForm').addEventListener('submit', (e) => {
        console.log('searchForm submit event 진입');
        e.preventDefault();
        searchDB();
    });
});

function searchDB() {
    console.log('searchDB() 함수 진입');
}