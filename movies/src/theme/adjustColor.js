import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        primary: {
            main: '#b2e9dd',
            light: '#b0dedf',
            dark: '#07a3a2',
            contrastText: '#000',
        },
        secondary: {
            main: '#a90707',
            light: '#f7f7f7',
            dark: '#f7f7f7',
            contrastText: '#000',
        }
    },
});

export default theme;