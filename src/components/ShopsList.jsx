import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Button } from "@mui/material";
import { useContext, useState } from "react";
import ProductsList from './ProductsList';
import ShopContext from '../context/ShopContext';

export default function ShopsList() {
    const { setSelectedShop, shops, setOpenProductForm } = useContext(ShopContext);

    const [expanded, setExpanded] = useState(false);

    const handleChange = (shop) => (event, isExpanded) => {
        setExpanded(isExpanded ? shop._id : false)
        setSelectedShop(shop)
    };

    const handleOpen = (shop) => {
        setSelectedShop(shop)
        setOpenProductForm(true)
    };

    const accordion = () => {
        return shops.map(shop => {
            return (
                <Accordion key={shop._id} expanded={expanded === shop._id} onChange={handleChange(shop)}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1bh-content"
                        id="panel1bh-header"
                    >
                        <Typography sx={{ width: '33%', flexShrink: 0 }}>
                            {shop.shopName}
                        </Typography>
                        <Typography sx={{ color: 'text.secondary' }}>{shop.description}</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Button onClick={() => (handleOpen(shop))}>Add product to Shop</Button>
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