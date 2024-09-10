import React from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Drawer, List, ListItem, ListItemText, ListItemIcon, Divider, Box } from '@mui/material';
import AssignmentIcon from '@mui/icons-material/Assignment';
import PeopleIcon from '@mui/icons-material/People';
import HomeIcon from '@mui/icons-material/Home';
import GameIcon from '@mui/icons-material/SportsEsports';
import '../styles/AdminLayout.css';

const drawerWidth = 240;

const AdminLayout = ({ children }) => (
    <div style={{ display: 'flex' }}>
        <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, backgroundColor: '#333' }}>
            <Toolbar>
                <Typography variant="h6" noWrap component="div">
                    Admin Panel
                </Typography>
            </Toolbar>
        </AppBar>
        <Drawer
            variant="permanent"
            sx={{
                width: drawerWidth,
                flexShrink: 0,
                [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box', backgroundColor: '#1a1a1a', color: 'white' },
            }}
        >
            <Toolbar />
            <Divider />
            <List>
                <ListItem button component={Link} to="/admin/home">
                    <ListItemIcon><HomeIcon sx={{ color: 'white' }} /></ListItemIcon>
                    <ListItemText primary="Home" />
                </ListItem>
                <ListItem button component={Link} to="/admin/tasks">
                    <ListItemIcon><AssignmentIcon sx={{ color: 'white' }} /></ListItemIcon>
                    <ListItemText primary="Tasks" />
                </ListItem>
                <ListItem button component={Link} to="/admin/users">
                    <ListItemIcon><PeopleIcon sx={{ color: 'white' }} /></ListItemIcon>
                    <ListItemText primary="Users" />
                </ListItem>
                <ListItem button component={Link} to="/admin/games">
                    <ListItemIcon><GameIcon sx={{ color: 'white' }} /></ListItemIcon>
                    <ListItemText primary="Games" />
                </ListItem>
            </List>
        </Drawer>
        <Box component="main" sx={{ flexGrow: 1, padding: 3, backgroundColor: '#f5f5f5', minHeight: '100vh', color: '#333', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Toolbar />
            {children}
        </Box>
    </div>
);

export default AdminLayout;
