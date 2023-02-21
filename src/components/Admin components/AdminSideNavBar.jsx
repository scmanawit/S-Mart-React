import * as React from 'react';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Toolbar from '@mui/material/Toolbar';
import HomeIcon from '@mui/icons-material/Home';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import HistoryIcon from '@mui/icons-material/History';
import StoreIcon from '@mui/icons-material/Store';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import {useNavigate} from "react-router-dom";
import { logout } from '../../services/authService';

const drawerWidth = 240;

export default function AdminSideNav({ open, toggle }) {
    const navigate = useNavigate()

    const items = [
        {
            text: 'Home',
            icon: <HomeIcon />,
            click: function (event) {
                navigate('/')
            }
        },
        {
            text: 'Profile',
            icon: <AccountCircleIcon />,
            click: function (event) {
                navigate('/user/profile')
            }
        },
        {
            text: 'Order History',
            icon: <HistoryIcon />,
            click: function (event) {
                navigate('/user/orderHistory')
            }
        },
        {
            text: 'My Shops',
            icon: <StoreIcon />,
            click: function (event) {
                navigate('/user/shops')
            }
        },
        {
            text: 'Logout',
            icon: <ExitToAppIcon />,
            click: function (event) {
                logout()
                navigate('/auth/login')
            }
        }
    ]

    const drawer = (
        <div>
            <Toolbar />
            <Divider />
            <List>
                {items.map((item, index) => (
                    <ListItem key={index} disablePadding onClick={item.click}>
                        <ListItemButton>
                            <ListItemIcon>
                                {item.icon}
                            </ListItemIcon>
                            <ListItemText primary={item.text} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </div>
    );

    return (
        <Box
            component="nav"
            sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
            aria-label="mailbox folders"
        >
            <Drawer
                variant="temporary"
                open={open}
                onClose={toggle}
                ModalProps={{
                    keepMounted: true,
                }}
                sx={{
                    display: { xs: 'block', md: 'none' },
                    width: drawerWidth,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                }}
            >
                {drawer}
            </Drawer>
            <Drawer
                variant="permanent"
                sx={{
                    display: { xs: 'none', md: 'block' },
                    '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                }}
                open
            >
                {drawer}
            </Drawer>
        </Box>
    );
}
