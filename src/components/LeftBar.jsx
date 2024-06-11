import React, {useContext, useState} from 'react';
import {
  AppBar,
  Toolbar,
  IconButton,
  Button,
  Dialog,
  DialogTitle,
  DialogActions,
  Box,
  Typography,
} from "@mui/material";
import LogoutIcon from '@mui/icons-material/Logout';
import ForumIcon from '@mui/icons-material/Forum';
import { useAuth } from "../AuthContext";
import { AuthContext } from '../AuthContext';
import {useLocation, useNavigate} from "react-router-dom";

const LeftBar = () => {
  const { isAuthenticated } = useAuth();
  const { logout } = useContext(AuthContext);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const isActive = location.pathname === '/public_chat';

  const handlePublicChatClick = () => {
    navigate("/public_chat");
  };

  const handleLoginClick = () => {
    navigate("/login");
  };

  const handleLogoutClick = () => {
    setOpen(true);
  };

  const handleConfirmLogout = async () => {
    setOpen(false);
    await logout();
  };

  const handleClose = () => {
    setOpen(false);
  };

  if (!isAuthenticated) {
    return null;
  } else {
    return (
      <>
        <AppBar position="fixed">
          <Toolbar sx={{ justifyContent: "space-between" }}>
            <Typography variant="h6">
              Чат
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <IconButton
                color={isActive ? "primary" : "inherit"}
                onClick={handlePublicChatClick}
              >
                <ForumIcon />
              </IconButton>
              <IconButton
                color="inherit"
                onClick={handleLogoutClick}
              >
                <LogoutIcon />
              </IconButton>
            </Box>
          </Toolbar>
        </AppBar>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>{"Вы уверены, что хотите выйти?"}</DialogTitle>
          <DialogActions>
            <Button onClick={handleClose}>Отмена</Button>
            <Button onClick={handleConfirmLogout} color="primary" autoFocus>
              Выйти
            </Button>
          </DialogActions>
        </Dialog>
      </>
    );
  }
};

export default LeftBar;