import {Box} from '@mui/material'

export default function Logo({black = false, width = '10em', sx}) {
    const createShopLogoUrl = '/createshop.PNG'
    return (
        <Box
            component='img'
            sx={{width, ml: '-30px', ...sx}}
            src={createShopLogoUrl} alt='S-MartShop'
        />
    )
}