import { useApp } from '../../context/AppContext';
import Modal from '../shared/Modal';
import './UrgentTasksModal.css';

const UrgentTasksModal = () => {
    const { urgentModalOpen, setUrgentModalOpen, tasks } = useApp();

    const urgentTasks = tasks.filter(t => t.category === 'Urgent' && t.status !== 'done');

    return (
        <Modal isOpen={urgentModalOpen} onClose={() => setUrgentModalOpen(false)}>
            <div className="modal-header">
                <h2>🚨 Urgent Tasks for Today</h2>
                <span className="close-btn" onClick={() => setUrgentModalOpen(false)}>&times;</span>
            </div>
            <div className="modal-body">
                <ul id="urgentTaskListModal">
                    {urgentTasks.length === 0 ? (
                        <li>No urgent tasks!</li>
                    ) : (
                        urgentTasks.map(task => (
                            <li key={task.id}>
                                <span>{task.text}</span>
                                <span className={`badge ${task.status}`}>{task.status}</span>
                            </li>
                        ))
                    )}
                </ul>
            </div>
        </Modal>
    );
};

export default UrgentTasksModal;
