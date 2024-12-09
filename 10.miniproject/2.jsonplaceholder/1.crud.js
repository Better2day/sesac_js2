
const axios = require('axios');
const fetch = require('node-fetch');
// import fetch from 'node-fetch';

async function fetchExample() {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts/1');
        if (!response.ok) {
            console.log('오류!');
            return;
        }

        const data = await response.json();
        console.log('Fetched data: ', data);
    } catch (error) {
        console.log('통신 오류!');;
    }
}

async function axiosExample() {
    try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts/1');
        console.log('응답 코드: ', response.status);
        console.log('Axios 데이터: ', response.data);
    } catch (error) {
        console.log('axios 통신 오류');
    }
}

(async () => {
    await fetchExample();
    await axiosExample();
});
