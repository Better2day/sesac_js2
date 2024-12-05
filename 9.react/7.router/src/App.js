import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home';
import About from './About';
import Contact from './Contact'
import Navigation from './Navigation';
import Users from './Users';
import UserDetail from './UserDetail';

const App = () => {
    return (
        <Router>
            <div>
                <h1>나의 웹사이트</h1>
                <Navigation />
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/about' element={<About />} />
                    <Route path='/users' element={<Users />} />
                    <Route path='/users/:userId' element={<UserDetail />} />
                    <Route path='/contact' element={<Contact />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;