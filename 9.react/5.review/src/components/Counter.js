import { useEffect } from 'react';

const Counter = ({ count, setCount }) => {

    const decHandler = () => setCount(count - 1);
    const incHandler = () => setCount(count + 3);

    useEffect(() => { // 특정 변수값이 바꼈을 때 하고 싶은 작업 정의
        // 변경 이벤트가 일어난 이후에 실행할 작업
        console.log(`카운트 변수 변경됨: ${count}`);

        // Cleanup 함수. 이 변화가 발생했을 때 선행해서 실행할 작업
        return () => {
            console.log('나는 클린업 함수: ', count);
        };
    }, [count]);

    return (
        <div>
            <h2>Counter</h2>
            <p>변수값: {count}</p>
            <button onClick={decHandler}>-1 감소</button>
            <button onClick={incHandler}>+3 증가</button>
        </div>
    );
}

export default Counter;
