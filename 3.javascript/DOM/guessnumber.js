// 미션 1.
// 1. 랜덤 숫자 1~100까지를 생성
// 2. Guess 버튼을 통해서 입력한 숫자와 랜덤 숫자가 맞는지 비교한다.
//   2-1. 입력한 숫자가 더 크면? Too High 라고 알려주기
//   2-2. 입력한 숫자가 더 크면? Too Low 라고 알려주기
//   2-3. 같으면? Correct 출력
let randomNo = Math.floor(Math.random() * 100);
// console.log(randomNo);

guessBtn.addEventListener("click", () => {
    let dd = document.getElementById("guess").value;
    console.log(dd);
    let paragraph = document.createElement('li');               

    if (dd < randomNo) {
        document.getElementById("result").innerText = "Too Low";
        paragraph.innerHTML = "your guess&nbsp;<b>" + dd + "&nbsp;</b> is Too Low<br>";
    } else if (dd > randomNo) {
        document.getElementById("result").innerText = "Too High";
        paragraph.innerHTML = "your guess&nbsp;<b>" + dd + "&nbsp;</b> is Too High<br>";
    } else {
        document.getElementById("result").innerText = "Correct";
        paragraph.innerHTML = "your guess&nbsp;<b>" + dd + "&nbsp;</b> is Correct<br>";
        // appendChild 말고 그냥 append도 있는 것 같은데, 차이는 무엇일까?
    }

    // 3항 연산자. (조건문) ? true : false
    // (dd < randomNo) ? "Low" : 
    //     (dd > randomNo) ? "High" : "Correct";

    document.body.appendChild(paragraph);
    document.body.append();
});

//document.getElementById("guessBtn").addEventListener("click", 

// 미션 2.
// 3. 입력한 값들의 로그를 출력하기

// 미션 3.
// 4. 게임 플레이어 입장에서 최소화해서 푸는 기법
//    이런 알고리즘을 우리가 뭐라고 부르는가? 그 이름을 적기 (= 알고리즘):  Divide & Conquer