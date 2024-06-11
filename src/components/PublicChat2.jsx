// import {
//     Box,
//     CssBaseline,
//     Grid,
//     IconButton,
//     InputAdornment,
//     List,
//     ListItem,
//     ListItemText,
//     Paper,
//     TextField
// } from "@mui/material";
// import ChatHeader from "./ChatHeader";
// import SendIcon from "@mui/icons-material/Send";
// import {useNavigate} from "react-router-dom";
// import {useEffect, useRef, useState} from "react";
// import axios from "axios";
//
// function PublicChat2() {
//     const navigate = useNavigate();
//     const [messages, setMessages] = useState([]);
//     const [message, setMessage] = useState("");
//     const [chat_token, set_chat_token] = useState(null);
//     const websocket = useRef(null);
//     const [isLoading, setIsLoading] = useState(false);
//     const listRef = useRef(null);
//     const [loadIndex, setLoadIndex] = useState(-20);
//
//     useEffect(() => {
//         const handleEscapeKey = (event) => {
//           if (event.key === 'Escape') {
//             navigate(-1);
//           }
//         };
//         window.addEventListener('keydown', handleEscapeKey);
//
//         return () => {
//           window.removeEventListener('keydown', handleEscapeKey);
//         };
//       }, [navigate]);
//
//     useEffect(() => {
//         const fetchToken = async () => {
//             try {
//                 const response = await axios.get('http://localhost:8000/messages/request-chat-token', {
//                     withCredentials: true
//                 });
//                 set_chat_token(response.data.chat_token);
//             } catch (error) {
//                 console.error('Failed to fetch chat token:', error);
//             }
//         };
//
//         fetchToken();
//     }, []);
//
//     useEffect(() => {
//         if (chat_token) {
//             websocket.current = new WebSocket(`ws://localhost:8000/messages/ws?chat_token=${chat_token}`);
//             websocket.current.onmessage = event => {
//                 const data = JSON.parse(event.data);
//                 if (data.type === "initial_load" || data.type === "more_messages") {
//                     setMessages(prevMessages => [...data.messages, ...prevMessages]);
//                 }
//             };
//             return () => {
//                 if (websocket.current) {
//                     websocket.current.close();
//                 }
//             };
//         }
//     }, [chat_token]);
//
//     const handleScroll = () => {
//         if (isLoading) return;
//         const target = listRef.current;
//         const scrolledPercentage = (target.scrollTop / (target.scrollHeight - target.clientHeight)) * 100;
//
//         if (scrolledPercentage < 30 && messages.length > 0) {  // 100% - 70% = 30% from the top
//             setIsLoading(true);
//             const nextLoadIndex = loadIndex - 20;
//             websocket.current.send(JSON.stringify({
//                 action: "load_more_messages",
//                 start: nextLoadIndex,
//                 count: 20
//             }));
//             setLoadIndex(nextLoadIndex);
//             setTimeout(() => setIsLoading(false), 1000);
//         }
//     };
//
//
// return (
//         <Box sx={{ display: "flex", height: "100vh", width: "100%" }}>
//             <CssBaseline />
//             <Grid container sx={{ height: '100%' }}>
//                 <Grid item xs={12} sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
//                     <ChatHeader title="Public Chat" />
//                     <Paper elevation={3} sx={{
//                         flexGrow: 1,
//                         overflowY: 'auto',
//                         minHeight: 0,
//                         p: 2,
//                         display: 'flex',
//                         flexDirection: 'column',
//                     }}  onScroll={handleScroll} ref={listRef}>
//                         <List sx={{ width: '100%' }}>
//                             {messages.map((msg, index) => (
//                                 <ListItem key={index}>
//                                     <ListItemText primary={`${msg.username}: ${msg.content}`}
//                                                   secondary={new Date(msg.created_at).toLocaleString()}
//                                     />
//                                 </ListItem>
//                             ))}
//                         </List>
//                     </Paper>
//                     <Box sx={{ display: 'flex', alignItems: 'center', borderLeft: 1}}>
//                         <TextField
//                             fullWidth
//                             value={message}
//                             onChange={(e) => setMessage(e.target.value)}
//                             autoComplete="off"
//                             InputProps={{
//                                 style: { height: '50px', padding: "10px" },
//                                 endAdornment: (
//                                     <InputAdornment position="end">
//                                         <IconButton color="primary">
//                                             <SendIcon />
//                                         </IconButton>
//                                     </InputAdornment>
//                                 )}}
//                             variant="standard"
//                             placeholder="Write a message..."
//                             onKeyDown={(e) => e.key === "Enter"}
//                         />
//                     </Box>
//                 </Grid>
//             </Grid>
//         </Box>
//     );
// }
//
// export default PublicChat2;