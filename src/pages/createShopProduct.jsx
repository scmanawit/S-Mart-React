import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Logo from "../components/Logo.jsx";
import {green} from "@mui/material/colors";
import Header from "../components/Header";
import Footer from "../components/Footer.jsx";
import axios from 'axios'
import Swal from 'sweetalert2'
import {useNavigate, useParams} from 'react-router-dom';
import {useEffect, useState} from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import InputLabel from '@mui/material/InputLabel';


export default function AddProduct() {

    const [productName, setProductName] = useState('');

    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [categories, setCategories] = useState('');
    const [stocks, setStocks] = useState('');


    const [isActive, setIsActive] = useState(false);

    const navigate = useNavigate()
    let {shopId} = useParams()

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

    function addProduct({
                            productName,
                            description,
                            price,
                            categories,
                            stocks
                        }) {

        console.log('dessss', description);

        axios.post(`http://localhost:4000/product/${shopId}`, {
            productName,
            description,
            price,
            categories,
            stocks
        }, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then(response => {
                console.log('DEBUG response', response);

                Swal.fire({
                    title: "Product Successfully Created!",
                    icon: "success",

                })


                navigate("/")


            }).catch(error => {
            console.log('DEBUG error', error);
            Swal.fire({
                title: 'Error!',
                text: error?.response?.data || ' unsuccessful',
                icon: 'error',
            })
        })
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log({
            productName: data.get('productName'),
            description: data.get('description'),
            price: data.get('price'),
            categories: data.get('categories'),
            stocks: data.get('stocks')

        });

        addProduct({
            productName: data.get('productName'),
            description: data.get('description'),
            price: parseInt(data.get('price')),
            categories: data.get('categories'),
            stocks: parseInt(data.get('stocks'))

        })


    };

    return (
        <Box component='div'>
            <Header/>
            <Grid container columns={12} sx={{p: '20px'}}>
                <Grid item xs={12} md={6} xsoffset={6}>
                    <Logo width='50vw'/>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Box component='div' sx={{p: {md: '80px 20px'}, bgcolor: 'white'}}>

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


                            {
                                isActive ?
                                    <Button type="submit"
                                            fullWidth
                                            variant="contained"
                                            sx={{mt: 8, mb: 2}}>
                                        Add Product
                                    </Button>
                                    :
                                    <Button type="submit"
                                            fullWidth
                                            variant="contained"
                                            sx={{mt: 8, mb: 2}}
                                            disabled>
                                        Add Product
                                    </Button>
                            }

                        </Box>
                    </Box>
                </Grid>
            </Grid>
            <Footer/>
        </Box>
    );
}