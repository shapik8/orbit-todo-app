import { useApp } from '../../context/AppContext';
import './ProgressCard.css';

const ProgressCard = () => {
    const { stats } = useApp();

    const percent = stats.total === 0 ? 0 : Math.round((stats.completed / stats.total) * 100);

    return (
        <div className="progress-card">
            <div className="card-header">
                <h3>Overall Progress</h3>
                <span id="progressText">{percent}%</span>
            </div>
            <div className="progress-bar-bg">
                <div className="progress-bar-fill" id="progressBar" style={{ width: `${percent}%` }}></div>
            </div>
        </div>
    );
};

export default ProgressCard;
