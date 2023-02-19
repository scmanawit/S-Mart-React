import { Box } from '@mui/material'

export default function Logo({ black = false, height = 10, sx }) {
    const logoUrl = black ? '/logo-on-black.svg' : 'logo.svg'
    return (
        <Box
            component='img'
            sx={{ height: `${height}em`, ml: '-30px', ...sx }}
            src={logoUrl} alt='S-Mart'
        />
    )
}
