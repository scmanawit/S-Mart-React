import React from 'react';
import Carousel from 'react-material-ui-carousel'
import {Box, Button} from '@mui/material'
import '../carousel.css'
import {useNavigate} from "react-router-dom";

function Item({ item }) {
    const navigate = useNavigate()
    const searchCategory = (category) => {
        navigate({
            pathname: '/',
            search: `?category=${category}`
        })
    }
    return (
        <Box className='hover-img' component='div' sx={{
            height: '350px',
            backgroundImage: `url(${item.image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
        }}>

            <div className='caption'>
                <Button
                    sx={{
                        background: 'black'
                    }} size='large' variant="contained"
                    onClick={() => (searchCategory(item.name))}
                >
                    Shop {item.name}
                </Button>
            </div>
        </Box>
    )
}

export default function CustomCarousel() {
    var items = [
        {
            name: "Electronics",
            image: "/categories/electronics.jpg",
            path: '/test'
        },
        {
            name: "Clothing, Shoes, and Jewelry",
            image: "/categories/fashion.jpg",
            path: '/test'
        },
        {
            name: "Home and Kitchen",
            image: "/categories/home.jpg",
            path: '/test'
        },
        {
            name: "Health, Beauty, and Personal Care",
            image: "/categories/health.jpg",
            path: '/test'
        },
        {
            name: "Books",
            image: "/categories/nooks.jpg",
            path: '/test'
        },
        {
            name: "Pet Supplies",
            image: "/categories/pet.jpg",
            path: '/test'
        },
        {
            name: "Grocery & Gourmet Foods",
            image: "/categories/grocery.jpg",
            path: '/test'
        },
        {
            name: "Baby Products",
            image: "/categories/baby.jpg",
            path: '/test'
        },
        {
            name: "Office Products",
            image: "/categories/office.jpg",
            path: '/test'
        }
    ]

    return (
        <Carousel indicators={false}>
            {items.map((item, i) => <Item key={i} item={item}/>)}
        </Carousel>
    )
}