import { useState, useEffect, useRef } from 'react';

// Custom hook for Focus Zone timer
export const useTimer = (initialTime = 25 * 60, onComplete) => {
    const [timeLeft, setTimeLeft] = useState(initialTime);
    const [isRunning, setIsRunning] = useState(false);
    const intervalRef = useRef(null);

    useEffect(() => {
        if (isRunning && timeLeft > 0) {
            intervalRef.current = setInterval(() => {
                setTimeLeft((prev) => {
                    if (prev <= 1) {
                        setIsRunning(false);
                        if (onComplete) onComplete();
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
        } else {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        }

        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, [isRunning, timeLeft, onComplete]);

    const toggle = () => {
        setIsRunning((prev) => !prev);
    };

    const reset = () => {
        setIsRunning(false);
        setTimeLeft(initialTime);
    };

    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;

    return {
        minutes,
        seconds,
        isRunning,
        toggle,
        reset,
        timeLeft
    };
};
