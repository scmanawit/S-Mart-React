import Header from "../components/Header.jsx";
import Box from "@mui/material/Box";
import Logo from "../components/Logo.jsx";
import Footer from "../components/Footer.jsx";
import * as React from "react";
import {Outlet} from "react-router-dom";
import {Toolbar} from "@mui/material";

export default function LayoutAuth() {
    return (
        <Box component='div'>
            <Header/>
            <Toolbar />
            <Box component='div' sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: {
                    xs: 'column',
                    lg: 'row'
                },
                p: {
                    xs: '0px 20px 100px',
                    lg: '20px'
                }
            }}>
                <Logo width='50vw' sx={{pt: {lg: '100px'}}}/>
                <Outlet/>
            </Box>
            <Footer/>
        </Box>
    )
}