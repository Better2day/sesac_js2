// npm i puppeteer
const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ headless: false });

  const page = await browser.newPage();

  await page.goto('https://en.wikipedia.org/wiki/List_of_countries_by_GDP_(nominal)');

  const title = await page.title();
  console.log('페이지 제목:', title);

  // 방법 1. cheerio에 넣고 파싱



  // 방법 2. puppeteer의 문법의 파싱
  const countryData = await page.evaluate(() => {
    const rows = document.querySelectorAll('table.wikitable tr');
    const result = [];
    // 옛날 Coding Style
    rows.forEach(row => {
      const columns = row.querySelectorAll('td');
      // 첫/두 번째 열에서 데이터 가져오기
      if (columns.length > 2) {
        const country = columns[0].innerText.trim();
        const gdp = columns[1].innerText.trim();
        result.push({ country, gdp });
      }
    });

    return result;
  });

  // console.log(countryData);
  console.log('-----------');

  // Modern JS Style - Array, map, filter (고차 함수) 이용)
  const countryData2 = await page.evaluate(() => {
    const rows = document.querySelectorAll('table.wikitable tr');
    return Array.from(rows).map(row => {
      const columns = row.querySelectorAll('td');
      return {
        country: columns[0]?.innerText.trim() || 'N/A',
        gdp: columns[1]?.innerText.trim() || 'N/A', // HTML에는 공백이 많으므로 trim() 적용
      };
    }).filter(item => item.country !== 'N/A');
  });
  // console.log(countryData2);

  // 국가명을 기준으로 정렬 (현재는 기본값인 GDP 순)
  countryData.sort((a, b) => a.country.localeCompare(b.country));
  console.log(countryData);


  // 5초 대기
  // await new Promise(resolve => setTimeout(resolve, 5000));
  await browser.close();
})();