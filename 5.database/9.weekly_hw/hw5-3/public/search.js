document.addEventListener('DOMContentLoaded', () => {
    // document.getElementById('searchBtn').addEventListener('click', (e) => {
    document.getElementById('searchForm').addEventListener('submit', (e) => {
        e.preventDefault();
        searchDB();
    });
});

function searchDB(offset = 0) {
    const searchQuery = document.getElementById('searchQuery').value;
    const searchType = document.getElementById('searchType').value;

    fetch(`/search?searchQuery=${searchQuery}&searchType=${searchType}&offset=${offset}`)
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                console.log('response is not ok');
            }
        })
        .then(rows => {
            renderResult(rows, offset);
        })
        .catch(error => {
            console.error(error);
        })
}

function renderResult(rows, offset) {
    const RESULT_PER_PAGE = 10;

    let tagsToAppend = '<ul>';
    for(let row of rows) {
        tagsToAppend += `<li>${row}</li>`;
    };
    tagsToAppend += '</ul>';
    tagsToAppend += '<button id="prev" style="margin-right: 10px">이전</button>';
    tagsToAppend += (offset / RESULT_PER_PAGE) + 1;
    tagsToAppend += '<button id="next" style="margin-left:  10px">다음</button>';
    document.getElementById('searchResult').innerHTML = tagsToAppend;
    document.getElementById('prev').addEventListener('click', () => {
        searchDB(offset - RESULT_PER_PAGE);
    })
    document.getElementById('next').addEventListener('click', () => {
        searchDB(offset + RESULT_PER_PAGE);
    })
}