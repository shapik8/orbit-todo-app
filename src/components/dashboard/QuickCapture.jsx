import { useState } from 'react';
import { useApp } from '../../context/AppContext';
import './QuickCapture.css';

const QuickCapture = () => {
    const { addTask } = useApp();
    const [taskText, setTaskText] = useState('');
    const [category, setCategory] = useState('Personal');

    const handleAdd = () => {
        if (taskText.trim()) {
            addTask(taskText.trim(), category);
            setTaskText('');
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleAdd();
        }
    };

    return (
        <div className="quick-capture-card">
            <h3><i className="fas fa-bolt"></i> Quick Capture</h3>
            <div className="quick-input-wrapper">
                <select
                    id="quickCategorySelect"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                >
                    <option value="Personal">Personal</option>
                    <option value="Work">Work</option>
                    <option value="Urgent">Urgent</option>
                </select>
                <input
                    type="text"
                    id="quickTaskInput"
                    placeholder="Add a new task + Enter"
                    value={taskText}
                    onChange={(e) => setTaskText(e.target.value)}
                    onKeyPress={handleKeyPress}
                />
                <button id="quickAddBtn" onClick={handleAdd}>
                    <i className="fas fa-plus"></i>
                </button>
            </div>
        </div>
    );
};

export default QuickCapture;
