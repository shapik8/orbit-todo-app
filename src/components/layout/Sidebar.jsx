import UserProfile from '../shared/UserProfile';
import Navigation from '../shared/Navigation';
import './Sidebar.css';

const Sidebar = () => {
    return (
        <aside className="sidebar">
            <div className="sidebar-header">
                <div className="logo">
                    <div className="logo-icon">O</div>
                    <h2>Orbit</h2>
                </div>
            </div>

            <UserProfile />
            <Navigation />
        </aside>
    );
};

export default Sidebar;
