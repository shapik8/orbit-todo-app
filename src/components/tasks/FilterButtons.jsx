import { useApp } from '../../context/AppContext';
import './FilterButtons.css';

const FilterButtons = () => {
    const { currentFilter, setCurrentFilter } = useApp();

    const filters = ['all', 'Work', 'Personal', 'Urgent'];

    return (
        <div className="filter-group">
            {filters.map(filter => (
                <button
                    key={filter}
                    className={`filter-btn ${currentFilter === filter ? 'active' : ''}`}
                    onClick={() => setCurrentFilter(filter)}
                >
                    {filter === 'all' ? 'All' : filter}
                </button>
            ))}
        </div>
    );
};

export default FilterButtons;
