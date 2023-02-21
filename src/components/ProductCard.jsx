import { Button, Card, CardActions, CardContent, CardMedia, Typography } from "@mui/material";

export default function ProductCard({ product }) {
    return (
        <Card sx={{ maxWidth: 345 }}>
            <CardMedia
                sx={{ height: 140 }}
                image="/static/images/cards/contemplative-reptile.jpg"
                title="green iguana"
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {product.productName}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Lizards are a widespread group of squamate reptiles, with over 6,000
                    species, ranging across all continents except Antarctica
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small">Update</Button>
                <Button size="small" sx={{
                    color: theme => theme.palette.error.main
                }}>Remove</Button>
            </CardActions>
        </Card>
    )
}