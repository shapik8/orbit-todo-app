import { getGreeting, getCurrentDateString } from '../../utils/dateUtils';
import './Header.css';

const Header = () => {
    const greeting = getGreeting();
    const dateString = getCurrentDateString();

    const handleRefresh = () => {
        window.location.reload();
    };

    return (
        <header>
            <div className="header-content">
                <div className="greeting-section">
                    <h1 id="greeting">{greeting}, Shapik!</h1>
                    <p className="subtitle" id="currentDate">{dateString}</p>
                </div>
                <div className="quick-actions">
                    <button id="refreshBtn" className="icon-btn" onClick={handleRefresh}>
                        <i className="fas fa-sync-alt"></i>
                    </button>
                    <button id="settingsBtn" className="icon-btn">
                        <i className="fas fa-cog"></i>
                    </button>
                </div>
            </div>
        </header>
    );
};

export default Header;
