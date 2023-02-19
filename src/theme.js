import { createTheme } from '@mui/material/styles'
import '@fontsource/public-sans/400.css'
import '@fontsource/public-sans/600.css'
import '@fontsource/public-sans/700.css'
import '@fontsource/public-sans/800.css'

const theme = createTheme({
    palette: {
        primary: {
            lighter: '#C8FACD',
            light: '#5BE584',
            main: '#00AB55',
            dark: '#007B55',
            darker: '#005249',
        },
        secondary: {
            lighter: '#D6E4FF',
            light: '#84A9FF',
            main: '#3366FF',
            dark: '#1939B7',
            darker: '#091A7A',
        },
        info: {
            main: '#00B8D9',
        },
        success: {
            main: '#36B37E',
        },
        warning: {
            main: '#FFAB00',
        },
        error: {
            main: '#FF5630',
        },
        common: {
            black: '#000000',
            white: '#FFFFFF',
        },
        grey: {
            600: '#637381',
        },
    },
    typography: {
        fontFamily: 'Public Sans',
        h1: {
            fontSize: '64px',
            lineHeight: '80px',
            fontWeight: 800,
            fontStyle: 'normal',
        },
        h2: {
            fontSize: '48px',
            lineHeight: '64px',
            fontWeight: 800,
            fontStyle: 'normal',
        },
        h3: {
            fontSize: '32px',
            lineHeight: '48px',
            fontWeight: 700,
            fontStyle: 'normal',
        },
        h4: {
            fontSize: '24px',
            lineHeight: '36px',
            fontWeight: 700,
            fontStyle: 'normal',
        },
        h5: {
            fontSize: '20px',
            lineHeight: '30px',
            fontWeight: 700,
            fontStyle: 'normal',
        },
        h6: {
            fontSize: '18px',
            lineHeight: '28px',
            fontWeight: 700,
            fontStyle: 'normal',
        },
        subtitle1: {
            fontSize: '16px',
            lineHeight: '24px',
            fontWeight: 600,
            fontStyle: 'normal',
        },
        subtitle2: {
            fontSize: '14px',
            lineHeight: '22px',
            fontWeight: 600,
            fontStyle: 'normal',
        },
        body1: {
            fontSize: '16px',
            lineHeight: '24px',
            fontWeight: 400,
            fontStyle: 'normal',
        },
        body2: {
            fontSize: '14px',
            lineHeight: '22px',
            fontWeight: 400,
            fontStyle: 'normal',
        },
        caption: {
            fontSize: '12px',
            lineHeight: '18px',
            fontWeight: 400,
            fontStyle: 'normal',
        },
        overline: {
            fontSize: '12px',
            lineHeight: '18px',
            fontWeight: 700,
            fontStyle: 'normal',
        },
    },
    components: {
        MuiAppBar: {
            styleOverrides: {
                root: {
                    height: '70px',
                    backgroundColor: '#00AB55',
                    color: '#FFF',
                },
            },
        },
    },
})

export default theme