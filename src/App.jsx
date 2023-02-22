import Navbar from "./components/Header";
import {Outlet} from "react-router-dom";
import SideNav from "./components/SideNav";
import {useEffect, useState} from "react";
import {profile} from "./services/userService.js";
import CartContext from "./context/CatalogContext";
import {getCart} from "./services/orderService.js";

function App() {
    const [mobileOpen, setMobileOpen] = useState(false);
    const [cart, setCart] = useState(null);

    useEffect(() => {
        profile().catch(e => null)
        getUserCart().catch(e => null)
    }, [])

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const getUserCart = async () => {
        const userCart = await getCart()
        setCart(userCart)
    }

    return (
        <div className="App">
            <CartContext.Provider value={{
                cart,
                setCart
            }}>
                <Navbar toggleDrawer={handleDrawerToggle}/>
                <SideNav open={mobileOpen} toggle={handleDrawerToggle}/>
                <Outlet context={{
                    sx: {pl: {xs: '0px', md: '240px'}},
                    setCart,
                    cart
                }}/>
            </CartContext.Provider>
        </div>
    )
}

export default App
