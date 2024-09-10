import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Box, List, ListItemButton, ListItemText, Typography, Container, Paper, Button } from '@mui/material';

const Admin = () => {
    const [users] = useState([
        { username: 'user1', score: 100 },
        { username: 'user2', score: 200 },
        { username: 'user3', score: 150 },
        { username: 'user4', score: 250 },
        { username: 'user5', score: 300 },
    ]);

    const [tasks] = useState([
        "Task 1: Complete profile",
        "Task 2: Play a game",
        "Task 3: Invite friends",
        "Task 4: Win a match",
        "Task 5: test tasks",
    ]);

    const [games] = useState([
        { gameId: 1, username: 'player1', gameTime: '2024-07-31 15:30' },
        { gameId: 2, username: 'player2', gameTime: '2024-07-31 16:00' },
        { gameId: 3, username: 'player3', gameTime: '2024-07-31 16:30' },
        { gameId: 4, username: 'player4', gameTime: '2024-07-31 17:00' },
        { gameId: 5, username: 'player5', gameTime: '2024-07-31 17:30' },
    ]);

    return (
        <Container sx={{ mt: 0 }}>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
                <Paper sx={{ flex: '1 1 calc(50% - 16px)', padding: 2, backgroundColor: 'whitesmoke', borderRadius: 1 }}>
                    <Typography variant="h5" component="h3" gutterBottom sx={{ color: '#6200ea', mb: 2 }}>
                        Recent Users
                    </Typography>
                    <List>
                        {users.slice(0, 5).map((user, index) => (
                            <ListItemButton key={index} sx={{ backgroundColor: 'white', mb: 1, borderRadius: 1 }}>
                                <ListItemText primary={`${user.username} - ${user.score}`} sx={{ color: '#333' }} />
                            </ListItemButton>
                        ))}
                    </List>
                    <Button variant="contained" color="primary" fullWidth component={Link} to="/admin/users" sx={{ backgroundColor: '#6200ea' }}>
                        View All Users
                    </Button>
                </Paper>
                <Paper sx={{ flex: '1 1 calc(50% - 16px)', padding: 2, backgroundColor: 'whitesmoke', borderRadius: 1 }}>
                    <Typography variant="h5" component="h3" gutterBottom sx={{ color: '#6200ea', mb: 2 }}>
                        System Tasks
                    </Typography>
                    <List>
                        {tasks.map((task, index) => (
                            <ListItemButton key={index} sx={{ backgroundColor: 'white', mb: 1, borderRadius: 1 }}>
                                <ListItemText primary={task} sx={{ color: '#333' }} />
                            </ListItemButton>
                        ))}
                    </List>
                    <Button variant="contained" color="primary" fullWidth component={Link} to="/admin/tasks" sx={{ backgroundColor: '#6200ea' }}>
                        View All Tasks
                    </Button>
                </Paper>
                <Paper sx={{ flex: '1 1 calc(50% - 16px)', padding: 2, backgroundColor: 'whitesmoke', borderRadius: 1 }}>
                    <Typography variant="h5" component="h3" gutterBottom sx={{ color: '#6200ea', mb: 2 }}>
                        Recent Games
                    </Typography>
                    <List>
                        {games.slice(0, 5).map((game, index) => (
                            <ListItemButton key={index} sx={{ backgroundColor: 'white', mb: 1, borderRadius: 1 }}>
                                <ListItemText primary={`Game ID: ${game.gameId}, Player: ${game.username}, Time: ${game.gameTime}`} sx={{ color: '#333' }} />
                            </ListItemButton>
                        ))}
                    </List>
                    <Button variant="contained" color="primary" fullWidth component={Link} to="/admin/games" sx={{ backgroundColor: '#6200ea' }}>
                        View All Games
                    </Button>
                </Paper>
            </Box>
        </Container>
    );
};

export default Admin;
