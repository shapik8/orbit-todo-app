import UserProfile from '../shared/UserProfile';
import Navigation from '../shared/Navigation';
import './Sidebar.css';
import { useApp } from '../../context/AppContext';

const Sidebar = () => {
    const { isSidebarCollapsed, toggleSidebar } = useApp();

    return (
        <aside className={`sidebar ${isSidebarCollapsed ? 'collapsed' : ''}`}>
            <div className="sidebar-header">
                <div className="logo">
                    <div className="logo-icon">O</div>
                    {!isSidebarCollapsed && <h2>Orbit</h2>}
                </div>
            </div>

            <UserProfile collapsed={isSidebarCollapsed} />
            <Navigation collapsed={isSidebarCollapsed} />

            <button className="sidebar-toggle" onClick={toggleSidebar} title={isSidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}>
                <i className={`fas fa-angle-double-${isSidebarCollapsed ? 'right' : 'left'}`}></i>
            </button>
        </aside>
    );
};

export default Sidebar;
