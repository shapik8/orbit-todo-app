import { useApp } from '../../context/AppContext';
import './DarkModeToggle.css';

const DarkModeToggle = () => {
    const { theme, toggleTheme } = useApp();

    return (
        <div className="sidebar-footer">
            <button id="darkModeToggle" className="dark-mode-btn" onClick={toggleTheme}>
                <i className={theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon'}></i>
                {theme === 'dark' ? ' Light Mode' : ' Dark Mode'}
            </button>
        </div>
    );
};

export default DarkModeToggle;
