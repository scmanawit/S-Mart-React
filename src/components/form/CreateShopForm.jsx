import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import * as React from "react";
import {useEffect, useState, useContext} from "react";
import Swal from "sweetalert2";
import {createShop, updateShop} from "../../services/shopService.js";
import {Modal} from "@mui/material";
import ShopContext from "../../context/ShopContext.jsx";

export default function CreateShopForm({ open, handleClose }) {
    const { selectedShop } = useContext(ShopContext);
    const [shopName, setShopName] = useState(selectedShop?.shopName || '')
    const [shopDescription, setShopDescription] = useState(selectedShop?.description || '')

    const [isActive, setIsActive] = useState(false);

    useEffect(() => {
        if (shopName !== '' && shopDescription !== '') {
            setIsActive(true)
        } else {
            setIsActive(false)
        }
    }, [shopName, shopDescription])

    useEffect(() => {
        resetForm()
    }, [selectedShop])

    const resetForm = () => {
        setShopName(selectedShop?.shopName || '')
        setShopDescription(selectedShop?.description || '')
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            if (selectedShop) {
                await updateShop({
                    shopId: selectedShop._id,
                    shopName: shopName,
                    description: shopDescription,
                })
            } else {
                await createShop({
                    shopName: shopName,
                    description: shopDescription,
                })
            }

            handleClose({created: true})
            resetForm()

            await Swal.fire({
                title: "Shop Successfully Saved!",
                icon: "success",
                text: !selectedShop ? "Kindly wait for admin to verify your shop" : ""
            })

        } catch (e) {
            handleClose()
            await Swal.fire({
                title: 'Error!',
                text: e.message,
                icon: 'error',
            })
        }

    };

    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            sx={{width: '400px', margin: 'auto', mt: '100px'}}
        >
            <Box component='div' sx={{p: '80px 20px', bgcolor: 'white'}}>
                <Typography component="h1" variant="h5" sx={{textAlign: 'center', m: 1}}>
                    Shop
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
                        id="shopName"
                        label="Shop Name"
                        name="shopName"
                        autoFocus
                        value={shopName}
                        onChange={event => setShopName(event.target.value)}
                    />

                    <TextField
                        margin="normal"
                        required
                        sx={{width: '100%'}}
                        id="shopDescription"
                        label="Shop Description"
                        name="shopDescription"
                        value={shopDescription}
                        onChange={event => setShopDescription(event.target.value)}
                    />

                    <Button type="submit"
                            fullWidth
                            variant="contained"
                            sx={{mt: 8, mb: 2}}
                            disabled={!isActive}>
                        Save Shop
                    </Button>
                </Box>
            </Box>
        </Modal>
    )
}