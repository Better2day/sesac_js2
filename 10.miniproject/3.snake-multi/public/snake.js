const boardCtx = document.getElementById('snakeBoard').getContext('2d');
// const scoreCtx = document.getElementById('scoreSection').getContext('2d');

console.log(`window.location.host = ${window.location.host}`);
// const socket = new WebSocket(`ws://${window.location.host}/game`);
const socket = new WebSocket(`ws://${window.location.host}`);

socket.onopen = () => {
  console.log('서버 접속 완료');
};

socket.onmessage = (event) => {
  const data = JSON.parse(event.data);
  console.log(`서버 메시지: ${data}`);
  const direction = data;
  console.log(`서버 메시지 처리: ${direction}`);

  switch (direction) {
    case 'ArrowUp':
      snake[0].y = snake[0].y - 1;
      break;
    case 'ArrowDown':
      snake[0].y = snake[0].y + 1;
      break;
    case 'ArrowLeft':
      snake[0].x = snake[0].x - 1;
      break;
    case 'ArrowRight':
      snake[0].x = snake[0].x + 1;
      break;
  };
};

socket.onclose = () => {
  console.log('접속 종료');
};

socket.onerror = (error) => {
  console.error('접속 오류: ', error);
};

const snake = [
  { x: 0, y: 0 }, // 초기 뱀의 위치
  // 뱀이 길어질 때 이 배열에 몸통 추가
];

const CANVAS_SIZE = 400;
const BLOCK_SIZE = 20; // canvas 폭과 높이가 400 이므로, 뱀 몸통 한 칸이 20이면 20칸 움직일 수 있음
const BOARD_SIZE = CANVAS_SIZE / BLOCK_SIZE;
const SNAKE_SPEED = 200; // 200ms → 1초에 5번 이동
let DIRECTION = 'RIGHT'; // 뱀 초기 이동 방향
let isGameOn = true;
let score = 0;

function playGame() {
  if (isGameOn) {
    boardCtx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);

    drawSnake(); // 뱀 그리기

    moveSnake(); // 이동 제어
  }
}

function drawSnake() {
  boardCtx.fillStyle = 'blue'
  boardCtx.fillRect(snake[0].x * BLOCK_SIZE, snake[0].y * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);

}

function moveSnake() {

}

function checkGameover() {
  // To-do: 화면을 벗어나면 게임 오버 글자 출력 (boardCtx 이용)


  if ((snake[0].y < 0 && DIRECTION === 'UP') ||
    (snake[0].y >= BOARD_SIZE && DIRECTION === 'DOWN') ||
    (snake[0].x < 0 && DIRECTION === 'LEFT') ||
    (snake[0].x >= BOARD_SIZE && DIRECTION === 'RIGHT')) {
    gameover();
  }
}

document.addEventListener('keydown', (e) => {
  switch (e.key) {
    case 'ArrowUp':
      DIRECTION = (DIRECTION !== 'DOWN') ? 'UP' : 'DOWN';
      break;
    case 'ArrowDown':
      DIRECTION = (DIRECTION !== 'UP') ? 'DOWN' : 'UP';
      break;
    case 'ArrowLeft':
      DIRECTION = (DIRECTION !== 'RIGHT') ? 'LEFT' : 'RIGHT';
      break;
    case 'ArrowRight':
      DIRECTION = (DIRECTION !== 'LEFT') ? 'RIGHT' : 'LEFT';
      break;
  }
  // 서버로 키 입력 내용 보내기
  socket.send(JSON.stringify({ type: 'keypress', key: e.key }));
});

// 게임 시작 - 반복 호출.  내가 원하는 주기마다 draw 함수 호출
setInterval(playGame, SNAKE_SPEED);
playGame();
