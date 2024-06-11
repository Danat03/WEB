import {
    Box,
    Typography,
    Paper,
    List,
    TextField,
    IconButton,
    ListItemText,
    ListItem,
    Grid, Button, Modal, CssBaseline, useTheme, InputAdornment
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import {useEffect, useRef, useState} from "react";
import ChatHeader from "./ChatHeader";

function PublicChat() {
    const theme = useTheme();
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);
    const websocket = useRef(null);
    const [loadIndex, setLoadIndex] = useState(-20);
    const [users, setUsers] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const listRef = useRef(null);

    useEffect(() => {
            websocket.current = new WebSocket(`ws://localhost:8000/messages/ws`);
            websocket.current.onmessage = event => {
                const data = JSON.parse(event.data);
                if (data.type === "users_list") {
                    setUsers(data.users);
                }
                if (data.type === "system_message" || data.type === "broadcast_message") {
                    setMessages(prevMessages => Array.isArray(data) ? [...data, ...prevMessages] : [...prevMessages, data]);
                }
                if (data.type === "new_message") {
                    setMessages(prevMessages => Array.isArray(data) ? [...data, ...prevMessages] : [...prevMessages, data]);
                    scrollToBottom();
                } else if (data.type === "initial_load" || data.type === "more_messages") {
                    setMessages(prevMessages => [...data.messages, ...prevMessages]);
                    if (data.type === "initial_load") {
                        scrollToBottom();
                    } else {
                        maintainScrollPosition();
                    }
                }
            };
            return () => {
                if (websocket.current) {
                    websocket.current.close();
                }
            };
    }, []);

    const handleScroll = () => {
        if (isLoading) return;
        const nextLoadIndex = loadIndex - 20;
        const target = listRef.current;
        const scrolledPercentage = (target.scrollTop / (target.scrollHeight - target.clientHeight)) * 100;

        if (scrolledPercentage < 30 && messages.length > 0) {
            setIsLoading(true);
            websocket.current.send(JSON.stringify({
                action: "load_more_messages",
                start: nextLoadIndex,
                count: 20
            }));
            setLoadIndex(nextLoadIndex);
            setTimeout(() => setIsLoading(false), 1000);
        }
    };

    const maintainScrollPosition = () => {
        const target = listRef.current;
        const previousHeight = target.scrollHeight;
        const previousScrollTop = target.scrollTop;
        setTimeout(() => {
            const newHeight = target.scrollHeight;
            target.scrollTop = previousScrollTop + (newHeight - previousHeight);
        }, 0);
    };

    const scrollToBottom = () => {
        setTimeout(() => {
            listRef.current.scrollTop = listRef.current.scrollHeight;
        }, 0);
    };

    const handleSendMessage = () => {
        if (message && websocket.current) {
            const msgData = JSON.stringify({ action: "send_message", content: message });
            websocket.current.send(msgData);
            setMessage("");
            }
    };

    const handleOpenUsersModal = () => {
        setOpenModal(true);
    };
    const handleCloseModal = () => {
        setOpenModal(false);
    };
    const modalBody = (
        <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, background: theme.palette.background.default, boxShadow: 24, p: 4 }}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
                Active Users
            </Typography>
            <List>
                {users.map((user, index) => (
                    <ListItem key={index}>
                        <ListItemText primary={user} />
                    </ListItem>
                ))}
            </List>
            <Button onClick={handleCloseModal}>Close</Button>
        </Box>
    );

    return (
        <Box sx={{ display: "flex", height: "100vh", width: "100%" }}>
            <CssBaseline />
            <Grid container sx={{ height: '100%' }}>
                <Grid item xs={12} sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                    <ChatHeader title="Public Chat" onOpenUsers={handleOpenUsersModal} />
                    <Paper elevation={3} sx={{
                        flexGrow: 1,
                        overflowY: 'auto',
                        minHeight: 0,
                        p: 2,
                        background: theme.palette.background.paper,
                        display: 'flex',
                        flexDirection: 'column',
                    }} onScroll={handleScroll} ref={listRef}>
                        <List sx={{ width: '100%' }}>
                            {messages.map((msg, index) => (
                                <ListItem key={index}>
                                    <ListItemText primary={`${msg.username}: ${msg.content}`}
                                                  secondary={new Date(msg.created_at).toLocaleString()}
                                    />
                                </ListItem>
                            ))}
                        </List>
                    </Paper>
                    <Box sx={{ display: 'flex', alignItems: 'center', borderLeft: 1, borderColor: theme.palette.background.paper}}>
                        <TextField
                            fullWidth
                            autoComplete="off"
                            InputProps={{
                                style: { height: '50px', padding: "10px" },
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton onClick={handleSendMessage} color="primary">
                                            <SendIcon />
                                        </IconButton>
                                    </InputAdornment>
                                )}}
                            variant="standard"
                            placeholder="Введите сообщение..."
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                        />
                    </Box>
                    <Modal
                        open={openModal}
                        onClose={handleCloseModal}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        {modalBody}
                    </Modal>
                </Grid>
            </Grid>
        </Box>
    );
}

export default PublicChat;