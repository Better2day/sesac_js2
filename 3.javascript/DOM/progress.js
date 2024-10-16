document.addEventListener("DOMContentLoaded", function(){
    const startButton = document.getElementById("startButton");
    const resetButton = document.getElementById("resetButton");
    const progressBar = document.getElementById("progress");
    const timeInput   = document.getElementById("timeInput");
    const progressText = document.getElementById("progressText");

    // console.log(startButton);
    // console.log(resetButton);
    // console.log(progrssBar);

    let interval; // 타이머 인터벌을 저장할 변수
    let duration; // 현재 진행 시점을 저장할 변수

    function startProgress() {
        console.log("시작");

        let timePassed = 0;
        duration = parseInt(timeInput.value);
        progressBar.style.width = "0%"; // 초기에 0으로 시작하고, 매초마다 증가시킴

        interval = setInterval(function() {
            timePassed++;
            
            let progress = (timePassed / duration) * 100; // 진행률 계산
            console.log("timePassed: " + timePassed + ", duration: " + duration + ", progess: " + progress);

            progressBar.style.width = `${progress}%`; // 진행율 바 업데이트
            progressText.textContent = Math.floor(progress) + "%";

            if (timePassed >= duration) { // 지정된 시간이 초과
                clearInterval(interval); // 동작시켜둔 타이머를 중지
            }
        }, 1000) // 매 1초(1000ms) 마다 함수를 실행한다.
    }
    function resetProgress() {
        console.log("리셋");
        progressBar.style.width = "0%"; // 그래프 초기화
        timeInput.value = ""; // 입력 필드 초기화
    }

    startButton.addEventListener("click", startProgress); // 시작 버튼 클릭시 함수 호출하기
    resetButton.addEventListener("click", resetProgress);
});