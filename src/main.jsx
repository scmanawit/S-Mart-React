import React from 'react'
import ReactDOM from 'react-dom/client'
import {RouterProvider} from "react-router-dom"
import {CssBaseline, ThemeProvider} from '@mui/material'

import router from "./routes.jsx"
import theme from "./theme.js"

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <ThemeProvider theme={theme}>
            <CssBaseline/>
            <RouterProvider router={router}/>
        </ThemeProvider>
    </React.StrictMode>,
)
