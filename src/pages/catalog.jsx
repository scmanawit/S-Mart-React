import { Box, Toolbar } from "@mui/material";
import { useOutletContext } from "react-router-dom";
import Carousel from "../components/Carousel";

export default function Catalog() {
    const context = useOutletContext()
    return (
        <Box component='div' sx={{ ...context.sx }}>
            <Toolbar />
            <Carousel />
        </Box>
    )
}