import Box from "@mui/material/Box";
import AdminHeader from "../components/AdminNavbar";
import {Toolbar} from "@mui/material";
import VerifyShops from "../components/VerifyShop";


export default function AdminHome() {
    return (
        <Box component='div'>
            <AdminHeader />
            <Toolbar/>
            <VerifyShops/>
        </Box>
    )
}
