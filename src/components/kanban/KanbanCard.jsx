import { useApp } from '../../context/AppContext';
import './KanbanCard.css';

const KanbanCard = ({ task, onDragStart, onDragEnd, onClick }) => {
    return (
        <div
            className="kanban-card"
            draggable
            onDragStart={(e) => onDragStart(e, task)}
            onDragEnd={onDragEnd}
            onClick={() => onClick(task.id)}
        >
            <h4>{task.text}</h4>
            <div className="kanban-meta">
                <span className={`badge ${task.category}`}>{task.category}</span>
            </div>
        </div>
    );
};

export default KanbanCard;
