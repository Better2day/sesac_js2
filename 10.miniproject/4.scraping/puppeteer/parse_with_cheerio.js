// npm i puppeteer
puppeteer = require('puppeteer');
const cheerio = require('cheerio');

// 비동기 익명함수 정의하고 바로 실행
(async () => {
  const browser = await puppeteer.launch({ headless: false });

  const page = await browser.newPage();

  // await page.goto('https://www.google.com/');
  // const title = await page.title();
  // console.log('페이지 제목:', title);

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

  await page.setContent(html);

  const pageContent = await page.content();

  // const paragraphs = await page.evaluate(() => {
  const $ = cheerio.load(pageContent);
  // const elements = Array.from(document.querySelectorAll('p'));
  // return elements.map(el => el.textContent);
  // elements.forEach((text, index) => {
  //   console.log('요소:', text);
  // });

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


  paragraphs.forEach((text, index) => {
    console.log(`첫 번째 예제: ${text}`);
  })

  const firstParagraph = await page.evaluate(() => document.querySelector('p').textContent);
  const secondeParagraph = await page.evaluate(() => document.querySelectorAll('p')[1].textContent);
  console.log(firstParagraph);
  console.log(secondeParagraph);

  // 5초 대기
  // await new Promise(resolve => setTimeout(resolve, 5000));
  // await browser.close();
})();