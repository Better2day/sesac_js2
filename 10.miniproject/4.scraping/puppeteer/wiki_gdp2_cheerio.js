// npm i puppeteer
const puppeteer = require('puppeteer');
const cheerio = require('cheerio');

(async () => {
  const browser = await puppeteer.launch({ headless: true }); // headless: true면 브라우저 안 뜨고 실행

  const page = await browser.newPage();

  await page.goto('https://en.wikipedia.org/wiki/List_of_countries_by_GDP_(nominal)');

  const title = await page.title();
  console.log('페이지 제목:', title);

  // 방법 1. cheerio에 넣고 파싱
  const content = await page.content();
  const $ = cheerio.load(content);
  // console.log($.html());

  const countryData = [];
  const tableRows = $('table.wikitable').find('tr');
  tableRows.each((index, element) => {
    const columns = $(element).find('td');
    const country = $(columns[0]).text().trim();
    const gdp = $(columns[1]).text().trim();

    // console.log(`${index + 1}: 국가: ${country}, GDP: ${gdp}`);
    if (country && gdp) {
      countryData.push({ country, gdp });
    }
  });

  // console.log(countryData); // 전체 데이터 다 출력해주지 않음. 다 보고 싶으면 아래처럼 처리
  // countryData.forEach((item, index) => {
  //   console.log(`${index + 1}: 국가: ${item.country}, GDP: ${item.gdp}`);
  // })

  // TODO: GDP가 10000~20000 사이인 국가만 출력하기
  /* 
    countryData.forEach((item, index) => {
      const gdpValue = parseInt(item.gdp.replace(/,/g, ''));
      
      if (gdpValue >= 10000 && gdpValue <= 20000) {
        console.log(`${index + 1}: 국가: ${item.country}, GDP: ${item.gdp}`);
      }
    })
     */
  const filteredCountryData = countryData.filter((item) => {
    const gdpValue = parseInt(item.gdp.replace(/,/g, ''));
    return gdpValue >= 10000 && gdpValue <= 20000;
  });
  console.log(filteredCountryData);

  // 방법 2. puppeteer의 문법의 파싱

  // 5초 대기
  // await new Promise(resolve => setTimeout(resolve, 5000));
  await browser.close();
})();
