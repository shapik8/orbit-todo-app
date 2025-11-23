import { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import Modal from '../shared/Modal';
import './TaskDetailModal.css';

const TaskDetailModal = () => {
    const {
        taskDetailModalOpen,
        closeTaskDetailModal,
        currentEditingTaskId,
        tasks,
        updateTask,
        deleteTask
    } = useApp();

    const [taskName, setTaskName] = useState('');
    const [taskDesc, setTaskDesc] = useState('');
    const [taskCategory, setTaskCategory] = useState('Personal');
    const [taskStatus, setTaskStatus] = useState('todo');
    const [taskReminder, setTaskReminder] = useState('');

    // Load task data when modal opens
    useEffect(() => {
        if (currentEditingTaskId && taskDetailModalOpen) {
            const task = tasks.find(t => t.id === currentEditingTaskId);
            if (task) {
                setTaskName(task.text);
                setTaskDesc(task.description || '');
                setTaskCategory(task.category);
                setTaskStatus(task.status);
                setTaskReminder(task.reminder || '');
            }
        }
    }, [currentEditingTaskId, taskDetailModalOpen, tasks]);

    const handleSave = () => {
        if (currentEditingTaskId) {
            updateTask(currentEditingTaskId, {
                text: taskName,
                description: taskDesc,
                category: taskCategory,
                status: taskStatus,
                reminder: taskReminder
            });
            closeTaskDetailModal();
        }
    };

    const handleDelete = () => {
        if (currentEditingTaskId && confirm('Are you sure you want to delete this task?')) {
            deleteTask(currentEditingTaskId);
            closeTaskDetailModal();
        }
    };

    return (
        <Modal
            isOpen={taskDetailModalOpen}
            onClose={closeTaskDetailModal}
            className="task-detail-modal"
        >
            <div className="modal-header">
                <h2 id="taskDetailTitle">Task Details</h2>
                <span className="close-btn" onClick={closeTaskDetailModal}>&times;</span>
            </div>
            <div className="modal-body">
                <div className="task-detail-form">
                    <div className="form-group">
                        <label>Task Name</label>
                        <input
                            type="text"
                            id="detailTaskName"
                            className="form-input"
                            placeholder="Enter task name"
                            value={taskName}
                            onChange={(e) => setTaskName(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label>Description</label>
                        <textarea
                            id="detailTaskDesc"
                            className="form-textarea"
                            rows="4"
                            placeholder="Add task description..."
                            value={taskDesc}
                            onChange={(e) => setTaskDesc(e.target.value)}
                        ></textarea>
                    </div>
                    <div className="form-row">
                        <div className="form-group">
                            <label>Category</label>
                            <select
                                id="detailTaskCategory"
                                className="form-select"
                                value={taskCategory}
                                onChange={(e) => setTaskCategory(e.target.value)}
                            >
                                <option value="Personal">Personal</option>
                                <option value="Work">Work</option>
                                <option value="Urgent">Urgent</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label>Status</label>
                            <select
                                id="detailTaskStatus"
                                className="form-select"
                                value={taskStatus}
                                onChange={(e) => setTaskStatus(e.target.value)}
                            >
                                <option value="todo">To Do</option>
                                <option value="in-progress">In Progress</option>
                                <option value="on-hold">On Hold</option>
                                <option value="done">Done</option>
                            </select>
                        </div>
                    </div>
                    <div className="form-group">
                        <label>Reminder</label>
                        <input
                            type="datetime-local"
                            id="detailTaskReminder"
                            className="form-input"
                            value={taskReminder}
                            onChange={(e) => setTaskReminder(e.target.value)}
                        />
                    </div>
                    <div className="modal-actions">
                        <button id="deleteTaskDetailBtn" className="btn-delete" onClick={handleDelete}>
                            Delete Task
                        </button>
                        <div className="modal-actions-right">
                            <button id="cancelTaskDetailBtn" className="btn-cancel" onClick={closeTaskDetailModal}>
                                Cancel
                            </button>
                            <button id="saveTaskDetailBtn" className="btn-save" onClick={handleSave}>
                                Save Changes
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </Modal>
    );
};

export default TaskDetailModal;
