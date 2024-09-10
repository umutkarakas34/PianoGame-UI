import React, { useState } from 'react';
import { Box, Button, TextField, Typography, InputLabel } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import '../styles/CreateTask.css';

const CreateTask = () => {
    const [taskTitle, setTaskTitle] = useState('');
    const [taskDescription, setTaskDescription] = useState('');
    const [taskLink, setTaskLink] = useState('');
    const [taskImage, setTaskImage] = useState(null);
    const navigate = useNavigate();

    const handleCreateTask = () => {
        // Task oluşturma işlemi burada gerçekleştirilecek
        console.log('Task created:', {
            taskTitle,
            taskDescription,
            taskLink,
            taskImage,
        });
        navigate('/admin/tasks'); // Task oluşturulduktan sonra tasks sayfasına yönlendirme
    };

    const handleImageUpload = (event) => {
        setTaskImage(event.target.files[0]);
    };

    return (
        <Box className="create-task-container">
            <Typography variant="h4" component="h2" className="create-task-title">
                Create Task
            </Typography>
            <TextField
                label="Task Title"
                variant="outlined"
                fullWidth
                value={taskTitle}
                onChange={(e) => setTaskTitle(e.target.value)}
                className="create-task-input"
                sx={{ margin: '25px 0px' }}
            />
            <TextField
                label="Task Description"
                variant="outlined"
                fullWidth
                multiline
                rows={4}
                value={taskDescription}
                onChange={(e) => setTaskDescription(e.target.value)}
                className="create-task-input"
                sx={{ margin: '25px 0px' }}
            />
            <TextField
                label="Task Link"
                variant="outlined"
                fullWidth
                value={taskLink}
                onChange={(e) => setTaskLink(e.target.value)}
                className="create-task-input"
                sx={{ margin: '25px 0px' }}
            />
            <Box className="upload-area">
                <InputLabel shrink className="upload-label"
                    sx={{ fontSize: '24px' }}>
                    Upload Image:
                </InputLabel>
                <Button
                    variant="contained"
                    component="label"
                    className="upload-button"
                >
                    Upload
                    <input
                        type="file"
                        hidden
                        accept="image/*"
                        id="task-image-upload"
                        onChange={handleImageUpload}
                    />
                </Button>
                {taskImage && <Typography className="uploaded-image-name" sx={{ marginLeft: '4%' }}>{taskImage.name}</Typography>}
            </Box>
            <Box className="create-task-input">
                <Button variant="contained" className="create-task-button" onClick={handleCreateTask}>
                    Create Task
                </Button>
            </Box>
        </Box>
    );
};

export default CreateTask;
