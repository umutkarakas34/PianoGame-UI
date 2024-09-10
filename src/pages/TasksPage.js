import React, { useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Box, Button, Typography } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from 'react-router-dom';
import * as XLSX from 'xlsx';

const TasksPage = () => {
    const [selectedRows, setSelectedRows] = useState([]);
    const navigate = useNavigate();

    const columns = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'task', headerName: 'Task', width: 200 },
        {
            field: 'actions',
            headerName: 'Actions',
            width: 150,
            renderCell: (params) => (
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
                    <EditIcon sx={{ color: '#2196f3', cursor: 'pointer', marginRight: 2, marginTop: 1.5 }} />
                    <DeleteIcon sx={{ color: '#ff4081', cursor: 'pointer', marginTop: 1.5 }} />
                </Box>
            ),
        },
    ];

    const rows = [
        { id: 1, task: 'Complete profile' },
        { id: 2, task: 'Play a game' },
        { id: 3, task: 'Invite friends' },
        { id: 4, task: 'Win a match' },
        { id: 5, task: 'Win a match' },
        { id: 6, task: 'Win a match' },
        { id: 7, task: 'Win a match' },
        { id: 8, task: 'Win a match' },
        { id: 9, task: 'Win a match' },
        { id: 10, task: 'Win a match' },
    ];

    const handleSelectionChange = (newSelection) => {
        setSelectedRows(newSelection);
    };

    const exportData = () => {
        const wb = XLSX.utils.book_new();
        const ws = XLSX.utils.json_to_sheet(rows);
        XLSX.utils.book_append_sheet(wb, ws, 'Tasks');
        XLSX.writeFile(wb, 'tasks.xlsx');
    };

    return (
        <Box sx={{ width: '100%', mt: 0, backgroundColor: 'white', padding: 3, borderRadius: 1 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h4" component="h2" sx={{ color: 'orange' }}>
                    Tasks
                </Typography>
                <Box>
                    <Button
                        variant="contained"
                        color="primary"
                        startIcon={<AddIcon />}
                        sx={{ backgroundColor: 'green', mr: 2 }}
                        onClick={() => navigate('/admin/create-task')}
                    >
                        Create Task
                    </Button>
                    <Button variant="contained" color="primary" onClick={exportData} sx={{ backgroundColor: 'blue' }}>
                        Export
                    </Button>
                </Box>
            </Box>
            <Box sx={{ backgroundColor: 'whitesmoke', borderRadius: 1, padding: 2 }}>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    pageSize={10}
                    rowsPerPageOptions={[10]}
                    checkboxSelection
                    onSelectionModelChange={handleSelectionChange}
                    sx={{
                        height: 'auto',
                        '& .MuiDataGrid-columnHeaders': {
                            backgroundColor: 'white',
                            color: '#333',
                        },
                        '& .MuiDataGrid-virtualScroller': {
                            backgroundColor: 'white',
                        },
                        '& .MuiDataGrid-cell': {
                            color: '#333',
                        },
                        '& .MuiSvgIcon-root': {
                            color: '#6200ea',
                        },
                    }}
                />
            </Box>
        </Box>
    );
};

export default TasksPage;
