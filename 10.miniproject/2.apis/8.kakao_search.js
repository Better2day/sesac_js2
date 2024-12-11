require('dotenv').config();
const axios = require('axios');

const RESTAPI_KEY = process.env.KAKAO_RESTAPI_KEY;

const url = 'https://dapi.kakao.com/v2/search/web';
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

const params2 = {
    query: query, // 필수
    sort: 'accuracy', // 선택
    page: 1, // 선택
    size: 5  // 선택
};

// Promise 기반 체이닝 (2015년 ES6 부터 도입)
/* 
axios.get(url, { headers, params })
    .then(response => {
        const data = response.data;
        console.log(data);
    })
 */

// Modern JS 방식 (async/await 방식. ES8?쯤부터 도입. ES2017, 2017년도)
const fetchFunction = async () => {
    // try catch 실무에서는 필수 (강의 중에는 시간 절약하려고 생략)
    const response = await axios.get(url, { headers, params });
    const data = response.data;
    console.log(data);
};

// fetchFunction();

const fetchFunctionPages = async (totalPages) => {
    // try catch 실무에서는 필수 (강의 중에는 시간 절약하려고 생략)
    try {
        for (let page = 1; page <= totalPages; page++) {
            params2.page = page;
            console.log(params2);
            const response = await axios.get(url, { headers, params: params2 });
            const data = response.data;
            console.log(data);
        }
    } catch (error) {
        console.error(`에러 코드: ${error.response?.status}, ${error.message}`);
    }
};

fetchFunctionPages(3);
