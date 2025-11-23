import { useApp } from '../../context/AppContext';
import { getMonthData } from '../../utils/dateUtils';
import './CalendarView.css';

const CalendarView = () => {
    const { tasks, currentDate, setCurrentDate, setCalendarModalOpen, setSelectedCalendarDate } = useApp();

    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const { firstDay, daysInMonth } = getMonthData(year, month);

    const monthName = currentDate.toLocaleString('default', { month: 'long', year: 'numeric' });

    const handlePrevMonth = () => {
        const newDate = new Date(currentDate);
        newDate.setMonth(newDate.getMonth() - 1);
        setCurrentDate(newDate);
    };

    const handleNextMonth = () => {
        const newDate = new Date(currentDate);
        newDate.setMonth(newDate.getMonth() + 1);
        setCurrentDate(newDate);
    };

    const handleDayClick = (day) => {
        const selectedDate = new Date(year, month, day);
        setSelectedCalendarDate(selectedDate);
        setCalendarModalOpen(true);
    };

    const getTasksForDay = (day) => {
        return tasks.filter(task => {
            if (!task.reminder) return false;
            const taskDate = new Date(task.reminder);
            return taskDate.getDate() === day &&
                taskDate.getMonth() === month &&
                taskDate.getFullYear() === year;
        });
    };

    const isToday = (day) => {
        const today = new Date();
        return today.getDate() === day &&
            today.getMonth() === month &&
            today.getFullYear() === year;
    };

    const dayHeaders = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    return (
        <>
            <div className="calendar-header">
                <button id="prevMonth" onClick={handlePrevMonth}>
                    <i className="fas fa-chevron-left"></i>
                </button>
                <h2 id="currentMonth">{monthName}</h2>
                <button id="nextMonth" onClick={handleNextMonth}>
                    <i className="fas fa-chevron-right"></i>
                </button>
            </div>

            <div className="calendar-grid" id="calendarGrid">
                {/* Day headers */}
                {dayHeaders.map(day => (
                    <div key={day} className="calendar-day-header">{day}</div>
                ))}

                {/* Empty slots before first day */}
                {Array.from({ length: firstDay }).map((_, i) => (
                    <div key={`empty-${i}`}></div>
                ))}

                {/* Calendar days */}
                {Array.from({ length: daysInMonth }).map((_, i) => {
                    const day = i + 1;
                    const dayTasks = getTasksForDay(day);
                    const today = isToday(day);

                    return (
                        <div
                            key={day}
                            className={`calendar-day ${today ? 'today' : ''}`}
                            onClick={() => handleDayClick(day)}
                        >
                            <span className="day-number">{day}</span>
                            {dayTasks.length > 0 && (
                                <div className="day-tasks">
                                    {dayTasks.map(task => (
                                        <div key={task.id} className={`task-dot ${task.category}`}></div>
                                    ))}
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </>
    );
};

export default CalendarView;
