import { Box } from '@mui/material'

export default function Logo({ black = false, width = '10em', sx }) {
    const logoUrl = black ? '/logo-on-black.svg' : 'logo.svg'
    return (
        <Box
            component='img'
            sx={{ width, ml: '-30px', ...sx }}
            src={logoUrl} alt='S-Mart'
        />
    )
}
