import { useTimer } from '../../hooks/useTimer';
import { useApp } from '../../context/AppContext';
import './FocusView.css';

const FocusView = () => {
    const { addXP } = useApp();

    const handleTimerComplete = () => {
        addXP(50);
        alert('Focus Session Complete! +50 XP');
    };

    const { minutes, seconds, isRunning, toggle, reset } = useTimer(25 * 60, handleTimerComplete);

    return (
        <div className="focus-container">
            <div className="focus-card">
                <h3>Focus Session</h3>
                <p className="focus-subtitle">Stay focused for 25 minutes to grow your tree and earn XP.</p>

                <div className="timer-display-large">
                    <span id="timer-minutes">{minutes.toString().padStart(2, '0')}</span> :
                    <span id="timer-seconds">{seconds.toString().padStart(2, '0')}</span>
                    <i className="fas fa-seedling leaf-icon"></i>
                </div>

                <div className="timer-controls">
                    <button id="startTimerBtn" className="play-btn" onClick={toggle}>
                        <i className={isRunning ? 'fas fa-pause' : 'fas fa-play'}></i>
                    </button>
                    <button id="resetTimerBtn" className="reset-btn" onClick={reset}>
                        <i className="fas fa-redo"></i>
                    </button>
                </div>

                <div className="focus-reward">
                    REWARD: +50 XP
                </div>
            </div>
        </div>
    );
};

export default FocusView;
