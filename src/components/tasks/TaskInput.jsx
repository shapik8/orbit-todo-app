import { useState } from 'react';
import { useApp } from '../../context/AppContext';
import './TaskInput.css';

const TaskInput = () => {
    const { addTask } = useApp();
    const [taskText, setTaskText] = useState('');
    const [category, setCategory] = useState('Personal');
    const [reminder, setReminder] = useState('');

    const handleAdd = () => {
        if (taskText.trim()) {
            addTask(taskText.trim(), category, reminder);
            setTaskText('');
            setReminder('');
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleAdd();
        }
    };

    return (
        <div className="add-task-wrapper">
            <h3>Add New Task</h3>
            <div className="add-task-input-group">
                <input
                    type="text"
                    id="taskInput"
                    placeholder="What needs to be done?"
                    value={taskText}
                    onChange={(e) => setTaskText(e.target.value)}
                    onKeyPress={handleKeyPress}
                />
            </div>
            <div className="add-task-options">
                <div className="left-options">
                    <select
                        id="categoryInput"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                    >
                        <option value="Personal">Personal</option>
                        <option value="Work">Work</option>
                        <option value="Urgent">Urgent</option>
                    </select>
                    <input
                        type="datetime-local"
                        id="reminderInput"
                        value={reminder}
                        onChange={(e) => setReminder(e.target.value)}
                    />
                </div>
                <button id="addBtn" onClick={handleAdd}>Add Task</button>
            </div>
        </div>
    );
};

export default TaskInput;
