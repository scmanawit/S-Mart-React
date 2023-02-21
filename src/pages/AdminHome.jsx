import Box from "@mui/material/Box";
import AdminHeader from "../components/AdminNavbar";
import UserList from "../components/UserList";
import {Toolbar} from "@mui/material";


export default function AdminHome() {
    return (
        <Box component='div'>
            <AdminHeader />
            <Toolbar/>
            <UserList/>

        </Box>
    )
}
