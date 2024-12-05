import { useTheme } from './ThemeContext';

const Pagination = () => {
    const { isDarkMode } = useTheme;

    return (
        <div>
            <nav aria-label="Page navigation example">
                <ul className={`pagination ${isDarkMode ? "bg-dark" : ""} justify-content-center`}>
                    <li className="page-item"><span className={`page-link bg-dark text-light`} href="#">1</span></li>
                    <li className="page-item"><span className={`page-link bg-dark text-light`} href="#">2</span></li>
                    <li className="page-item"><span className={`page-link bg-dark text-light`} href="#">3</span></li>
                    <li className="page-item"><span className={`page-link bg-dark text-light`} href="#">1</span></li>
                    <li className="page-item"><span className={`page-link bg-dark text-light`} href="#">3</span></li>
                </ul>
            </nav>
        </div>
    );
};

export default Pagination;
