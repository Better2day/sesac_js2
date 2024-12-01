const boardCtx = document.getElementById('snakeBoard').getContext('2d');
const scoreCtx = document.getElementById('scoreSection').getContext('2d');

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

let food = generateFood(); // 시작할 때 무작위 위치에 음식 생성
// To-do: 배열에 음식 여러 개 생성하기
console.log(food);

function playGame() {
    if (isGameOn) {
        boardCtx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);


        drawFood();  // 사과 그리기

        drawSnake(); // 뱀 그리기

        checkEat(); // 사과 먹었는지 확인

        moveSnake(); // 이동 제어

        checkGameover(); // 뱀 죽었는지 확인
    }
}

function drawFood() {
    boardCtx.fillStyle = 'red';
    boardCtx.fillRect(food.x * BLOCK_SIZE, food.y * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);

}

function drawSnake() {
    boardCtx.fillStyle = 'blue'
    boardCtx.fillRect(snake[0].x * BLOCK_SIZE, snake[0].y * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);

}

function checkEat() {
    // if snake가 food와 같은 위치냐?
    if (snake[0].x === food.x && snake[0].y === food.y) {
        score += 10;
        console.log(score);
        food = generateFood();
        displayScore();
    }

    // To-do: Score 처리 - 먹으면 점수 올리기
    // To-do: 먹으면 뱀 길이 늘리기
    // To-do: 음식이 뱀 몸에 생겼으면 어떻게?
}

function generateFood() {
    const x = Math.floor(Math.random() * BOARD_SIZE);
    const y = Math.floor(Math.random() * BOARD_SIZE);

    return { x, y };
}

function displayScore() {
    console.log('displayScore 함수 진입');
    scoreCtx.clearRect(0, 0, 120, 30);
    scoreCtx.font = '16px Verdana'
    scoreCtx.fillStyle = 'blue';
    scoreCtx.fillText('score: ' + score, 10, 20);

    // scoreCtx.font = 'bold 30px Verdana';
    // scoreCtx.fillStyle = 'green';
    // scoreCtx.fillText('Hello, Canvas 3!', 50, 40);
}

function moveSnake() {
    switch (DIRECTION) {
        case 'UP':
            snake[0].y = snake[0].y - 1;
            break;
        case 'DOWN':
            snake[0].y = snake[0].y + 1;
            break;
        case 'LEFT':
            snake[0].x = snake[0].x - 1;
            break;
        case 'RIGHT':
            snake[0].x = snake[0].x + 1;
            break;
    };
    /*
        // 화면을 벗어나면 반대쪽 화면에서 튀어나오게 하기. 왼쪽 끝 <-> 오른쪽 끝, 위 <-> 아래 끝
        if (snake[0].x === BOARD_SIZE) {
            snake[0].x = 0;
        } else if (snake[0].x < 0) { // && DIRECTION === 'LEFT') {
            snake[0].x = BOARD_SIZE - 1;
        } else if (snake[0].y === BOARD_SIZE) {
            snake[0].y = 0;
        } else if (snake[0].y < 0) { // && DIRECTION === 'UP') {
            snake[0].y = BOARD_SIZE - 1 //BOARD_SIZE - 1;
        }
         */
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

function gameover() {
    isGameOn = false;

    boardCtx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);

    boardCtx.font = '50px Verdana bold';
    boardCtx.fillStyle = 'red';
    boardCtx.fillText('Game Over !!', 50, 190);
};

document.addEventListener('keydown', (e) => {
    // console.log(e.key);

    // Refactoring (이동 방향 제한 룰이 생겨서 사용 불가능해짐)

    /*     const directionPerKey = {
            'ArrowUp': 'UP',
            'ArrowDown': 'DOWN',
            'ArrowLeft': 'LEFT',
            'ArrowRight': 'RIGHT',
        };
        DIRECTION = directionPerKey[e.key];
     */
    changeDirection(e.key);
});

function changeDirection(keyInput) {

    switch (keyInput) {
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

}

// 게임 시작 - 반복 호출.  내가 원하는 주기마다 draw 함수 호출
setInterval(playGame, SNAKE_SPEED);
playGame();
