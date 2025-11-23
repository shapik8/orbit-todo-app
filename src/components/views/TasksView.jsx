import TaskInput from '../tasks/TaskInput';
import FilterButtons from '../tasks/FilterButtons';
import TaskList from '../tasks/TaskList';
import './TasksView.css';

const TasksView = () => {
    return (
        <>
            {/* Add New Task Card */}
            <TaskInput />

            {/* Task List Section */}
            <div className="tasks-section">
                <div className="tasks-header">
                    <h3>My Tasks</h3>
                    <FilterButtons />
                </div>
                <TaskList />
            </div>
        </>
    );
};

export default TasksView;
