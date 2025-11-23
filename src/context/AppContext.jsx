import { createContext, useContext, useState, useEffect } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

const AppContext = createContext();

export const useApp = () => {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error('useApp must be used within AppProvider');
    }
    return context;
};

export const AppProvider = ({ children }) => {
    // State with localStorage persistence
    const [tasks, setTasks] = useLocalStorage('shapik_tasks', []);
    const [userProfile, setUserProfile] = useLocalStorage('shapik_profile', {
        name: 'Shapik',
        level: 1,
        xp: 0,
        streak: 0,
        lastActive: null
    });
    const [dailyFocus, setDailyFocus] = useLocalStorage('shapik_daily_focus', '');
    const [focusDone, setFocusDone] = useLocalStorage('shapik_focus_done', false);

    // Local state (not persisted)
    const [currentView, setCurrentView] = useState('dashboard');
    const [currentFilter, setCurrentFilter] = useState('all');
    const [currentDate, setCurrentDate] = useState(new Date());
    const [urgentModalOpen, setUrgentModalOpen] = useState(false);
    const [taskDetailModalOpen, setTaskDetailModalOpen] = useState(false);
    const [currentEditingTaskId, setCurrentEditingTaskId] = useState(null);
    const [calendarModalOpen, setCalendarModalOpen] = useState(false);

    const [selectedCalendarDate, setSelectedCalendarDate] = useState(null);
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);



    // Check streak on mount
    useEffect(() => {
        checkStreak();
    }, []);

    // Task operations
    const addTask = (text, category = 'Personal', reminder = '', description = '') => {
        const newTask = {
            id: Date.now(),
            text,
            category,
            reminder,
            description,
            status: 'todo',
            createdAt: new Date().toISOString(),
            completedAt: null
        };
        setTasks([...tasks, newTask]);
    };

    const updateTask = (id, updates) => {
        setTasks(tasks.map(task =>
            task.id === id ? { ...task, ...updates } : task
        ));
    };

    const deleteTask = (id) => {
        setTasks(tasks.filter(task => task.id !== id));
    };

    const toggleTask = (id) => {
        setTasks(tasks.map(task => {
            if (task.id === id) {
                const newStatus = task.status === 'done' ? 'todo' : 'done';
                const updates = { status: newStatus };

                if (newStatus === 'done') {
                    updates.completedAt = new Date().toISOString();
                    addXP(10);
                } else {
                    updates.completedAt = null;
                }

                return { ...task, ...updates };
            }
            return task;
        }));
    };

    const updateTaskStatus = (id, status) => {
        updateTask(id, { status });
    };

    // Gamification
    const addXP = (amount) => {
        const newXP = userProfile.xp + amount;
        const newLevel = Math.floor(newXP / 100) + 1;

        setUserProfile({
            ...userProfile,
            xp: newXP,
            level: newLevel
        });

        if (newLevel > userProfile.level) {
            alert(`Level Up! You are now Level ${newLevel}!`);
        }
    };

    const checkStreak = () => {
        const lastActive = userProfile.lastActive;
        const today = new Date().toDateString();

        if (lastActive !== today) {
            const yesterday = new Date();
            yesterday.setDate(yesterday.getDate() - 1);

            let newStreak = 1;
            if (lastActive === yesterday.toDateString()) {
                newStreak = userProfile.streak + 1;
            }

            setUserProfile({
                ...userProfile,
                streak: newStreak,
                lastActive: today
            });
        }
    };



    // Daily Focus
    const updateDailyFocus = (text) => {
        setDailyFocus(text);
    };

    const toggleFocusDone = () => {
        const newDone = !focusDone;
        setFocusDone(newDone);
        if (newDone) {
            addXP(20);
        }
    };

    // Modal controls
    const openTaskDetailModal = (taskId) => {
        setCurrentEditingTaskId(taskId);
        setTaskDetailModalOpen(true);
    };

    const closeTaskDetailModal = () => {
        setCurrentEditingTaskId(null);
        setTaskDetailModalOpen(false);

    };

    const toggleSidebar = () => {
        setIsSidebarCollapsed(!isSidebarCollapsed);
    };

    // Computed values
    const stats = {
        total: tasks.length,
        completed: tasks.filter(t => t.status === 'done').length,
        inProgress: tasks.filter(t => t.status === 'in-progress').length,
        onHold: tasks.filter(t => t.status === 'on-hold').length,
        urgent: tasks.filter(t => t.category === 'Urgent' && t.status !== 'done').length,
        pending: tasks.filter(t => t.status !== 'done').length
    };

    const value = {
        // State
        tasks,
        userProfile,
        dailyFocus,
        focusDone,
        currentView,
        currentFilter,
        currentDate,
        urgentModalOpen,
        taskDetailModalOpen,
        currentEditingTaskId,
        calendarModalOpen,
        selectedCalendarDate,
        stats,

        // Actions
        addTask,
        updateTask,
        deleteTask,
        toggleTask,
        updateTaskStatus,
        addXP,
        updateDailyFocus,
        toggleFocusDone,
        setCurrentView,
        setCurrentFilter,
        setCurrentDate,
        setUrgentModalOpen,
        setCalendarModalOpen,
        setSelectedCalendarDate,
        openTaskDetailModal,
        openTaskDetailModal,
        closeTaskDetailModal,
        isSidebarCollapsed,
        toggleSidebar
    };

    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    );
};
