import {
    Avatar,
    Box, Button,
    Card,
    CardActions,
    CardContent,
    CardHeader,
    CardMedia, Collapse,
    IconButton,
    Modal, styled,
    Typography
} from "@mui/material";
import {useContext, useEffect, useState} from "react";
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import AccountCircle from "@mui/icons-material/AccountCircle";
import CatalogContext from "../context/CatalogContext.jsx";
import {getShop} from "../services/shopService.js";
import {AddCircle, RemoveCircle} from "@mui/icons-material";
import {addToCart} from "../services/orderService.js";
import Swal from "sweetalert2";
import {useOutletContext} from "react-router-dom";

export default function ViewProduct({open, handleClose}) {
    const {selectedProduct, setSelectedProduct, setOpenViewProductModal} = useContext(CatalogContext)
    const { setCart } = useOutletContext()

    const [shop, setShop] = useState(null)
    const [quantity, setQuantity] = useState(1)

    const closeProductView = () => {
        setSelectedProduct(null)
        handleClose()
    }

    useEffect(() => {
        if (selectedProduct?.shop) {
            getShop(selectedProduct?.shop?._id)
                .then(response => (setShop(response)))
                .catch(() => null)
            setQuantity(1)
        }
    }, [selectedProduct])

    const updateQuantity = (isAdd) => {
        let currentQuantity = quantity
        if (isAdd) {
            setQuantity(++currentQuantity)
            return
        }

        if (quantity > 1) {
            setQuantity(--currentQuantity)
        }
    }

    const addProductToCart = async (product) => {
        try {
            const order = await addToCart({productId: product._id, quantity})
            console.log('DEBUG: order', order);
            setCart(order)
            setOpenViewProductModal(false)
            await Swal.fire({
                title: "Product Successfully Updated to Cart!",
                icon: "success"
            })
        } catch (e) {
            setOpenViewProductModal(false)
            await Swal.fire({
                title: 'Error!',
                text: e.message,
                icon: 'error',
            })
        }
    }

    return (
        <Modal
            open={open}
            onClose={closeProductView}
            sx={{width: '350px', margin: 'auto', mt: '100px'}}
        >
            <Box component='div'>
                <Card sx={{ width: '100%' }}>
                    <CardHeader
                        avatar={
                            <IconButton
                                size="large"
                                edge="end"
                                aria-label="account of current user"
                                aria-haspopup="true"
                                color="inherit"
                            >
                                <AccountCircle/>
                            </IconButton>
                        }
                        title={shop?.shopName}
                    />
                    <CardMedia
                        component="img"
                        height="194"
                        image={selectedProduct?.image}
                        alt="Paella dish"
                    />
                    <CardContent>
                        <Typography variant="body2" color="text.secondary">
                            {selectedProduct?.description}
                        </Typography>
                    </CardContent>
                    <CardActions sx={{justifyContent: 'space-between'}}>
                        <Box component='div'>
                            <IconButton onClick={()=>(updateQuantity(false))} color='error' aria-label="share">
                                <RemoveCircle />
                            </IconButton>
                            {quantity}
                            <IconButton onClick={()=>(updateQuantity(true))} color='success' aria-label="add to favorites">
                                <AddCircle />
                            </IconButton>
                        </Box>

                        <Button onClick={() => (addProductToCart(selectedProduct))} sx={{float: 'right'}} variant='contained'>Add to cart</Button>
                    </CardActions>
                </Card>
            </Box>
        </Modal>
    )
}