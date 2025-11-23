import { useApp } from '../../context/AppContext';
import StatCard from '../shared/StatCard';
import './StatsGrid.css';

const StatsGrid = () => {
    const { stats, tasks, userProfile, setUrgentModalOpen } = useApp();

    const getTooltipContent = (type) => {
        let filteredTasks = [];
        let title = '';

        switch (type) {
            case 'total':
                filteredTasks = tasks.slice(0, 5);
                title = 'Recent Tasks';
                break;
            case 'urgent':
                filteredTasks = tasks.filter(t => t.category === 'Urgent' && t.status !== 'done').slice(0, 5);
                title = 'Urgent Tasks';
                break;
            case 'inprogress':
                filteredTasks = tasks.filter(t => t.status === 'in-progress').slice(0, 5);
                title = 'In Progress';
                break;
            case 'onhold':
                filteredTasks = tasks.filter(t => t.status === 'on-hold').slice(0, 5);
                title = 'On Hold';
                break;
            case 'completed':
                filteredTasks = tasks.filter(t => t.status === 'done').slice(0, 5);
                title = 'Completed Tasks';
                break;
            case 'streak':
                return `<h4>Streak Info</h4><ul><li>Keep completing tasks daily to maintain your streak!</li></ul>`;
            default:
                return '';
        }

        if (filteredTasks.length === 0) {
            return `<h4>${title}</h4><ul><li>No tasks in this category</li></ul>`;
        }

        const taskItems = filteredTasks.map(t => `<li>${t.text}</li>`).join('');
        return `<h4>${title}</h4><ul>${taskItems}</ul>`;
    };

    return (
        <section className="stats-grid">
            <StatCard
                icon="fas fa-clipboard-list"
                title="Total Tasks"
                value={stats.total}
                className="total"
                tooltip={getTooltipContent('total')}
            />
            <div
                onClick={() => setUrgentModalOpen(true)}
                style={{ cursor: 'pointer' }}
            >
                <StatCard
                    icon="fas fa-exclamation-circle"
                    title="Urgent Today"
                    value={stats.urgent}
                    className="urgent"
                    tooltip={getTooltipContent('urgent')}
                />
            </div>
            <StatCard
                icon="fas fa-spinner"
                title="In Progress"
                value={stats.inProgress}
                className="inprogress"
                tooltip={getTooltipContent('inprogress')}
            />
            <StatCard
                icon="fas fa-pause-circle"
                title="On Hold"
                value={stats.onHold}
                className="onhold"
                tooltip={getTooltipContent('onhold')}
            />
            <StatCard
                icon="fas fa-check-circle"
                title="Completed"
                value={stats.completed}
                className="completed"
                tooltip={getTooltipContent('completed')}
            />
            <StatCard
                icon="fas fa-fire"
                title="Day Streak"
                value={userProfile.streak}
                className="streak"
                tooltip={getTooltipContent('streak')}
            />
        </section>
    );
};

export default StatsGrid;
