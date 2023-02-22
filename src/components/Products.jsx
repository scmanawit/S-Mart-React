import * as React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import {useContext} from "react";
import CatalogContext from "../context/CatalogContext.jsx";
import {Box, Tooltip, Typography, useMediaQuery} from "@mui/material";
import theme from "../theme.js";
import {ShoppingBag} from "@mui/icons-material";
import IconButton from "@mui/material/IconButton";
import {addToCart} from "../services/orderService.js";
import Swal from "sweetalert2";
import {useOutletContext} from "react-router-dom";

export default function Products() {
    const { products, setOpenViewProductModal, setSelectedProduct } = useContext(CatalogContext)
    const { setCart } = useOutletContext()

    const matchXs = useMediaQuery(theme.breakpoints.down('xs'));
    const matchSm = useMediaQuery(theme.breakpoints.down('sm'));
    const matchMd = useMediaQuery(theme.breakpoints.down('md'));
    const matchLg = useMediaQuery(theme.breakpoints.down('lg'));

    const cols = () => {
        if (!matchLg) return 4
        if (!matchMd) return 2
        if (!matchSm) return 2
        if (!matchXs) return 1
    }

    const addProductToCart = async (product) => {
        try {
            const order = await addToCart({productId: product._id})
            console.log('DEBUG: order', order);
            setCart(order)
            await Swal.fire({
                title: "Product Successfully Updated to Cart!",
                icon: "success"
            })
        } catch (e) {
            await Swal.fire({
                title: 'Error!',
                text: e.message,
                icon: 'error',
            })
        }
    }

    const viewProduct = (product) => {
        setOpenViewProductModal(true)
        setSelectedProduct(product)
    }

    return (
        <Box component='div' sx={{ p: '20px', boxShadow: '0 3px 10px rgb(0 0 0 / 0.2)' }}>
            <ImageList cols={cols()} gap={8}>
                {products.map((product) => (
                    <ImageListItem key={product._id}>
                        <img
                            onClick={() => (viewProduct(product))}
                            src={product.image}
                            srcSet={product.image}
                            alt={product.productName}
                            loading="lazy"
                            style={{boxShadow: '0 -3px 10px rgb(0 0 0 / 0.2)', height: '300px'}}
                        />
                        <Box
                            component='div'
                            sx={{
                                p: '5px',
                                display: 'flex',
                                justifyContent: 'space-between',
                                boxShadow: '0 3px 10px rgb(0 0 0 / 0.2)'
                            }}
                        >
                            <div>
                                <Typography color='secondary' variant='subtitle1'>{product.productName}</Typography>
                                <Typography variant='subtitle3'>₱ {product.price}</Typography>
                            </div>
                            <Tooltip title="Add to Cart">
                                <IconButton onClick={() => (addProductToCart(product))} color='primary'>
                                    <ShoppingBag />
                                </IconButton>
                            </Tooltip>
                        </Box>
                    </ImageListItem>
                ))}
            </ImageList>
        </Box>
    );
}
