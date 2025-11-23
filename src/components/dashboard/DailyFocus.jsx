import { useState } from 'react';
import { useApp } from '../../context/AppContext';
import './DailyFocus.css';

const DailyFocus = () => {
    const { dailyFocus, focusDone, updateDailyFocus, toggleFocusDone } = useApp();
    const [isEditing, setIsEditing] = useState(false);
    const [focusText, setFocusText] = useState(dailyFocus);

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleSave = () => {
        updateDailyFocus(focusText);
        setIsEditing(false);
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSave();
        }
    };

    return (
        <div className="daily-focus-card">
            <div className="card-header">
                <h3><i className="fas fa-star"></i> Daily Focus</h3>
                <button id="editFocusBtn" className="icon-btn-small" onClick={handleEdit}>
                    <i className="fas fa-pen"></i>
                </button>
            </div>
            <div className="focus-content">
                {isEditing ? (
                    <input
                        type="text"
                        id="focusInput"
                        className="focus-input"
                        placeholder="What is your main focus?"
                        value={focusText}
                        onChange={(e) => setFocusText(e.target.value)}
                        onBlur={handleSave}
                        onKeyPress={handleKeyPress}
                        autoFocus
                    />
                ) : (
                    <div
                        id="focusDisplay"
                        className="focus-text"
                        style={{ textDecoration: focusDone ? 'line-through' : 'none' }}
                    >
                        {dailyFocus || 'Set your main focus for today...'}
                    </div>
                )}
            </div>
            <div className="focus-status">
                <input
                    type="checkbox"
                    id="focusCheck"
                    checked={focusDone}
                    onChange={toggleFocusDone}
                />
                <label htmlFor="focusCheck">Mark as completed</label>
            </div>
        </div>
    );
};

export default DailyFocus;
