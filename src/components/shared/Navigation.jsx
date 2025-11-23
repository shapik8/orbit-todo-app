import { useApp } from '../../context/AppContext';
import './Navigation.css';

const Navigation = ({ collapsed }) => {
    const { currentView, setCurrentView, stats } = useApp();

    const navItems = [
        { id: 'dashboard', icon: 'fas fa-th-large', label: 'Dashboard' },
        { id: 'tasks', icon: 'fas fa-tasks', label: 'My Tasks', badge: stats.pending },
        { id: 'kanban', icon: 'fas fa-columns', label: 'Kanban' },
        { id: 'focus', icon: 'fas fa-stopwatch', label: 'Focus Zone' },
        { id: 'calendar', icon: 'fas fa-calendar-alt', label: 'Calendar' }
    ];

    return (
        <nav className="sidebar-nav">
            <ul>
                {navItems.map(item => (
                    <li
                        key={item.id}
                        className={`nav-item ${currentView === item.id ? 'active' : ''}`}
                        onClick={() => setCurrentView(item.id)}
                        title={collapsed ? item.label : ''}
                    >
                        <i className={item.icon}></i>
                        {!collapsed && <span>{item.label}</span>}
                        {!collapsed && item.badge !== undefined && item.badge > 0 && (
                            <span className="badge-count" id="nav-task-count">{item.badge}</span>
                        )}
                    </li>
                ))}
            </ul>
        </nav>
    );
};

export default Navigation;
