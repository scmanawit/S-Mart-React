import {ReactElement, useState} from 'react'
import {
    Toolbar,
    IconButton,
    Typography,
    AppBar,
    Container,
    styled,
    alpha,
    InputBase,
    Box,
    Badge,
    Menu, MenuItem
} from '@mui/material'
import Logo from "./Logo";
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import CartIcon from '@mui/icons-material/ShoppingCart';
import MenuIcon from '@mui/icons-material/Menu';
import {useNavigate} from 'react-router-dom';
import {logout} from "../services/authService.js";
import {getLoggedInUser} from "../services/userService.js";


const Search = styled('div')(({theme}) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({theme}) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({theme}) => ({
    color: 'inherit',
    '& .MuiInputBase-root': {
        width: '100%',
    },
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
    },
}));

export default function AdminHeader({toggleDrawer}) {

    const navigate = useNavigate()

    const [anchorEl, setAnchorEl] = useState(null);

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const register = () => {
        setAnchorEl(null);
        navigate('/auth/register')
    };

    const login = () => {
        setAnchorEl(null);
        navigate('/auth/login')
    };

    const profile = () => {
        setAnchorEl(null);
        navigate('/user/profile')
    };

    const logoutUser = () => {
        setAnchorEl(null);
        logout()
        navigate('/auth/login')
    }

    return (
        <AppBar
            elevation={0}
            position='fixed'
            sx={{
                    width: `100%`,
                    zIndex: (theme) => theme.zIndex.drawer + 1
                }}
        >
            <Toolbar sx={{justifyContent: {xs: 'space-between', md: 'start'}}}>
                <IconButton
                    sx={{
                        display: {xs: 'inline-flex', md: 'none'}
                    }}
                    size="large"
                    edge="end"
                    aria-label="account of current user"
                    aria-haspopup="true"
                    color="inherit"
                    onClick={toggleDrawer}
                >
                    <MenuIcon/>
                </IconButton>
                <Logo black/>
                <Box sx={{flexGrow: 1, textAlign:'center', pl: 3, pr: 1, display: {xs: 'none', md: 'block'}}}>
                   <h1>Admin Dashboard</h1> 
                </Box>
                <Box sx={{}}>
                    
                    <IconButton
                        size="large"
                        edge="end"
                        aria-label="account of current user"
                        aria-haspopup="true"
                        color="inherit"
                        onClick={handleMenu}
                    >
                        <AccountCircle/>
                    </IconButton>
                    <Menu
                        id="menu-appbar"
                        anchorEl={anchorEl}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        keepMounted
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                    >
                        {!getLoggedInUser() && <MenuItem onClick={login}>Login</MenuItem>}
                        {!getLoggedInUser() && <MenuItem onClick={register}>Register</MenuItem>}
                        {getLoggedInUser() && <MenuItem onClick={profile}>Profile</MenuItem>}
                        {getLoggedInUser() && <MenuItem onClick={logoutUser}>Logout</MenuItem>}
                    </Menu>
                </Box>
            </Toolbar>
        </AppBar>
    )
}
