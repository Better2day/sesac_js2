document.addEventListener('DOMContentLoaded', () => {
    // document.getElementById('searchBtn').addEventListener('click', (e) => {
    document.getElementById('searchForm').addEventListener('submit', (e) => {
        e.preventDefault();
        searchDB();
    });
});

function searchDB() {
    const searchQuery = document.getElementById('searchQuery').value;
    const searchType = document.getElementById('searchType').value;

    fetch(`/search?searchQuery=${searchQuery}&searchType=${searchType}`)
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                console.log('response is not ok');
            }
        })
        .then(rows => {
            renderResult(rows);
        })
        .catch(error => {
            console.error(error);
        })
}

function renderResult(rows) {
    let tagsToAppend = '<ul>';
    for(let row of rows) {
        tagsToAppend += `<li>${row}</li>`;
    };
    tagsToAppend += '</ul>';
    document.getElementById('searchResult').innerHTML = tagsToAppend;
}