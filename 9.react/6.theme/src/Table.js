import { useTheme } from './ThemeContext';

const { isDarkMode } = useTheme();

const Table = () => {
    const { isDarkMode } = useTheme();

    return (
        <div className="container mt-4">
            <table className={`table ${isDarkMode ? "table-dark table-striped" : "table-light bg-light"}`}>
                <thead>
                    <tr>
                        <th>Column 1</th><th>Column 2</th><th>Column 3</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Data 1</td><td>Data 2</td><td>Data 3</td>
                    </tr>
                    <tr>
                        <td>Data 4</td><td>Data 5</td><td>Data 6</td>
                    </tr>
                    <tr>
                        <td>Data 7</td><td>Data 8</td><td>Data 9</td>
                    </tr>
                    <tr>
                        <td>Data 10</td><td>Data 11</td><td>Data 12</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default Table;
