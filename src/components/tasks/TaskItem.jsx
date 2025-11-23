import { useApp } from '../../context/AppContext';
import { formatDateTime } from '../../utils/dateUtils';
import './TaskItem.css';

const TaskItem = ({ task }) => {
    const { toggleTask, deleteTask } = useApp();

    return (
        <li className={`task ${task.status === 'done' ? 'done' : ''}`}>
            <div className="task-content">
                <div className="check-circle" onClick={() => toggleTask(task.id)}>
                    <i className="fas fa-check"></i>
                </div>
                <div className="task-details">
                    <span className="taskText">{task.text}</span>
                    <div className="task-meta">
                        <span className={`badge ${task.category}`}>{task.category}</span>
                        {task.reminder && (
                            <span className="reminder">
                                <i className="fas fa-bell"></i> {formatDateTime(task.reminder)}
                            </span>
                        )}
                    </div>
                </div>
            </div>
            <button className="deleteBtn" onClick={() => deleteTask(task.id)}>
                <i className="fas fa-trash"></i>
            </button>
        </li>
    );
};

export default TaskItem;
