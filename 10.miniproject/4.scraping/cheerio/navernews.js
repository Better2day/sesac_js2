const axios = require('axios');
const cheerio = require('cheerio');

const url = 'https://news.naver.com/section/105';

axios.get(url)
  .then((response) => {
    // console.log(response.data);
    // const data = cheerio.load(response.data);
    // const title = data('title').text();
    // 아래 $는 jQuery의 $와 무관. cheerio 기능
    const $ = cheerio.load(response.data);
    // console.log('전체:', $.html())

    const title = $('title').text();
    console.log('사이트 제목:', title);

    // 원하는 헤드라인 태그 가져오기 (클래스는 웹브라우저 개발자 도구에서 요소 선택으로 가져옴)
    // 요소 선택 단축키: Ctrl + Shift + C
    // $('.section_article as_headline _TEMPLATE').each((index, element) => {
    const headlines = [];

    const headlines_div = $('div.section_article.as_headline._TEMPLATE');
    $(headlines_div).find('div.sa_text > a').each((_, element) => {
      const title = $(element).text().trim();
      headlines.push(title);
    });

    console.log('Headline Top 5 출력: ');
    console.log(headlines.slice(0, 5));

    /* 
        $('li.sa_item._SECTION_HEADLINE').each((_, element) => { // _ : 사용하지 않을 매개변수
        $(element).find('div.sa_text a').each((_, subElement) => {
          const title = $(subElement).text().trim();
          console.log(title);
        });
      });
    */

    // console.log(paragraphs);
    // paragraphs.each((index, element) => {
    //   console.log($(element));
    // });

  })
  .catch((error) => {
    console.error('요청 에러:', error.status);
  })
