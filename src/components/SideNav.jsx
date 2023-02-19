import { Box, Drawer } from '@mui/material'
import SideNavMenu from "./SideNavMenu";

export default function SideNav({ open, toggle }) {
    return (
        <Box
            component='nav'
            aria-label='mailbox folders'
            sx={{ width: { sm: 280 }, flexShrink: { sm: 0 } }}
        >
            <Drawer
                variant='temporary'
                sx={{
                    '.MuiDrawer-paper': { width: 280 },
                }}
                open={open}
                onClose={toggle}
            >
                <SideNavMenu />
            </Drawer>
        </Box>
    )
}
