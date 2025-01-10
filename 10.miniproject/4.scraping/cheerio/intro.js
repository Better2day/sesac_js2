const axios = require('axios');
const cheerio = require('cheerio');

const url = 'https://example2.com';

axios.get(url)
  .then((response) => {
    // console.log(response.data);
    // const data = cheerio.load(response.data);
    // const title = data('title').text();
    // 아래 $는 jQuery의 $와 무관. cheerio 기능
    const $ = cheerio.load(response.data);
    const title = $('title').text();
    console.log('제목:', title);
  })
  .catch((error) => {
    console.error('요청 에러:', error.status);
  })
