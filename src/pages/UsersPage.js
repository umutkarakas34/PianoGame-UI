import React, { useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Box, Button, Typography, Grid } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import * as XLSX from 'xlsx';

const UsersPage = () => {
    const [selectedRows, setSelectedRows] = useState([]);

    const columns = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'name', headerName: 'Name', width: 200 },
        { field: 'email', headerName: 'Email', width: 250 },
        {
            field: 'actions',
            headerName: 'Actions',
            width: 150,
            renderCell: (params) => (
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
                    <EditIcon sx={{ color: 'primary', cursor: 'pointer', marginRight: 2, marginTop: 1.5 }} />
                    <DeleteIcon sx={{ color: '#ff4081', cursor: 'pointer', marginTop: 1.5 }} />
                </Box>
            ),
        },
    ];

    const rows = [
        { id: 1, name: 'Leilani Sharpe', email: 'hyzeqo@mailinator.com' },
        { id: 2, name: 'Lacey Bryant', email: 'sozopal@mailinator.net' },
        { id: 3, name: 'Duncan Horne', email: 'winope@mailinator.net' },
        { id: 4, name: 'Lucas Dillon', email: 'soki@mailinator.net' },
        { id: 5, name: 'Salvador Osborn', email: 'nesasyme@mailinator.net' },
        { id: 6, name: 'Leilani Sharpe', email: 'hyzeqo@mailinator.com' },
        { id: 7, name: 'Lacey Bryant', email: 'sozopal@mailinator.net' },
        { id: 8, name: 'Duncan Horne', email: 'winope@mailinator.net' },
        { id: 9, name: 'Lucas Dillon', email: 'soki@mailinator.net' },
        { id: 10, name: 'Salvador Osborn', email: 'nesasyme@mailinator.net' },
    ];

    const handleSelectionChange = (newSelection) => {
        setSelectedRows(newSelection);
    };

    const exportData = () => {
        const wb = XLSX.utils.book_new();
        const ws = XLSX.utils.json_to_sheet(rows);
        XLSX.utils.book_append_sheet(wb, ws, 'Users');
        XLSX.writeFile(wb, 'users.xlsx');
    };

    return (
        <Box sx={{ width: '100%', mt: 0, backgroundColor: 'white', padding: 3, borderRadius: 1 }}>
            <Grid container justifyContent="space-between" alignItems="center">
                <Grid item>
                    <Typography variant="h4" component="h2" sx={{ color: 'orange', mb: 2 }}>
                        Users
                    </Typography>
                </Grid>
                <Grid item>
                    <Button variant="contained" color="primary" onClick={exportData} sx={{ backgroundColor: 'blue', mb: 2 }}>
                        Export
                    </Button>
                </Grid>
            </Grid>
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
        </Box >
    );
};

export default UsersPage;
