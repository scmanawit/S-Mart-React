import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import * as React from "react";
import { useEffect, useState, useContext } from "react";
import Swal from "sweetalert2";
import { createShopProduct, updateShopProduct } from "../../services/productService.js";
import { Modal } from "@mui/material";
import ShopContext from "../../context/ShopContext.jsx";
import SelectInput from "../input/SelectInput.jsx";

export default function CreateProductForm({ open, handleClose }) {
    const { selectedProduct, getShops, selectedShop, categories } = useContext(ShopContext);

    const [productName, setProductName] = useState(selectedProduct?.productName || '');
    const [description, setDescription] = useState(selectedProduct?.description || '');
    const [price, setPrice] = useState(selectedProduct?.price || '');
    const [formCategories, setFormCategories] = useState(selectedProduct?.categories || []);
    const [stocks, setStocks] = useState(selectedProduct?.stocks || '');
    const [image, setImage] = useState('');
    const [isActive, setIsActive] = useState(false);

    useEffect(() => {
        if (productName !== "" && description !== "" && price !== "" && formCategories !== "" && stocks !== "") {
            setIsActive(true);
        } else {
            setIsActive(false);
        }
    }, [
        productName,
        description,
        price,
        formCategories,
        stocks,
        image
    ])

    useEffect(() => {
        console.log('test');
        resetForm()
    }, [selectedProduct])

    const resetForm = () => {
        setProductName(selectedProduct?.productName || '')
        setDescription(selectedProduct?.description || '')
        setPrice(selectedProduct?.price || '')
        setFormCategories(selectedProduct?.categories || [])
        setStocks(selectedProduct?.stocks || '')
        setImage(selectedProduct?.image || '')
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            if (selectedProduct) {
                await updateShopProduct({
                    productId: selectedProduct._id,
                    productName,
                    description,
                    price,
                    categories: formCategories,
                    stocks,
                    image: image || undefined
                })
            } else {
                await createShopProduct({
                    shopId: selectedShop._id,
                    productName,
                    description,
                    price,
                    categories: formCategories,
                    stocks,
                    image: image || undefined
                })
            }

            await getShops()

            handleClose({ created: true })

            await Swal.fire({
                title: "Product Successfully Saved!",
                icon: "success"
            })

            resetForm()

        } catch (e) {
            handleClose()
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
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            sx={{ width: { md: '400px', xs: 'calc(100vw - 20px)' }, margin: 'auto', mt: '20px', height: 'calc(100vh - 50px)', overflow: 'auto' }}
        >
            <Box component='div' sx={{ p: '80px 20px', bgcolor: 'white' }}>

                <Typography component="h1" variant="h5" sx={{ textAlign: 'center', m: 1 }}>
                    Product
                </Typography>
                <Box
                    component="form"
                    onSubmit={handleSubmit}
                    noValidate sx={{ mt: 1, bgcolor: "white", p: '20px', }}
                >
                    <TextField
                        margin="normal"
                        required
                        sx={{ width: '100%' }}
                        id="productName"
                        label="Product Name"
                        name="productName"
                        autoFocus
                        value={productName}
                        onChange={event => setProductName(event.target.value)}
                    />
                    <TextField
                        margin="normal"
                        required
                        sx={{ width: '100%' }}
                        id="description"
                        label="description"
                        name="description"
                        autoFocus
                        value={description}
                        onChange={event => setDescription(event.target.value)}
                    />
                    <TextField
                        margin="normal"
                        required
                        sx={{ width: '100%' }}
                        id="price"
                        label="price"
                        name="price"
                        type="number"
                        autoFocus
                        value={price}
                        onChange={event => setPrice(event.target.value)}
                    />
                    {/* <TextField
                        margin="normal"
                        required
                        sx={{ width: '100%' }}
                        id="categories"
                        label="categories"
                        name="categories"
                        autoFocus
                        value={formCategories}
                        onChange={event => setFormCategories(event.target.value)}
                    /> */}
                    <SelectInput
                        id="categories"
                        label="categories"
                        value={formCategories}
                        onChange={event => setFormCategories(event.target.value)}
                        items={categories.map(c => ({text: c, value: c}))}
                    />
                    <TextField
                        margin="normal"
                        required
                        sx={{ width: '100%' }}
                        id="stocks"
                        label="stocks"
                        type="number"
                        name="stocks"
                        autoFocus
                        value={stocks}
                        onChange={event => setStocks(event.target.value)}
                    />
                    <TextField
                        margin="normal"
                        required
                        sx={{ width: '100%' }}
                        id="image"
                        label="image"
                        type="text"
                        name="image"
                        autoFocus
                        value={image}
                        onChange={event => (setImage(event.target.value))}
                    />


                    <Button type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 8 }}
                        disabled={!isActive}>
                        Save Product
                    </Button>
                    <Button type="button"
                        fullWidth
                        variant="contained"
                        onClick={handleClose}
                        sx={{ mt: 1, mb: 2, background: theme => theme.palette.grey['600'] }}
                    >
                        Close
                    </Button>
                </Box>
            </Box>
        </Modal>
    )
}