const puppeteer = require('puppeteer');
const cheerio = require('cheerio');

(async () => {
  const url = 'https://www.naver.com';
  // const url = 'https://en.wikipedia.org/wiki/List_of_countries_by_GDP_(nominal)';
  const resolutions = [
    { name: 'default', width: 800, height: 600 },
    { name: 'pc', width: 1920, height: 1080 },
    { name: 'mobile', width: 375, height: 667 },
  ];

  const browser = await puppeteer.launch({ headless: true }) // headless: true면 브라우저 안 뜨고 실행
  const page = await browser.newPage();

  for (const resolution of resolutions) {
    await page.setViewport({
      width: resolution.width,
      height: resolution.height,
    });

    await page.goto(url, { waitUntil: 'networkidle2' });
    // 추가 대기 3초. 동적 컨텐츠가 충분히 로딩될 떄까지
    await page.wait

    const jpgPath = `output_${resolution.name}.jpg`;
    await page.screenshot({
      path: jpgPath,
      type: 'jpeg',
      quality: 80,
      // fullPage: true,
    });
    console.log(`JPG 파일 저장 완료: ${jpgPath}`);
  };

  await browser.close();
})();