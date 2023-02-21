import {Box, Button, Modal, Toolbar, Typography} from "@mui/material";
import {useEffect, useState} from "react";
import CreateShopForm from "../components/form/CreateShopForm";
import {useOutletContext} from "react-router-dom";
import {getMyShops} from "../services/shopService.js";
import ShopsList from "../components/ShopsList.jsx";
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};
export default function Shop() {

    const [open, setOpen] = useState(false);
    const [shops, setShops] = useState([]);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const context = useOutletContext()

    useEffect(() => {
        getMyShops()
            .then(shops => {
                console.log('DEBUG: shops', shops)
                setShops(shops)
            })
    }, [])

    const closeModal = (data) => {
        if (data?.created) {
            getMyShops()
                .then(shops => {
                    console.log('DEBUG: shops', shops)
                    setShops(shops)
                })
        }
        handleClose()
    }

    return (
        <Box component='div' sx={{...context.sx}}>
            <Toolbar />
            <Button onClick={handleOpen}>Create Your Own Shop</Button>
            <CreateShopForm open={open} handleClose={closeModal} />
            <Box component='div' sx={{padding: '20px'}}>
                <ShopsList shops={shops} />
            </Box>
        </Box>
    )
}