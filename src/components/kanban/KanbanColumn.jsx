import KanbanCard from './KanbanCard';
import './KanbanColumn.css';

const KanbanColumn = ({ status, title, tasks, count, onDragOver, onDrop, onCardDragStart, onCardDragEnd, onCardClick }) => {
    const handleDragOver = (e) => {
        e.preventDefault();
        onDragOver(e, status);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        onDrop(e, status);
    };

    return (
        <div
            className="kanban-column"
            data-status={status}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
        >
            <h3>{title} <span id={`${status}-count`}>{count}</span></h3>
            <div className="kanban-tasks" id={`kanban-${status}`}>
                {tasks.map(task => (
                    <KanbanCard
                        key={task.id}
                        task={task}
                        onDragStart={onCardDragStart}
                        onDragEnd={onCardDragEnd}
                        onClick={onCardClick}
                    />
                ))}
            </div>
        </div>
    );
};

export default KanbanColumn;
