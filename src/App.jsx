import Navbar from "./components/Header";
import {Outlet} from "react-router-dom";
import SideNav from "./components/SideNav";
import {useEffect, useState} from "react";
import {profile} from "./services/userService.js";

function App() {
    useEffect(() => {
        profile().catch(e => null)
    }, [])

    const [mobileOpen, setMobileOpen] = useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    return (
        <div className="App">
            <Navbar toggleDrawer={handleDrawerToggle} />
            <SideNav open={mobileOpen} toggle={handleDrawerToggle} />
            <Outlet context={{sx: {pl: {xs: '0px', md: '240px'}}}} />
        </div>
    )
}

export default App
