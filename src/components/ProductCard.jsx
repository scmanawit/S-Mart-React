import { Button, Card, CardActions, CardContent, CardMedia, Typography } from "@mui/material";
import { useContext } from "react";
import Swal from "sweetalert2";
import ShopContext from "../context/ShopContext";
import { activateShopProduct, deleteShopProduct } from "../services/productService";

export default function ProductCard({ product }) {
    const {setSelectedProduct, setOpenProductForm, getShops } = useContext(ShopContext);

    const update = async (product) => {
        setSelectedProduct(product)
        setOpenProductForm(true)
    }

    const toggleActivate = async (product) => {
        try {
            if (product.deletedAt) {
                await activateShopProduct(product._id)
            } else {
                await deleteShopProduct(product._id)
            }

            await Swal.fire({
                title: "Product Successfully Updated!",
                icon: "success"
            })
        } catch (e) {
            await Swal.fire({
                title: 'Error!',
                text: e.message,
                icon: 'error',
            })
        }

        await getShops()
    }

    return (
        <Card>
            <CardMedia
                sx={{ height: '350px', width: '300px' }}
                image={product.image}
                title={product.productName}
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {product.productName}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {product.description}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {product.price} PHP
                </Typography>
            </CardContent>
            <CardActions>
                {!product.deletedAt && <Button onClick={() => (update(product))} size="small">Update</Button>}
                <Button onClick={() => (toggleActivate(product))} size="small" sx={{
                    color: theme => theme.palette.error.main
                }}>{product.deletedAt ? 'Activate' : 'Deactivate'}</Button>
            </CardActions>
        </Card>
    )
}