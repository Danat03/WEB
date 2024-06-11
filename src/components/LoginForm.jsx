import React, {useEffect, useState} from "react";
import {
    Box,
    Button,
    Container,
    TextField,
    Typography,
    Alert,
    CircularProgress,
    useTheme,
} from "@mui/material";
import {styled} from "@mui/material/styles"
import {useNavigate, Link} from "react-router-dom";
import {useAuth} from "../AuthContext";

const StyledForm = styled('form')(({ theme }) => ({
  position: 'relative',
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: theme.spacing(2),
  padding: theme.spacing(4),
  background: "transparent",
  width: '100%'
}));


function LoginForm() {
    const theme = useTheme();
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [usernameError, setUsernameError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [loginError, setLoginError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const {login, logout} = useAuth();
    const {isAuthenticated} = useAuth();
    const [isModalOpen, setModalOpen] = useState(false);

    const handleLogout = () => {
        logout();
        setModalOpen(false);
    }

    const handleBack = () => {
        setModalOpen(false);
        navigate(-1);
    }

    useEffect(() => {
        if (isAuthenticated) {
            setModalOpen(true);
        }
    }, [isAuthenticated]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        let valid = true;
        setLoginError("");
        setIsLoading(true);

        if (!username) {
            setUsernameError(true);
            valid = false;
        } else {
            setUsernameError(false);
        }

        if (!password) {
            setPasswordError(true);
            valid = false;
        } else {
            setPasswordError(false);
        }

        if (!valid) {
            setIsLoading(false);
            return;
        }

        try {
            await login(username, password);
            navigate("/public_chat");
        } catch (error) {
            setLoginError("Login attempt failed, please check your credentials.");
        }
        setIsLoading(false);
    };

    
        return (
            <Box display="flex" alignItems="center" justifyContent="center" minHeight="100vh">
                <Container component="main" maxWidth="md">
                    <StyledForm onSubmit={handleSubmit} noValidate>
                        {isLoading && (
                            <Box sx={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                width: '100%',
                                height: '100%',
                                background: 'rgba(0, 0, 0, 0.5)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                borderRadius: theme.shape.borderRadius,
                                zIndex: 9999,
                            }}>
                                <CircularProgress size={60} sx={{color: 'primary.progress'}}/>
                            </Box>
                        )}
                        <Typography variant="h4" component="h1" gutterBottom>
                            Войти в аккаунт
                        </Typography>
                        {loginError && <Alert variant="outlined" severity="error"
                                              sx={{borderColor: "transparent"}}>{loginError}</Alert>}
                        <TextField
                            error={usernameError}
                            helperText={usernameError ? "Обязательное поле." : ""}
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            label="Имя пользователя"
                            autoComplete="off"
                            autoFocus
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        <TextField
                            error={passwordError}
                            helperText={passwordError ? "Обязательное поле." : ""}
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            label="Пароль"
                            autoComplete="off"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <Typography variant="body2" color="textSecondary" align="end">
                            Нет аккаунта? <Link to="/register">Зарегистрироваться</Link>
                        </Typography>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            disabled={isLoading}
                            sx={{
                                backgroundColor: theme.palette.primary.button,
                                '&:hover': {
                                    backgroundColor: theme.palette.primary.dark,
                                },
                            }}
                        >
                            Войти
                        </Button>
                    </StyledForm>
                </Container>
            </Box>
        );
}

export default LoginForm;
