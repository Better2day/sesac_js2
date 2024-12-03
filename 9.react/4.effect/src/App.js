import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const App = () => {
    const [loading, setLoading] = useState(false); // 초기값 false
    const [clearing, setClearing] = useState(false); // 초기값 false
    const [count, setCount] = useState(1); // 초기값 1
    const [data, setData] = useState(null); // 초기값

    const loadData = async () => {
        setLoading(true);
        // this.state.loading = true; // ※ 이런 식으로 상태 변수를 직접 수정하면 안 된다!

        await new Promise((resolve) => setTimeout(resolve, 1000));

        // To-do. 맨 뒤에 1을 랜덤으로 생성하시오 (1~10까지의 랜덤으로...)
        const randomId = Math.floor(Math.random() * 10) + 1;
        try {
            const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${randomId}`);
            const result = await response.json();
            console.log(result);
            setData(result);
        } catch (error) {
            setData({ error: true }); // 에러 발생시
        } finally {
            setLoading(false);
        }
    }

    // useEffect(함수);
    useEffect(() => {
        loadData();

    }, [count]); // 2번째 인수가 지켜볼 변수. 이 변수가 변경될 때마다, 첫째 인수인 함수의 내용을 실행
    // 이 변수가 변경되었을 때 발생하는 side-effect를 해결하기 위한 함수를 정의하는 곳
    // []의 의미는 최초 한 번만 실행


    const clearHandler = async () => {
        setClearing(true);
        // console.log('Clear button clicked');
        // 1초 대기
        await new Promise((resolve) => setTimeout(resolve, 500));

        setData(null);
        setClearing(false);
    };

    return (
        <div class="container my-4">
            <button
                class="btn btn-primary"
                onClick={() => setCount(count + 1)}
                disabled={loading || clearing}>
                {loading ? (
                    <>
                        <span class="spinner-border spinner-border-sm me-2"></span>
                        Loading...
                    </>
                ) : (
                    "Load Data"
                )}
            </button >

            <button
                class="btn btn-danger ms-2"
                onClick={clearHandler}
                disabled={clearing || loading || !data}>
                {clearing ? (
                    <>
                        <span class="spinner-border spinner-border-sm me-2"></span>
                        Clearing...
                    </>
                ) : (
                    "Clear"
                )}
            </button>

            {/* <button onClick={() => { setData(null) }} style={{ color: "red" }}>Reset</button> */}
            {/* setData 함수에 인수로 null, undefined, NaN 등을 줬을 때 결과 동일 */}

            {/* 결과를 출력할 공간 */}
            <div class="mt-4">
                {data ? (
                    data.error ? (
                        <div class="alert alert-danger">
                            <p style={{ color: "red" }}>데이터 로딩에 실패했습니다.</p>
                        </div>
                    ) : (
                        <div class="alert alert-success">
                            <h3>{data.title}</h3>
                            <p>{data.body}</p>
                        </div>
                    )
                ) : (
                    <div class="alert alert-secondary">
                        <p>No data loaded.</p>
                    </div>
                )}
            </div >

            {/* 위와 같은 코드를 if 구문으로 작성하면 */}
            {/*             <div class="mt-4">
                {(() => {
                    if (!data) {
                        return <p>No data loaded.</p>
                    }
                    if (data.error) {
                        return <p style={{ color: "red" }}>데이터 로딩에 실패했습니다.</p>
                    }
                    return (
                        <div>
                            <h3>{data.title}</h3>
                            <p>{data.body}</p>
                        </div>
                    );
                })()}
            </div> */}
        </div >
    );
};

export default App;
