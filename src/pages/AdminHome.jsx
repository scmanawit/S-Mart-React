import Box from "@mui/material/Box";
import AdminHeader from "../components/AdminNavbar";
import {Toolbar} from "@mui/material";
import VerifyShops from "../components/VerifyShop";
import { Outlet } from "react-router-dom";


export default function AdminHome() {
    return (
        <Box component='div'>
            <AdminHeader />
            <Toolbar/>
            <Outlet/>
        </Box>
    )
}
