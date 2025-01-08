const cheerio = require('cheerio');

// scraping 학습이라서 axios로 실제 데이터 받아오는 것 생략하고 아래처럼 mock data 생성
const html = `
  <html>
    <head>
      <title>파싱 예제</title>
    </head>
    <body>
      <div>
        <p>첫 번째 문단</p>
        <p>두 번째 문단</p>
      </div>
      <a href="http://www.naver.com">네이버 링크</a>
      <p>또 하나의 문단</p>
      <div class="box">박스 내용</div>
    </body>
  </html>
`;

const $ = cheerio.load(html);
// console.log($.html());
const paragraphs = $('p');
paragraphs.each((index, element) => {
  // console.log(`Paragraph: ${$(element).text()}`);
  console.log(`Paragraph: ${$(element).text()}`);
});

console.log('---');
const firstp = $('p').eq(0).text();
const secondp = $('p').eq(1).text();
console.log(`첫 번째 p 태그: ${firstp}`);
console.log(`첫 번째 p 태그: ${secondp}`);

console.log('---');
const firstp2 = $('p').first().text();
const lastp = $('p').last().text();
console.log(`첫 번째 p 태그: ${firstp2}`);
console.log(`첫 번째 p 태그: ${lastp}`);

console.log('---');
const myps = $('body > div > p');
console.log(`첫 번째 p 태그: ${myps.first().text()}`);
console.log(`마지막 p 태그: ${myps.last().text()}`);

const link = $('a');
const linkurl = $('a').attr('href');
// console.log('Hyeperlink:', linkurl);
// console.log('Hyeperlink text:', link.text());

// DOM의 수정도 가능함
$('p').text('새로운 텍스트');
// console.log($.html());

$('div').addClass('highlight');
$('div').removeClass('box');
// console.log($.html());
