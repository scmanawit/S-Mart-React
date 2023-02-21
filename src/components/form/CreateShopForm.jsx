import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import * as React from "react";
import {useEffect, useState} from "react";
import Swal from "sweetalert2";
import {createShop} from "../../services/shopService.js";
import {Modal} from "@mui/material";

export default function CreateShopForm({ open, handleClose }) {
    const [shopName, setShopName] = useState('')
    const [shopDescription, setShopDescription] = useState('')

    const [isActive, setIsActive] = useState(false);

    useEffect(() => {
        if (shopName !== '' && shopDescription !== '') {
            setIsActive(true)
        } else {
            setIsActive(false)
        }
    }, [shopName, shopDescription])

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await createShop({
                shopName: shopName,
                description: shopDescription,
            })
            handleClose()
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
                    Create Your Own Shop
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
                        Create Shop
                    </Button>
                </Box>
            </Box>
        </Modal>
    )
}