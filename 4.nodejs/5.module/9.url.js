const url = require("url");

const myURL = new URL(
  "https://nodejs.org/docs/latest/api/url.html?test1=1&&test2=a"
);
// console.log(myURL instanceof URL);

// URL 파싱

// console.log(`protocol: ${myURL.protocol}`);

// 1. 호스트명 출력하기 (hostname)
console.log(`hostname: ${myURL.hostname}`);

// 2. 경로 출력하기
console.log(`path: ${myURL.pathname}`);

// 3. 쿼리 파라미터 출력하기
console.log(`search: ${myURL.search}`);
console.log(myURL.searchParams);
console.log(
  url.parse("https://nodejs.org/docs/latest/api/url.html?test1=1&&test2=a")
);
console.log(`searchParams: ${myURL.searchParams}`);

const myURL2 = {
  protocol: "https",
  hostname: "sesac.com",
  pathname: "myservice/mypath/dir1",
  query: {
    product: "hello",
  },
};

const assembledURL = url.format(myURL2);
console.log("내 주소는: ", assembledURL);
