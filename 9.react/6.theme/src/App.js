import { useEffect } from 'react';
import Navbar from './Navbar';
import Table from './Table';
import Pagination from './Pagination';
import { useTheme } from './ThemeContext';

const App = () => {
    const { isDarkMode } = useTheme();

    useEffect(() => {
        document.body.className = isDarkMode ? "bg-dark text-light" : "bg-light text-dark";

    }, [isDarkMode]);

    return (
        <div>
            <Navbar />
            <Table />
            <Pagination />
        </div>
    );
};

export default App;
