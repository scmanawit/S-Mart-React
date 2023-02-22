import { Box, Toolbar } from "@mui/material";
import { useLocation, useOutletContext } from "react-router-dom";
import CustomCarousel from "../components/Carousel";
import Products from "../components/Products";
import {useEffect, useState} from "react";
import {getAllActiveProducts} from "../services/productService.js";
import CatalogContext from "../context/CatalogContext.jsx";
import {getOrderHistory} from "../services/orderService.js";
import ViewProduct from "../components/ViewProduct";

export default function Catalog() {
    const context = useOutletContext()
    const [products, setProducts] = useState([])
    const [selectedProduct, setSelectedProduct] = useState([])
    const [openViewProductModal, setOpenViewProductModal] = useState(false)
    const { search } = useLocation();

    useEffect(() => {
        getProducts().catch(() => null)
    }, [])

    useEffect(() => {
        getProducts(search?.split('=')[1] || null).catch(() => null)
      }, [search]);

    const getProducts = async (category = null) => {
        const p = await getAllActiveProducts(category)
        setProducts(p)
    }

    return (
        <CatalogContext.Provider value={{
            products,
            setProducts,
            getProducts,
            setOpenViewProductModal,
            selectedProduct,
            setSelectedProduct
        }}>
            <Box component='div' sx={{ ...context.sx }}>
                <Toolbar />
                <CustomCarousel />
                <Products />
            </Box>
            <ViewProduct open={openViewProductModal} handleClose={() => setOpenViewProductModal(false)} />
        </CatalogContext.Provider>
    )
}