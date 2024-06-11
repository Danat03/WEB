import {createTheme} from "@mui/material";
import {blue, grey} from "@mui/material/colors";


export const lightTheme = createTheme({
    palette: {
        mode: "light",
        primary: {
            main: grey[50],
        },
        background: {
            default: grey[200],
            paper: grey[100],
            form: grey[200]
        },
        text: {
            primary: grey[900]
        },
    },
    components: {
       MuiInputLabel: {
           styleOverrides: {
               root: {
                   '&.Mui-focused': {
                       color: grey[900],
                   },
               },
           },
       },
    },
});

export const darkTheme = createTheme({
    palette: {
        mode: "dark",
        primary: {
            main: "#18181b", 
            contrastText: "white",
        },
        secondary: {
            main: "#52525b",
        },
        error: {
            main: '#E57373',
        },
        warning: {
            main: '#FFB74D', 
        },
        info: {
            main: blue[600], 
        },
        success: {
            main: '#81C784', 
        },
        background: {
            default: '#09090b', 
            default_paper: '#fafafa',
            default_back: '#09090b',
            paper: "#09090b", 
            form: "#27272a"
        },
        text: {
            primary: grey[50], 
            secondary: grey[400], 
        },
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    textTransform: 'none', 
                    margin: '8px', 
                },
            },
        },
        MuiInputLabel: {
            styleOverrides: {
                root: {
                    color: grey[400], 
                    '&.Mui-focused': {
                        color: blue[500], 
                    },
                },
            },
        },
    },
});