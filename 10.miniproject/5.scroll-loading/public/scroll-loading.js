const container = document.getElementById('scroll-container');
const itemsPerLoad = 20;
const maxItemsOnScreen = itemsPerLoad * 5;
let start = 0;
let end = start + itemsPerLoad;
let loading;

// TODO 1. 아래 scroll에서 하드코딩된 20, 40을 변수로 대체
// TODO 2. 중복되는 두 개의 fetch를 하나의 함수로 만들기
function loadItems() {
  loading = true;

  fetch(`/api/data?start=${start}&end=${end}`)
    .then((response) => response.json())
    .then((items) => {
      items.forEach((item) => {
        const itemElement = document.createElement('div');
        itemElement.classList.add('item');
        itemElement.textContent = item;
        container.appendChild(itemElement);
      });

      // 오래된 데이터 삭제 (maxItemsOnScreen 사용)
      let itemsToRemove = container.children.length - maxItemsOnScreen;
      if (itemsToRemove > 0) {
        console.log('지워야 할 갯수는', itemsToRemove);
        // for (let i = 0; i < itemsToRemove; i++) {
        while (itemsToRemove-- > 0) {
          container.removeChild(container.firstElementChild);
        }
      }

      // 다음 데이터를 불러오기 위해 시작 위치를 변경
      start += items.length;
      end = start + itemsPerLoad;
    })

  // 로딩 후 1초 안에는 다시 못 불러오도록, 잠시 기다리게 설정
  // setTimeout(() => {
  //   loading = false;
  // }, 1000);
}


function loadPrevItems() {
  const firstItem = container.firstElementChild;
  console.log(firstItem);

  const pend = firstItem ? parseInt(firstItem.textContent.replace('Item ', '')) - 1 : 0; // 현재 있는 데이터
  const pstart = pend > itemsPerLoad ? (pend - itemsPerLoad) : 0;

  console.log(`이전 데이터 로딩... ${pstart}~${pend}`);

  fetch(`/api/data?start=${pstart}&end=${pend}`)
    .then((response) => response.json())
    .then((items) => {
      items.forEach((item) => {
        const itemElement = document.createElement('div');
        itemElement.classList.add('item');
        itemElement.textContent = item;
        container.insertBefore(itemElement, firstItem); // 맨 앞에 삽입하기
      });

      // 좌표를 계산해서 그만큼 스크롤바를 이동
      const firstItemHeight = firstItem.clientHeight;
      const beforeLoadingPos = firstItemHeight * items.length;
      window.scrollTo(0, beforeLoadingPos);

      // 화면에 초과된 갯수를 뒤에서 삭제
      // 오래된 데이터 삭제
      let itemsToRemove = container.children.length - maxItemsOnScreen;
      if (itemsToRemove > 0) {
        console.log('지워야 할 갯수는', itemsToRemove);
        while (itemsToRemove-- > 0) {
          container.removeChild(container.lastElementChild);
        }
      }

      // 다음 데이터를 불러오기 위해 시작 위치를 변경
      // start += items.length;
      // end = start + itemsPerLoad;

    })
  // let = container.firstElementChild;
  // console.log(Array.slice(container.firstElementChild.textContent, 3));
};

function deleteItems() {
  for (i = 0; i < itemsPerLoad; i++) {
    container.removeChild(document.querySelector('#scroll-container > div'));
  };
};

loadItems(); // 초기 loading

window.addEventListener('scroll', () => {
  console.log(`window.scrollY = ${window.scrollY}`);
  // console.log(`container.firstElementChild = ${Array.prototype.slice(container.firstElementChild?.textContent, 5)}`);
  // console.log(`스크롤 위치는 ${window.innerHeight}, ${window.scrollY}, ${document.body.offsetHeight}`);
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
    // start += itemPerLoad;
    // end = start + itemPerLoad;
    console.log('화면 끝');

    // const divs = document.querySelectorAll('#scroll-container > div');
    // console.log(`divs.length = ${divs.length}`);

    // if (end > limit) {
    // if (divs.length > maxItemsOnScreen) {
    //   deleteItems();
    // }
    loadItems();
  } else if (window.scrollY <= 0) {
    loadPrevItems();
    // start += end - itemsPerLoad;
    // end = start + itemsPerLoad;


  };

  // TODO 3. 서버의 데이터를 200개가 아닌 2000 ~ 20000으로 늘려보기 (스크롤이 계속 되면 느려질텐데 해결법도..)
  // 데이터 개수가 너무 많아지면 윗부분 자식 삭제
  // 이번에 로드하는 개수(이 소스에서는 20개로 고정)만큼, 반복해서 scroll-container 바로 아래 자식 div부터 삭제


});
