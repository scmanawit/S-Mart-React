import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Box, Button, IconButton } from "@mui/material";
import { useContext, useState } from "react";
import ProductsList from './ProductsList';
import ShopContext from '../context/ShopContext';
import { Verified, Warning } from '@mui/icons-material';
import { activateShop, deleteShop } from '../services/shopService';
import Swal from 'sweetalert2';

export default function ShopsList() {
    const { setSelectedShop, shops, setOpenProductForm, setOpenShopForm, getShops, setSelectedProduct } = useContext(ShopContext);

    const [expanded, setExpanded] = useState(false);

    const handleChange = (shop) => (event, isExpanded) => {
        setExpanded(isExpanded ? shop._id : false)
        setSelectedShop(shop)
    };

    const handleOpen = (shop) => {
        setSelectedShop(shop)
        setSelectedProduct('')
        setOpenProductForm(true)
    };

    const updateShop = (shop) => {
        setSelectedShop(shop)
        setOpenShopForm(true)
    }

    const toggleActivate = async (shop) => {
        try {
            if (shop.deletedAt) {
                await activateShop(shop._id)
            } else {
                await deleteShop(shop._id)
            }

            await Swal.fire({
                title: "Shop Successfully Updated!",
                icon: "success"
            })
        } catch (e) {
            await Swal.fire({
                title: 'Error!',
                text: e.message,
                icon: 'error',
            })
        }

        await getShops()
    }

    const accordion = () => {
        return shops.map(shop => {
            return (
                <Accordion key={shop._id} expanded={expanded === shop._id} onChange={handleChange(shop)}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1bh-content"
                        id="panel1bh-header"
                    >
                        <Box component='div' sx={{
                            display: {
                                xs: 'block',
                                md: 'flex'
                            },
                            justifyContent: 'space-between',
                            width: '100%'
                        }}>
                            <Typography sx={{ lineHeight: '50px' }}>
                                {shop.shopName}
                            </Typography>
                            <Typography sx={{ color: 'text.secondary', lineHeight: '50px' }}>{shop.description}</Typography>
                            <IconButton
                                size="large"
                                color={shop.verifiedAt ? 'primary' : 'error'}
                            >
                                {shop.verifiedAt ? <Verified /> : <Warning />}
                            </IconButton>
                        </Box>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Button onClick={() => (handleOpen(shop))}>Add product to Shop</Button>
                        {shop.verifiedAt ? <Button color='secondary' onClick={() => (updateShop(shop))}>Update Shop</Button> : <></>}
                        <Button color='error' onClick={() => (toggleActivate(shop))}> {shop.deletedAt ? 'Activate' : 'Deactivate'} shop</Button>
                        <ProductsList products={shop.products} />
                    </AccordionDetails>
                </Accordion>
            )
        })
    }

    return (
        <div>
            {accordion()}
        </div>
    );
}