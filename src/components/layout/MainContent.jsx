import { useApp } from '../../context/AppContext';
import Dashboard from '../views/Dashboard';
import TasksView from '../views/TasksView';
import KanbanView from '../views/KanbanView';
import FocusView from '../views/FocusView';
import CalendarView from '../views/CalendarView';
import Header from './Header';
import UrgentTasksModal from '../modals/UrgentTasksModal';
import TaskDetailModal from '../modals/TaskDetailModal';
import CalendarTaskModal from '../modals/CalendarTaskModal';
import './MainContent.css';

const MainContent = () => {
    const { currentView } = useApp();

    const renderView = () => {
        switch (currentView) {
            case 'dashboard':
                return <Dashboard />;
            case 'tasks':
                return <TasksView />;
            case 'kanban':
                return <KanbanView />;
            case 'focus':
                return <FocusView />;
            case 'calendar':
                return <CalendarView />;
            default:
                return <Dashboard />;
        }
    };

    return (
        <div className="main-content">
            <Header />
            {renderView()}

            {/* Global Modals */}
            <UrgentTasksModal />
            <TaskDetailModal />
            <CalendarTaskModal />
        </div>
    );
};

export default MainContent;
