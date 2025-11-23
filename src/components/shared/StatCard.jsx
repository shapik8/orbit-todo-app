import { useState } from 'react';
import './StatCard.css';

const StatCard = ({ icon, title, value, className = '', tooltip }) => {
    const [showTooltip, setShowTooltip] = useState(false);

    return (
        <div
            className={`stat-card ${className}`}
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
        >
            <div className="icon">
                <i className={icon}></i>
            </div>
            <div className="info">
                <h3>{title}</h3>
                <span>{value}</span>
            </div>
            {showTooltip && tooltip && (
                <div className="stat-card-tooltip" dangerouslySetInnerHTML={{ __html: tooltip }} />
            )}
        </div>
    );
};

export default StatCard;
