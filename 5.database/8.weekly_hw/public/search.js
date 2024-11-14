document.addEventListener('DOMContentLoaded', () => {
    // console.log('DOMContentLoaded 진입!');
    /* 
    document.getElementById('searchBtn').addEventListener('click', (e) => {
        // console.log('searchBtn addEventListener 진입!');
        e.preventDefault();
        searchArtist();
    })
     */
    // displayResult();
});
/* 
async function searchArtist() {
    console.log('searchArtist 함수 진입');
    const inputText = document.getElementById('inputText').value;

    const response = await fetch('/search', {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: { inputText },
    });
    
    if (response) {
        if (response.ok) {
            console.log('response to fetch is ok');
        } else {
            console.log('response to fetch is not ok !!');
        }
    } else {
        console.log('response to fetch is null or undefined!');
    }
}
 */
function displayResult() {

}
