import { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import Modal from '../shared/Modal';
import './CalendarTaskModal.css';

const CalendarTaskModal = () => {
    const {
        calendarModalOpen,
        setCalendarModalOpen,
        selectedCalendarDate,
        tasks,
        addTask,
        updateTask,
        deleteTask
    } = useApp();

    const [taskText, setTaskText] = useState('');
    const [taskCategory, setTaskCategory] = useState('Personal');
    const [taskReminder, setTaskReminder] = useState('');
    const [editingTaskId, setEditingTaskId] = useState(null);

    // Get tasks for selected date
    const getTasksForDate = () => {
        if (!selectedCalendarDate) return [];

        return tasks.filter(task => {
            if (!task.reminder) return false;
            const taskDate = new Date(task.reminder);
            const selectedDate = new Date(selectedCalendarDate);

            return taskDate.getDate() === selectedDate.getDate() &&
                taskDate.getMonth() === selectedDate.getMonth() &&
                taskDate.getFullYear() === selectedDate.getFullYear();
        });
    };

    const dateTasks = getTasksForDate();

    // Set default reminder time to selected date
    useEffect(() => {
        if (selectedCalendarDate && !editingTaskId) {
            const date = new Date(selectedCalendarDate);
            date.setHours(9, 0); // Default to 9 AM
            setTaskReminder(date.toISOString().slice(0, 16));
        }
    }, [selectedCalendarDate, editingTaskId]);

    const handleClose = () => {
        setTaskText('');
        setTaskCategory('Personal');
        setTaskReminder('');
        setEditingTaskId(null);
        setCalendarModalOpen(false);
    };

    const handleAddTask = () => {
        if (taskText.trim()) {
            addTask(taskText.trim(), taskCategory, taskReminder);
            setTaskText('');
            setTaskCategory('Personal');
        }
    };

    const handleEditTask = (task) => {
        setEditingTaskId(task.id);
        setTaskText(task.text);
        setTaskCategory(task.category);
        setTaskReminder(task.reminder);
    };

    const handleUpdateTask = () => {
        if (editingTaskId && taskText.trim()) {
            updateTask(editingTaskId, {
                text: taskText.trim(),
                category: taskCategory,
                reminder: taskReminder
            });
            setTaskText('');
            setTaskCategory('Personal');
            setEditingTaskId(null);
        }
    };

    const handleDeleteTask = (taskId) => {
        if (confirm('Delete this task?')) {
            deleteTask(taskId);
            if (editingTaskId === taskId) {
                setTaskText('');
                setEditingTaskId(null);
            }
        }
    };

    const formatDateHeader = () => {
        if (!selectedCalendarDate) return '';
        const date = new Date(selectedCalendarDate);
        return date.toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    return (
        <Modal isOpen={calendarModalOpen} onClose={handleClose} className="calendar-task-modal">
            <div className="modal-header">
                <h2>📅 {formatDateHeader()}</h2>
                <span className="close-btn" onClick={handleClose}>&times;</span>
            </div>

            <div className="modal-body">
                {/* Add/Edit Task Form */}
                <div className="task-form">
                    <h3>{editingTaskId ? 'Edit Task' : 'Add New Task'}</h3>
                    <div className="form-group">
                        <input
                            type="text"
                            className="form-input"
                            placeholder="Task name..."
                            value={taskText}
                            onChange={(e) => setTaskText(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && (editingTaskId ? handleUpdateTask() : handleAddTask())}
                        />
                    </div>
                    <div className="form-row">
                        <select
                            className="form-select"
                            value={taskCategory}
                            onChange={(e) => setTaskCategory(e.target.value)}
                        >
                            <option value="Personal">Personal</option>
                            <option value="Work">Work</option>
                            <option value="Urgent">Urgent</option>
                        </select>
                        <input
                            type="datetime-local"
                            className="form-input"
                            value={taskReminder}
                            onChange={(e) => setTaskReminder(e.target.value)}
                        />
                    </div>
                    <div className="form-actions">
                        {editingTaskId ? (
                            <>
                                <button className="btn-cancel" onClick={() => {
                                    setTaskText('');
                                    setEditingTaskId(null);
                                }}>Cancel</button>
                                <button className="btn-save" onClick={handleUpdateTask}>Update</button>
                            </>
                        ) : (
                            <button className="btn-add" onClick={handleAddTask}>Add Task</button>
                        )}
                    </div>
                </div>

                {/* Task List */}
                <div className="date-tasks-list">
                    <h3>Tasks ({dateTasks.length})</h3>
                    {dateTasks.length === 0 ? (
                        <p className="no-tasks">No tasks for this date</p>
                    ) : (
                        <ul>
                            {dateTasks.map(task => (
                                <li key={task.id} className={`task-item ${task.status}`}>
                                    <div className="task-content">
                                        <span className={`badge ${task.category}`}>{task.category}</span>
                                        <span className="task-text">{task.text}</span>
                                        <span className="task-status">{task.status}</span>
                                    </div>
                                    <div className="task-actions">
                                        <button
                                            className="btn-edit"
                                            onClick={() => handleEditTask(task)}
                                            title="Edit"
                                        >
                                            <i className="fas fa-edit"></i>
                                        </button>
                                        <button
                                            className="btn-delete"
                                            onClick={() => handleDeleteTask(task.id)}
                                            title="Delete"
                                        >
                                            <i className="fas fa-trash"></i>
                                        </button>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
        </Modal>
    );
};

export default CalendarTaskModal;
