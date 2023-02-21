import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import * as React from "react";
import {useEffect, useState} from "react";
import Swal from "sweetalert2";
import {createShopProduct} from "../../services/productService.js";
import {Modal} from "@mui/material";

export default function CreateProductForm({ shop, open, handleClose }) {
    const [productName, setProductName] = useState('');

    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [categories, setCategories] = useState('');
    const [stocks, setStocks] = useState('');
    const [image, setImage] = useState(null);

    const [isActive, setIsActive] = useState(false);

    useEffect(() => {
        if (productName !== "" && description !== "" && price !== "" && categories !== "" && stocks !== "") {
            setIsActive(true);
        } else {
            setIsActive(false);
        }
    }, [productName,
        description,
        price,
        categories,
        stocks])

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await createShopProduct({
                shopId: shop._id,
                productName,
                description,
                price,
                categories,
                stocks,
                image
            })

            handleClose({created: true})

            await Swal.fire({
                title: "Shop Successfully Created!",
                icon: "success",
                text: "Kindly wait for admin to verify your shop"
            })

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
            sx={{width: '400px', margin: 'auto', mt: '20px', height: '800px', overflow: 'auto'}}
        >
            <Box component='div' sx={{p: '80px 20px', bgcolor: 'white'}}>

                <Typography component="h1" variant="h5" sx={{textAlign: 'center', m: 1}}>
                    Add Product to Your Shop
                </Typography>
                <Box
                    component="form"
                    onSubmit={handleSubmit}
                    noValidate sx={{mt: 1, bgcolor: "white", p: '20px',}}
                >
                    <TextField
                        margin="normal"
                        required
                        sx={{width: '100%'}}
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
                        sx={{width: '100%'}}
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
                        sx={{width: '100%'}}
                        id="price"
                        label="price"
                        name="price"
                        type="number"
                        autoFocus
                        value={price}
                        onChange={event => setPrice(event.target.value)}
                    />
                    <TextField
                        margin="normal"
                        required
                        sx={{width: '100%'}}
                        id="categories"
                        label="categories"
                        name="categories"
                        autoFocus
                        value={categories}
                        onChange={event => setCategories(event.target.value)}
                    />
                    <TextField
                        margin="normal"
                        required
                        sx={{width: '100%'}}
                        id="stocks"
                        label="stocks"
                        type="number"
                        name="stocks"
                        autoFocus
                        value={stocks}
                        onChange={event => setStocks(event.target.value)}
                    />
                    {/* <TextField
                        margin="normal"
                        required
                        sx={{width: '100%'}}
                        id="image"
                        label="image"
                        name="image"
                        autoFocus
                        value={image}
                        onChange={event => setImage(event.target.value)}
                    /> */}


                    <Button type="submit"
                            fullWidth
                            variant="contained"
                            sx={{mt: 8, mb: 2}}
                            disabled={!isActive}>
                        Add Product
                    </Button>

                </Box>
            </Box>
        </Modal>
    )
}