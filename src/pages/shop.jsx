import { Box, Button, Modal, Toolbar, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import CreateShopForm from "../components/form/CreateShopForm";
import { useOutletContext } from "react-router-dom";
import { getMyShops } from "../services/shopService.js";
import ShopsList from "../components/ShopsList.jsx";
import ShopContext from "../context/ShopContext";
import CreateProductForm from "../components/form/CreateProductForm";
import { getProductCategories } from "../services/productService";
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

    const [openShopForm, setOpenShopForm] = useState(false);
    const [openProductForm, setOpenProductForm] = useState(false);

    const [shops, setShops] = useState([]);
    const [categories, setCategories] = useState([]);
    const context = useOutletContext()
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [selectedShop, setSelectedShop] = useState(null);


    useEffect(() => {
        getMyShops()
            .then(shops => {
                setShops(shops)
            })
        
        getProductCategories()
            .then(categories => {
                setCategories(categories)
            })
            
    }, [])

    const closeModal = (data) => {
        if (data?.created) {
            getMyShops()
                .then(shops => {
                    setShops(shops)
                })
        }
        setSelectedShop(null)
        setOpenShopForm(false)
    }

    const getShops = () => {
        getMyShops()
            .then(shops => {
                setShops(shops)
            })
    }

    const handleClose = () => {
        setSelectedProduct(null)
        setOpenProductForm(false)
    };

    return (
        <ShopContext.Provider value={{
            shops,
            getShops,
            selectedShop,
            setSelectedProduct,
            selectedProduct,
            setSelectedShop,
            openShopForm,
            setOpenProductForm: () => (setOpenProductForm(true)),
            openProductForm,
            setOpenShopForm: () => (setOpenShopForm(true)),
            categories
        }}>
            <Box component='div' sx={{ ...context.sx }}>
                <Toolbar />
                <Button onClick={() => setOpenShopForm(true)}>Create Your Own Shop</Button>
                <Box component='div' sx={{ padding: '20px' }}>
                    <ShopsList shops={shops} />
                </Box>
            </Box>

            <CreateShopForm open={openShopForm} handleClose={closeModal} />
            <CreateProductForm open={openProductForm} handleClose={handleClose} />
        </ShopContext.Provider>
    )
}