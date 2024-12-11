document.querySelectorAll('button').forEach(button => {
    button.addEventListener('click', async (e) => {
        e.preventDefault();
        const query = document.getElementById('query').value;

        const response = await fetch(`/api/search?query=${encodeURIComponent(query)}`);
        if (!response.ok) {
            console.log('Error!');
        } else {
            const results = await response.json();
        }
    });
});
