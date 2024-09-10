import React, { useState } from 'react';
import { TextField, Button, Box } from '@mui/material';
import '../styles/TaskForm.css'; // CSS dosyasını ekleyin

const TaskForm = ({ addTask }) => {
    const [task, setTask] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        addTask(task);
        setTask('');
    };

    return (
        <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', gap: 2 }}>
            <TextField
                label="New Task"
                variant="outlined"
                value={task}
                onChange={(e) => setTask(e.target.value)}
                fullWidth
            />
            <Button type="submit" variant="contained" color="primary">
                Add Task
            </Button>
        </Box>
    );
};

export default TaskForm;
