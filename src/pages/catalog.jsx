import { Box, Toolbar } from "@mui/material";
import ActiveProducts from "./ActiveProducts";

export default function Catalog({sx}) {
    return (
        <Box component='div' sx={{...sx}}>
            <Toolbar />
        </Box>
    )
}