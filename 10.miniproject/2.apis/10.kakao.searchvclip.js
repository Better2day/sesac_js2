require('dotenv').config();
const axios = require('axios');

const RESTAPI_KEY = process.env.KAKAO_RESTAPI_KEY;

const url = 'https://dapi.kakao.com/v2/search/vclip';
const headers = {
    Authorization: `KakaoAK ${RESTAPI_KEY}`,
};

const query = '자바스크립트';

const params = {
    query: query, // 필수
    sort: 'accuracy', // 선택
    page: 1, // 선택
    size: 5  // 선택
};

axios.get(url, { headers, params })
    .then(response => {
        const data = response.data;
        console.log(data);
    })
