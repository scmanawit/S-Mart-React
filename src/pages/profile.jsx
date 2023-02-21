import UpdateProfileForm from "../components/form/UpdateProfileForm";
import {Box, Toolbar} from "@mui/material";
import {useOutletContext} from "react-router-dom";

export default function Profile() {
    const context = useOutletContext()

    return (
        <Box component='div' sx={{...context.sx}}>
            <Toolbar />
            <UpdateProfileForm />
        </Box>
    )
}