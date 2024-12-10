document.getElementById('search-form').addEventListener('submit', async (event) => {
    event.preventDefault();

    const query = document.getElementById('query').value.trim();

    // 나중에 여기에 try catch 넣기
    const resultElement = document.getElementById('results');
    resultElement.innerHTML = '<li>loading...</li>';
    const response = await fetch(`/search/blog?query=${encodeURIComponent(query)}`);
    const data = await response.json();
    resultElement.innerHTML = '';

    // 잘 왔다고 가정하고 (실제로는 가정하면 안 되고, 오류 확인해야 한다.)
    if (data.items && data.items.length > 0) {
        data.items.forEach((item) => {
            const li = document.createElement('li');
            li.innerHTML = `
            <h2><a href="${item.link}" target="_blank">${item.title}</a></h2>
            <p>${item.description}}</p>
            <small>Post Date: ${item.postdate}</small>
            `;
            resultElement.appendChild(li);
        });
    }
});
