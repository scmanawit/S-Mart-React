import {useEffect, useState} from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import { Button, IconButton, TextField, Toolbar, Typography } from '@mui/material';
import { useNavigate, useOutletContext } from "react-router-dom";
import { clearCart, checkout as userCheckout, changeQuantity } from '../services/orderService';
import Swal from 'sweetalert2';
import { getLoggedInUser } from '../services/userService';
import { AddCircle, RemoveCircle } from '@mui/icons-material';

const TAX_RATE = 0.07;

export default function CheckOut() {
    const { sx, cart, setCart } = useOutletContext()
    const [address, setAddress] = useState(getLoggedInUser()?.address)
    const navigate = useNavigate()

    const ccyFormat = (num) => {
        return `${num.toFixed(2)}`;
    }
    const clearUserCart = async () => {
        try {
            const newCart = await clearCart()
            setCart(newCart)
            await Swal.fire({
                title: "Cart Successfully cleared!",
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

    const updateQuantity = (isAdd, product) => {
        let currentQuantity = product?.quantity
        
        if (isAdd) {
            ++currentQuantity
        } 

        if (!isAdd && currentQuantity > 0) {
            --currentQuantity
        }

        updateProductToCart({productId: product?.product?._id, quantity: currentQuantity})
    }

    const updateProductToCart = async ({productId, quantity}) => {
        try {
            const order = await changeQuantity({productId, quantity})
            setCart(order)
            await Swal.fire({
                title: "Cart Updated!",
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

    const checkoutCart = async () => {
        try {
            const newCart = await userCheckout({address})
            setCart(newCart)
            navigate('/')
            await Swal.fire({
                title: "Your order has been placed!",
                icon: "success"
            })
        } catch (e) {
            console.trace('Test')
            await Swal.fire({
                title: 'Error!',
                text: e.message,
                icon: 'error',
            })
        }
    }

    const emptyCart = (<Typography variant='h3'>Your cart is empty</Typography>)
    const checkout = (
        <TableContainer component={Paper} sx={{ p: '20px' }}>
            <Button onClick={clearUserCart} variant='contained' color='error' sx={{ float: 'right' }}>Clear Cart</Button>
            <Table sx={{ minWidth: 700, }} aria-label="spanning table">
                <TableHead>
                    <TableRow>
                        <TableCell align="center" colSpan={12}><h1>Order Checkout</h1></TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell colSpan={2} align="center"><strong> Product </strong></TableCell>
                        <TableCell align="center"><strong> Quantity</strong></TableCell>
                        <TableCell align="center"><strong> Price</strong></TableCell>
                        <TableCell align="center"><strong> Subtotal</strong></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {cart?.products.map((product, i) => (
                        <TableRow key={i}>
                            <TableCell><img width='150px' src={product?.product?.image}></img></TableCell>
                            <TableCell>{product?.product?.productName}</TableCell>
                            <TableCell align="center">
                                <IconButton color='error' onClick={() => (updateQuantity(false, product))}>
                                    <RemoveCircle />
                                </IconButton>
                                {product?.quantity}
                                <IconButton color='success' onClick={() => (updateQuantity(true, product))}>
                                    <AddCircle />
                                </IconButton>
                            </TableCell>
                            <TableCell align="center">{product?.product?.price}</TableCell>
                            <TableCell align="center">{ccyFormat(product?.subTotal)}</TableCell>
                        </TableRow>
                    ))}

                    <TableRow>
                        <TableCell rowSpan={3} />
                        <TableCell colSpan={2}><strong>Total</strong></TableCell>
                        <TableCell align="right">{cart?.total}</TableCell>
                    </TableRow>

                </TableBody>
            </Table>
            <Box
                component="form"
                noValidate sx={{ mt: 1, bgcolor: "white", p: '20px', }}
            >
                <TextField
                    margin="normal"
                    required
                    sx={{ width: '100%' }}
                    id="address"
                    label="Delivery Address"
                    name="address"
                    autoComplete="address"
                    autoFocus
                    value={address}
                    onChange={(event) => (setAddress(event.target.value))}
                />

                <Button 
                    onClick={checkoutCart} 
                    variant='contained' 
                    color='secondary' 
                    sx={{ float: 'right' }}
                    disabled={!address || !cart?.products?.length}
                >
                    Checkout
                </Button>
            </Box>
        </TableContainer>
    )

    return (
        <Box component='div' sx={{ ...sx }}>
            <Toolbar />
            {cart?.products?.length ? checkout : emptyCart}
        </Box>
    );
}
