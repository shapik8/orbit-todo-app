import DailyFocus from '../dashboard/DailyFocus';
import QuickCapture from '../dashboard/QuickCapture';
import StatsGrid from '../dashboard/StatsGrid';
import ProductivityChart from '../dashboard/ProductivityChart';
import ProgressCard from '../dashboard/ProgressCard';
import './Dashboard.css';

const Dashboard = () => {
    return (
        <>
            {/* Daily Focus & Quick Capture Row */}
            <div className="dashboard-row">
                <DailyFocus />
                <QuickCapture />
            </div>

            {/* Stats Grid */}
            <StatsGrid />

            {/* Bottom Row: Daily Chart & Overall Progress */}
            <div className="dashboard-bottom-row">
                <ProductivityChart />
                <ProgressCard />
            </div>
        </>
    );
};

export default Dashboard;
