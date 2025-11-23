import { useState } from 'react';
import { useApp } from '../../context/AppContext';
import KanbanColumn from '../kanban/KanbanColumn';
import './KanbanView.css';

const KanbanView = () => {
    const { tasks, updateTaskStatus, openTaskDetailModal } = useApp();
    const [draggedTask, setDraggedTask] = useState(null);

    const handleDragStart = (e, task) => {
        setDraggedTask(task);
        e.currentTarget.classList.add('dragging');
    };

    const handleDragEnd = (e) => {
        e.currentTarget.classList.remove('dragging');
        setDraggedTask(null);
    };

    const handleDragOver = (e, status) => {
        e.preventDefault();
    };

    const handleDrop = (e, newStatus) => {
        e.preventDefault();
        if (draggedTask) {
            updateTaskStatus(draggedTask.id, newStatus);
        }
    };

    const columns = [
        { status: 'todo', title: 'To Do' },
        { status: 'in-progress', title: 'In Progress' },
        { status: 'on-hold', title: 'On Hold' },
        { status: 'done', title: 'Done' }
    ];

    const getTasksByStatus = (status) => {
        return tasks.filter(task => task.status === status);
    };

    return (
        <div className="kanban-board">
            {columns.map(column => (
                <KanbanColumn
                    key={column.status}
                    status={column.status}
                    title={column.title}
                    tasks={getTasksByStatus(column.status)}
                    count={getTasksByStatus(column.status).length}
                    onDragOver={handleDragOver}
                    onDrop={handleDrop}
                    onCardDragStart={handleDragStart}
                    onCardDragEnd={handleDragEnd}
                    onCardClick={openTaskDetailModal}
                />
            ))}
        </div>
    );
};

export default KanbanView;
