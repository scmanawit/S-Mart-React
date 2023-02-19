import {ReactElement} from 'react'
import {Toolbar, IconButton, Typography, AppBar, Container} from '@mui/material'
import {Menu as MenuIcon} from '@mui/icons-material'
import Logo from "./Logo";

export default function SubHeader(props) {
    return (
        <AppBar
            elevation={0}
            position='static'
            sx={{
                width: `100%`,
                height: '40px',
                background: theme => theme.palette.primary.dark
            }}
        >
            categories here
        </AppBar>
    )
}
