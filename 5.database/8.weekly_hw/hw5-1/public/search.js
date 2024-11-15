document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('searchBtn').addEventListener('click', (e) => {
        e.preventDefault();
        searchArtist();
    })
});

async function searchArtist() {
    const searchQuery = document.getElementById('searchQuery').value;

    // const response = await fetch(`/search?searchQuery=${searchQuery}`);
    await fetch(`/search?searchQuery=${searchQuery}`)
/*  {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: { inputText },
    }); */    
    // if (response) {
    .then(response => {
        if (response.ok) {
            console.log('response to fetch is ok');
            return response.json();
        } else {
            console.log('response to fetch is not ok !!');
            throw new Error('response to fetch is not ok !!');
        }
    })
    // } else {
        //     console.log('response to fetch is null or undefined!');
        // })
    .then(data => {
        displayResult(data);
    })
    .catch(error => {
        console.error(error);
    });
}

function displayResult(data) {
    const rows = data;
    // console.log(rows);

    // const string = rows.split(',').Name;
    let string = '<ul>';
    rows.forEach(row => {
        string += `<li>${row.Name}</li>`;
    });
    string += '</ul>';
    // console.log(string);

    document.getElementById('searchResult').innerHTML = string;
}
