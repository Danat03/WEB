import React from 'react';
import {Box, Typography, IconButton, useTheme, Divider} from '@mui/material';
import PeopleIcon from '@mui/icons-material/People';  // Example icon for future functionality

export function ChatHeader({ title, onOpenUsers }) {
    const theme = useTheme();
    return (
        <Box sx={{ background: theme.palette.background["default_back"], display: 'flex', alignItems: 'center', justifyContent: 'space-between', p: 1, cursor: "pointer", borderLeft: 1, borderColor: theme.palette.background.paper }} onClick={onOpenUsers}>
            <Typography variant="h4" >{title}</Typography>
            {/* Example Button, you can add more or change it later */}
            <IconButton color="primary">
                <PeopleIcon />
            </IconButton>
        </Box>
    );
}

export default ChatHeader;