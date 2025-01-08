// npm i puppeteer
const puppeteer = require('puppeteer');

// 비동기 익명함수 정의하고 바로 실행
(async () => {
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: {
      width: 1920,
      height: 1080
    }
  });

  // 새 탭 생성
  const page = await browser.newPage();

  // Google로 이동
  await page.goto('https://www.google.com');

  // 검색 시키기
  await page.type('textarea[name="q"]', 'javascript programming');
  await page.keyboard.press('Enter');

  // DOM에서 검색 결과 찾기
  await page.waitForSelector('div#search'); // div#res


  // 이 결과 안에서 원하는 요소 추출하기
  const results = await page.evaluate(() => {
    const items = [];

    const resDiv = document.querySelector('div#search'); // div#res
    const elements = resDiv.querySelectorAll('h3');

    elements.forEach((element, index) => {
      const linkElement = element.closest('a');
      items.push({
        title: element.innerText,
        url: linkElement ? linkElement.href : '링크 없음',
      })
    });

    return items;
  })

  console.log('검색 결과:');
  console.log(results);

  await page.screenshot({ path: 'screenshot.png' });
  await browser.close();



  // await new Promise(resolve => setTimeout(resolve, 3000));
  // await browser.close();

})();
