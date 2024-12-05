// import { useContext } from 'react';
import { useTheme } from './ThemeContext';
// import ThemeContext from './ThemeContext';

const Navbar = () => {
    // const { isDarkMode, toggleTheme } = useContext(ThemeContext);
    const { isDarkMode, toggleTheme } = useTheme();

    return (
        <div>
            <nav className={`navbar navbar-expand-sm ${isDarkMode ? "navbar-dark bg-dark" : "navbar-light bg-light"}`}>
                <div className="container-fluid">
                    <a className="navbar-brand" href="#">My CRM</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <span className="nav-link active" aria-current="page" href="#">User</span>
                            </li>
                            <li className="nav-item">
                                <span className="nav-link" href="#">Order</span>
                            </li>
                            <li className="nav-item">
                                <span className="nav-link" href="#">Order Items</span>
                            </li>
                            <li className="nav-item">
                                <span className="nav-link" href="#">Item</span>
                            </li>
                            <li className="nav-item">
                                <span className="nav-link" href="#">Store</span>
                            </li>
                        </ul>
                        <button className="btn btn-outline-secondary" onClick={toggleTheme}>
                            {isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}</button>
                    </div>
                </div>
            </nav>
        </div >
    );
}

export default Navbar;
