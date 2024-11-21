const buttons = [ 'btn1', 'btn2', 'btn3', 'btn4', 'btn5', 'btn6', 'btn7', 'btn8' ]

buttons.forEach((btn) => {
    document.getElementById(btn).addEventListener('click', () => {
        console.log(btn);
        fetch(`/test/${btn}`)
        .then(response => {
            if (response.ok) {
                // console.log('response is ok');
                if (['btn1', 'btn3', 'btn5', 'btn7'].includes(btn)) {
                    return response.json(); // response.json()
                } else if (['btn2', 'btn4', 'btn6', 'btn8'].includes(btn)) {
                    return response.text(); // response.text()
                }
            } else {
                console.log('response is not ok!');
            }
        })
        .then(data => {
            console.log(typeof data, data);
/* 
            if (['btn1', 'btn3', 'btn5', 'btn7'].includes(btn)) {
                console.log(data);
            } else if (['btn2', 'btn4', 'btn6', 'btn8'].includes(btn)) {
                console.log(JSON.parse(data));
            }
             */
        })
        .catch(err => {
            console.error(err);
        })
    });
});

/*         
    // BE에서 객체를 res.json으로 응답 → FE에서 response.json()으로 받은 결과: 정상. 객체
    // BE에서 객체를 res.json으로 응답 → FE에서 response.text()로 받은 결과: 정상. 문자열
    // BE에서 객체를 res.send로 응답 → FE에서 response.json()으로 받은 결과: 정상. 객체
    // BE에서 객체를 res.send로 응답 → FE에서 response.text()로 받은 결과: 정상. 문자열
    // BE에서 문자열을 res.json으로 응답 → FE에서 response.json()으로 받은 결과: 정상. 문자열
    // BE에서 문자열을 res.json으로 응답 → FE에서 response.text()로 받은 결과: 정상. 문자열
    // BE에서 문자열을 res.send로 응답 → FE에서 response.json()으로 받은 결과: 정상. 문자열
    // BE에서 문자열을 res.send로 응답 → FE에서 response.text()로 받은 결과: 정상. 문자열
    // 응답 결과를 어떻게 받을지는 주로 FE 처리에 달린 듯
    // 객체를 JSON.stringify로 문자열 처리해서 보내면 결과가 또 달라지는데, 조합이 너무 많아서 복잡해서 반포기
    // 소 결론: res.send가 변환해주는 것을 믿지 말고, 객체나 배열이면 res.json()으로 응답하고 response.json()으로 받자
    // (그러면, 내가 BE, FE를 둘 다 작성하는 풀스택이라고 가정할 때, JSON.stringify나 parse를 쓸 일이 거의 없을 듯)

    // 추가 실험 curl -X GET -I localhost:3000/test/btn1 ~ btn8
 */

document.getElementById('btn9').addEventListener('click', () => {
    fetch(`/test/btn9?q=kim&sType=name`)
    .then(response => {
        if (response.ok) {
                return response.json();
        } else {
            console.log('response is not ok!');
        }
    })
    .then(data => {
        console.log(typeof data, data);
    })
    .catch(err => {
        console.error(err);
    })
});
