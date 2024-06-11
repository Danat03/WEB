import React, { useState } from "react";
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
import { styled } from "@mui/material/styles";
import {useNavigate, Link} from "react-router-dom";
import axios from "axios";

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

function RegistrationForm() {
    const theme = useTheme();
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [usernameError, setUsernameError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [registrationError, setRegistrationError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();

        let valid = true;
        setRegistrationError("");
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
            await axios.post("http://localhost:8000/user", {
                username,
                password,
            });
            navigate("/login");
        } catch (error) {
            setRegistrationError("Registration failed, please try again.");
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
                            <CircularProgress size={60} sx={{ color: 'primary.progress' }} />
                        </Box>
                    )}
                    <Typography variant="h4" component="h1" gutterBottom>
                        Создать аккаунт
                    </Typography>
                    {registrationError && <Alert variant="outlined" severity="error"
                        sx={{ borderColor: "transparent" }}>{registrationError}</Alert>}
                    <TextField
                        error={usernameError}
                        helperText={usernameError ? "Required field." : ""}
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
                        helperText={passwordError ? "Required field." : ""}
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
                        Имеется аккаунт? <Link to="/auth">Войти в аккаунт</Link>
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
                        Регистрация
                    </Button>
                </StyledForm>
            </Container>
        </Box>
    );
}

export default RegistrationForm;
