const axios = require('axios');
const cheerio = require('cheerio');

const url = 'http://www.cine21.com/rank/boxoffice/domestic';

axios.get(url)
  .then((response) => {
    // console.log(response.data);
    // const data = cheerio.load(response.data);
    // const title = data('title').text();
    // 아래 $는 jQuery의 $와 무관. cheerio 기능
    const $ = cheerio.load(response.data);
    $('script').remove() // <script> 구문을 다 삭제
    console.log('전체:', $.html());

    const title = $('title').text();
    console.log('사이트 제목:', title);

    // 원하는 헤드라인 태그 가져오기 (클래스는 웹브라우저 개발자 도구에서 요소 선택으로 가져옴)
    // 요소 선택 단축키: Ctrl + Shift + C
    const movieList = [];

    const movieListDiv = $('#boxoffice_list_content');
    console.log(movieListDiv);
    /* 
        $(movieListDiv).find('boxoffice_li').each((_, element) => {
          const title = $(element).text().trim();
          movieList.push(title);
        });
    
        console.log(movieList);
         */
  });
