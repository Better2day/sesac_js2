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
            renderResult(rows, offset, searchType);
        })
        .catch(error => {
            console.error(error);
        })
}

async function renderResult(rows, offset, searchType) {
    const RESULT_PER_PAGE = 10;
    // console.log(`offset = ${offset}, offset - RESULT_PER_PAGE = ${offset - RESULT_PER_PAGE}, offset + RESULT_PER_PAGE = ${offset + RESULT_PER_PAGE}`);

    const count = await getCount(searchType);

    let tagsToAppend = '<ul>';
    for(let row of rows) {
        tagsToAppend += `<li>${row}</li>`;
    };
    tagsToAppend += '</ul>';
    tagsToAppend += '<button id="prev" style="margin-right: 10px">이전</button>';
    tagsToAppend += `페이지 ${(offset / RESULT_PER_PAGE) + 1} / ${Math.ceil(count / RESULT_PER_PAGE)}`;
    tagsToAppend += '<button id="next" style="margin-left:  10px">다음</button>';
    document.getElementById('searchResult').innerHTML = tagsToAppend;

    prevBtn = document.getElementById('prev');
    nextBtn = document.getElementById('next');
    if (offset - RESULT_PER_PAGE >= 0) {
        prevBtn.addEventListener('click', () => {
            searchDB(offset - RESULT_PER_PAGE);
        })
    } else {
        prevBtn.setAttribute('disabled', true);
    }
    if (offset + RESULT_PER_PAGE <= count) {
        nextBtn.addEventListener('click', () => {
            searchDB(offset + RESULT_PER_PAGE);
        })
    } else {
        nextBtn.setAttribute('disabled', true);
    }        
}

async function getCount(searchType) {
    try {
        const response = await fetch(`/count?searchType=${searchType}`);
        if (response.ok) {
            const data = await response.json();
            return data.total;
        } else {
            console.log('response is not ok');
        }
    } catch (error) {
        console.error(error);
    }
}