import { useEffect } from 'react';

const Message = ({ count, message }) => {

    useEffect(() => {
        // 메시지가 변경될 때, 사이드이펙트는?
        document.title = message || '기본 타이틀';
    }, [message]);

    useEffect(() => {
        // 여기는 최초 1회 (페이지가 렌더링될 때) 호출되는 것
        console.log('Component loading...');
        return () => {
            console.log('Component 초기화')
        };
    }, []); //내용이 없으면 최초 1회 호출

    useEffect(() => {
        // 카운트가 짝수냐 홀수냐에 따라서
        document.body.style.backgroundColor = count % 2 === 0 ? 'lightblue' : 'lightcoral';

        // 변수값이 변경되기 전
        return () => {
            // 배경색 초기화
            document.body.style.backgroundColor = '';
        }
    }, [count]);

    return (
        <div>
            <h3>메시지: {message} </h3>
            {count > 10 && <p>많이 클릭하셨네요.</p>}
            {count < 0 && <p>음수입니다. 잘못 클릭하셨을까요?</p>}
        </div>
    )
}

export default Message;
