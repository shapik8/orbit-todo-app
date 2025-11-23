import { useApp } from '../../context/AppContext';
import TaskItem from './TaskItem';
import './TaskList.css';

const TaskList = () => {
    const { tasks, currentFilter } = useApp();

    const filteredTasks = tasks.filter(task =>
        currentFilter === 'all' || task.category === currentFilter
    );

    return (
        <ul id="taskList" className="task-list">
            {filteredTasks.length === 0 ? (
                <p style={{ textAlign: 'center', color: 'var(--text-light)', padding: '40px 0' }}>
                    No tasks yet. Add one above!
                </p>
            ) : (
                filteredTasks.map(task => (
                    <TaskItem key={task.id} task={task} />
                ))
            )}
        </ul>
    );
};

export default TaskList;
