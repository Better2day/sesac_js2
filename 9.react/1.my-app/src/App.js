import React from 'react';
import './App.css';
import Header from './Header'; // 한 개만 불러오기
import Footer from './Footer';
import Counter from './Counter';


// const App = () => {
function App() {
    const pageTitle = 'Welcome to My Website 2!';

    return (
        <div className="App">
            <Header title={pageTitle} />
            <main className="App-header">
                <h1>Hello, World!</h1>
                <p>안녕하세요, 리액트 학습자 여러분</p>
                <Counter />
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
