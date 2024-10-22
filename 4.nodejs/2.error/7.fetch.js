try {
    let response = fetch('https://api.example.com/data');
    if (!response.ok) {
        throw new Error(`HTTP error: ${rsponse.status}`);
    }
} catch (e) {
    console.log('요청 오류');
}
