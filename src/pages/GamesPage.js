import React, { useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Box, Button, Typography } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import * as XLSX from 'xlsx';
import '../styles/GamesPage.css';

const GamesPage = () => {
    const [selectedRows, setSelectedRows] = useState([]);

    const columns = [
        { field: 'id', headerName: 'Game ID', width: 100 },
        { field: 'username', headerName: 'Username', width: 200 },
        { field: 'gameTime', headerName: 'Game Time', width: 200 },
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
        { id: 1, username: 'player1', gameTime: '2024-07-31 15:30' },
        { id: 2, username: 'player2', gameTime: '2024-07-31 16:00' },
        { id: 3, username: 'player3', gameTime: '2024-07-31 16:30' },
        // Daha fazla oyun verisi ekleyebilirsiniz
    ];

    const handleSelectionChange = (newSelection) => {
        setSelectedRows(newSelection);
    };

    const exportData = () => {
        const wb = XLSX.utils.book_new();
        const ws = XLSX.utils.json_to_sheet(rows);
        XLSX.utils.book_append_sheet(wb, ws, 'Games');
        XLSX.writeFile(wb, 'games.xlsx');
    };

    return (
        <Box sx={{ width: '100%', mt: 0, backgroundColor: 'white', padding: 3, borderRadius: 1 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h4" component="h2" sx={{ color: 'orange' }}>
                    Games
                </Typography>
                <Box>
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

export default GamesPage;
