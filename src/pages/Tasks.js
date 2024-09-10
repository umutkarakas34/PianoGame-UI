import React, { useState, useEffect } from 'react';
import '../styles/Tasks.css';
import CircularProgress from '@mui/material/CircularProgress';
import CheckIcon from '@mui/icons-material/Check';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import AudiotrackIcon from '@mui/icons-material/Audiotrack';
import QueueMusicIcon from '@mui/icons-material/QueueMusic';

const Tasks = () => {
    const tasks = [
        { id: 1, name: 'Task 1', duration: 3000 }, // 3 saniye
        { id: 2, name: 'Task 2', duration: 3000 }, // 3 saniye
        { id: 3, name: 'Task 3', duration: 3000 }, // 3 saniye
        { id: 4, name: 'Task 4', duration: 3000 }, // 3 saniye
        { id: 5, name: 'Task 5', duration: 3000 }, // 3 saniye
        { id: 6, name: 'Task 6', duration: 3000 }, // 3 saniye
        { id: 7, name: 'Task 7', duration: 3000 }, // 3 saniye
        { id: 8, name: 'Task 8', duration: 3000 }, // 3 saniye
        { id: 9, name: 'Task 9', duration: 3000 }, // 3 saniye
        { id: 10, name: 'Task 10', duration: 3000 }, // 3 saniye
    ];

    const [activeTask, setActiveTask] = useState(null);
    const [timer, setTimer] = useState(null);
    const [claimable, setClaimable] = useState(false);
    const [claimedTasks, setClaimedTasks] = useState([]);

    useEffect(() => {
        if (activeTask && timer !== null) {
            const timeout = setTimeout(() => {
                setClaimable(true);
            }, timer);

            return () => clearTimeout(timeout);
        }
    }, [activeTask, timer]);

    const startTask = (task) => {
        setActiveTask(task);
        setTimer(task.duration);
        setClaimable(false);
    };

    const claimReward = (taskId) => {
        setActiveTask(null);
        setTimer(null);
        setClaimable(false);
        setClaimedTasks((prev) => [...prev, taskId]);
    };

    const colors = ['#ff4081', '#3f51b5', '#4caf50', '#ffeb3b', '#e91e63', '#2196f3', '#f44336', '#9c27b0', '#673ab7', '#ff5722', '#00bcd4', '#8bc34a'];

    return (
        <div className="tasks-container">
            <h1 className="tasks-title">Tasks</h1>
            <div className="tasks-list">
                {tasks.map((task) => (
                    <div key={task.id} className="task-item">
                        <span>{task.name}</span>
                        {claimedTasks.includes(task.id) ? (
                            <CheckIcon className="check-icon" />
                        ) : activeTask && activeTask.id === task.id ? (
                            claimable ? (
                                <button className="claim-button" onClick={() => claimReward(task.id)}>Claim</button>
                            ) : (
                                <div className="button-wrapper">
                                    <CircularProgress className="loading-spinner" />
                                </div>
                            )
                        ) : (
                            <button className="start-button" onClick={() => startTask(task)}>Start</button>
                        )}
                    </div>
                ))}
            </div>
            <div className="background-notes">
                {Array.from({ length: 20 }).map((_, index) => {
                    const NoteIcon = [MusicNoteIcon, AudiotrackIcon, QueueMusicIcon][index % 3];
                    const size = Math.random() * 48 + 24; // 24px ile 72px arasında rastgele boyut
                    const top = Math.random() * 100; // 0% ile 100% arasında rastgele konum
                    const left = Math.random() * 100; // 0% ile 100% arasında rastgele konum
                    const delay = Math.random() * 5; // 0s ile 5s arasında rastgele gecikme
                    const color = colors[Math.floor(Math.random() * colors.length)]; // Rastgele renk seçimi
                    return (
                        <NoteIcon
                            key={index}
                            className="note"
                            style={{ fontSize: size, top: `${top}%`, left: `${left}%`, animationDelay: `${delay}s`, color: color }}
                        />
                    );
                })}
            </div>
        </div>
    );
};

export default Tasks;
