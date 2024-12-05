import { useState, useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';
import Counter from './Counter';
import Input from './Input';
import Message from './Message';

const App = () => {
    const pageTitle = 'Welcome to My WebSite'; // Props
    const [count, setCount] = useState(0); // 변하는 변수값을 DOM에 그려줄 변수
    const [message, setMessage] = useState(''); // 입력받을 메시지를 저장할 변수
    const [showComponent, setShowComponent] = useState(true);

    const MyComponent = () => { // React Component LifeCycle을 통해서 mounting, updating, unmounting 
        useEffect(() => {
            console.log('컴포넌트 등장(mounting)');
            return () => {
                console.log('컴포넌트 삭제(?) (unmounting)');
            }
        }, []);

        return <div>내 새로운 컴포넌트</div>
    };

    return (
        <div>
            <Header title={pageTitle} /> {/*Props */}
            <h1>Hello World!</h1>
            <main>
                <p>여기가 메인 내용이 쓰이는 곳</p>
                <Counter count={count} setCount={setCount} />
                <Input setMessage={setMessage} />
                <Message count={count} message={message} />
                <button onClick={() => setShowComponent(!showComponent)}>MyComponent Toggle</button>
            </main>
            <Footer />
        </div >
    );
}

export default App;
