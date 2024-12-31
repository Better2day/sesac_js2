2024.12.25  
F(x).com 맞춤형 환율 조회 프로젝트 Convention Guide  
(Javascript 쪽에서 제일 유명한 Airbnb Javascript Style Guide 기반)  
  
  
### Coding Style  
  
1. 변수 선언  
   ※ var 대신 let과 const를 사용합니다.  
  
   const: 값이 변경되지 않을 변수  
   let: 값이 변경될 수 있는 변수  
  
   ※ let 사용 최소화: **되도록이면 const를 사용하여 불변성 유지**  
  
2. 화살표 함수 사용  
   화살표 함수(() => {})는 간결하고 this 바인딩 문제를 피할 수 있기 때문에 추천  
   일반 함수 선언 대신 화살표 함수를 사용합니다.  
  
```  
   // bad  
   if (currentUser) {  
     function test() {  
       console.log('Nope.');  
     }  
   }
  
   // good  
   let test;  
   if (currentUser) {  
     test = () => {  
       console.log('Yup.');  
     };  
   }  
```  
  
3. Template Literals (back tick(`)) 사용  
   (문자열이 여러 줄로 이뤄졌거나, 변수를 포함할 때. 한 줄 짜리 단순 문자열은 외따옴표)  
  
   문자열을 **+**로 연결하기보다는 템플릿 리터럴(`)을 사용합니다.  
   가독성을 높이고, 코드가 간결해집니다.  

```
   const apiUrl = `https://api.exchangerate-api.com/v4/latest/${selectedCurrency}`;  
   string = 'F(X)'  
```  

4. 객체 리터럴 사용 권장
   클래스는 큰 규모의 애플리케이션에서 주로 사용하고, 간단하게 사용할 때는 객체 리터럴을 주로 사용합니다.
   (객체 리터럴로 데이터 구조를 정의하는 것이 간편합니다.)  
   객체 리터럴 축약 구문을 사용하여, 코드의 길이를 줄이고 가독성을 높입니다.  
```
   const a = [];
   const b = {};
```
  
5. 에러 처리  
   **try/catch**로 에러 처리를 제대로 해주는 것이 좋습니다.  
   (에러가 제대로 처리되지 않으면, 서버가 다운되서 서비스가 중단될 가능성 증가)  
  
6. 비동기 처리  
   **async/await**를 사용하여 비동기 처리를 간결하게 작성합니다.
  
7. 주석 처리  
   ※ 기본 원칙은 함수, 클래스, 주요 로직 등에는 간단한 설명을 추가합니다.  
   단, 꼭 필요한 부분에만 달고, **"왜 이 코드를 썼는지"**를 설명합니다.  
   불필요한 주석은 피하고, 코드 자체로 의도를 명확히 전달합니다.  
  
   처리 방식  
   * 한 줄 : // (VS Code에서 Ctrl + / 단축키)  
   * 범위 (여러 줄): <* *>, <!-- --> 등 (VS Code 에서 범위를 드래그 후 Shift + Alt + A 단축키)  
   (HTML과 같은 환경에서는 복수줄 형식만을 따른다)  
  
   ```
   // 기준 통화를 대상 통화로 환산
   function convert(from, to, amount) {
     ~ logic ~
   }

   # TO-DO: 나중에 추가할 기능은 TO-DO로 표기
   ```
  
8. 불필요한 코드 줄이기  
   코드에서 불필요한 변수 및 중복된 로직 등을 제거하여, 가독성을 높이고 유지보수성을 강화합니다.  
  
9. 프론트엔드에서의 컴포넌트화  
   React 컴포넌트는 가능한 한 작고 재사용 가능하게 작성합니다. 한 파일에 너무 많은 로직을 넣지 않도록 합니다.  
   컴포넌트 간 책임 분리를 명확히 하고, 기능별로 폴더 구조를 나누어 관리합니다.  
  
10. 모듈 불러오기  
   import를 사용하여 모듈을 불러오고, 상시로 구조 분해 할당(디스트럭쳐링)이 적용될 수 있도록 1개의 모듈이라도 {}로 처리합니다.  
  
```
   // bad  
   const AirbnbStyleGuide = require('./AirbnbStyleGuide');  
   module.exports = AirbnbStyleGuide.es6;  
  
   // ok  
   import AirbnbStyleGuide from './AirbnbStyleGuide';  
   export default AirbnbStyleGuide.es6;  
  
   // best  
   import { es6 } from './AirbnbStyleGuide';  
   export default es6;  
```
  
11. 명명 규칙  
   폴더, 파일 네이밍  
   파일은 소문자와 언더바(_)로 구성  
   ex) exchange_calculator.js
  
|종류|규칙|예시|
|---|:---|:---|
|**변수**|camel**C**ase 사용| exchangeRate, userProfile|
|**함수**|동사 + 명사로 구성된 camel**C**ase|getExchangeRate, setUserCurrency|
|Class|**P**ascal**C**ase|ExchangeRateConverter|
|**상수**|대문자 + 언더스코어(_)|DEFAULT_INTERVAL|

12. 들여쓰기 규칙  
   들여쓰기: 탭 (2칸 공백으로 설정)  
   VS Code 확장인 Prettier로 설정  
    
13. ESLint와 Prettier 설정  
   ESLint를 사용하여 코드 품질을 유지하고, Prettier를 사용하여 포맷팅을 자동화합니다.  
   기본 규칙만 적용하되, 스타일 규칙에 대한 충돌을 방지하기 위해 **eslint-config-prettier**와 **eslint-plugin-prettier**를 함께 사용합니다.  

  
***  
  
### 커밋 규칙  
  
   커밋 메시지 형식:  
   ```  
   [타입] 설명 (최대 50자)

   상세 설명 (생략 가능)  
   ```  
  
   타입  
   Feature: 기능 추가  
   Fix: 버그 수정  
   Test: 테스트 코드 추가/수정
   Style: 스타일 변경 (기능 변화 없음)  
   Refactor: 코드 리팩토링  
   Docs: 문서 변경
  
   git commit 예시  
   ```  
   [Feature] 게시판 게시글 목록 조회 기능 추가

   커뮤니티 게시판에서 글 목록을 조회하는 기능 구현    
   ```  
  
  
### Git flow  
   git flow init // 처음에 한 번만 하면 됨  
   git checkout develop  
   git pull // develop을 최신 버전으로 만듦. "Alreadt up to Date" 확인하기!  
   git flow feature start 피쳐이름  
   git rebase develop // 내 피쳐에 develop 브랜치의 소스코드를 전부 옮겨옴  
  
   작업 후  
   git add .  
   git commit -m '메세지'  
   git rebase develop // 혹시 모르니까 다시 rebase하기  
   git push // develop 브랜치에 잘 올라갔는지 확인!  
   git flow feature finish // 피쳐 없애기  
  
***  
  
### 코드 리뷰 가이드
  
- **리뷰 기준**:  
   - 코드가 이해하기 쉬운지 확인  
   - 중복 코드나 불필요한 복잡성이 없는지 검토  
   - 성능이나 보안 문제 여부 확인  
- **리뷰 방법**:  
    - 코드 리뷰어는 명확하고 건설적인 피드백을 제공  
    - 리뷰 피드백 수용 후 다시 코드 제출  
    - 코드 리뷰 도구(GitHub PR, Bitbucket 등) 사용 권장  
  
***  
  
### 폴더구조  
   back/front 나누기???  
  
   /assets: 사용할 아이콘이나 이미지 파일  
   /components: 사용할 컴포넌트(회원가입 창, 차트 등등)  
   /hooks: 상태 관리를 위해 만들어 놓은 hook 저장  
   /pages: main부터 웹페이지  
   /styles: css 파일같은 디자인 관련 코드(bootstrap이나 tailwind로 할듯함)  
   /utils: 정규표현식 패턴이나 공통함수 등 공통으로 사용하는 유틸 파일들이 위치하는 폴더  
   (DB로부터 데이터 불러오는 함수나 인증을 위한 함수가 주로 들어갈 예정)  
