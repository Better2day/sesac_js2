import React, { useState } from 'react';
import './App.css';
import Header from './Header'; // 한 개만 불러오기
import Footer from './Footer';
import Counter from './Counter';
import Message from './Message';
import Input from './Input';
// import { useState } from 'react';

// const App = () => {
function App() {
    const pageTitle = 'Welcome to My Website 3!';

    const [count, setCount] = useState(5); // State 선언. 상태 관리 변수. 초기값 = 5
    const [message, setMessage] = useState(''); // 입력 메시지 컬럼의 초기값

    return (
        <div className="App">
            <Header title={pageTitle} />
            <main className="App-header">
                <h1>Hello, World!</h1>
                <p>안녕하세요, 리액트 학습자 여러분 333</p>
                <Counter count={count} setCount={setCount} /> {/* 변수와 함수를 인수로 넣어 줌 */}
                <Message count={count} message={message} />
                <Input setMessage={setMessage} />
            </main>
            <Footer />
        </div>
    );
}

/* 
function App() {
    return (
        <h1>Hello, World!</h1>
    );
}
 */
export default App;
