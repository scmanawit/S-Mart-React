import { Grid, Paper } from "@mui/material"
import ProductCard from "./ProductCard"
import { styled } from '@mui/material/styles';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

export default function ProductsList({ products }) {

    const items = products.map(product => {
        return (
                <Grid item key={product._id}>
                    <Item><ProductCard product={product} /></Item>
                </Grid>
        )
    })

    return (
        <Grid container>
            {items}
        </Grid>
    )
}