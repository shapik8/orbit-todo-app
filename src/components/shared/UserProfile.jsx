import { useApp } from '../../context/AppContext';
import './UserProfile.css';

const UserProfile = () => {
    const { userProfile } = useApp();

    return (
        <div className="user-profile">
            <div className="profile-header">
                <div className="avatar">
                    <img
                        src={`https://ui-avatars.com/api/?name=${userProfile.name}&background=6c63ff&color=fff`}
                        alt="Profile"
                    />
                </div>
                <div className="profile-info">
                    <h3 id="profile-name">{userProfile.name}</h3>
                    <span id="profile-level">Lvl {userProfile.level} • Strategist</span>
                </div>
                <div className="level-badge">🛡️</div>
            </div>
        </div>
    );
};

export default UserProfile;
