import {useEffect, useState} from "react";
import SideNav from "../components/SideNav";
import { profile } from "../services/userService";

function AdminHome() {
    // useEffect(() => {
    //     profile().catch(e => null)
    // }, [])

    const [mobileOpen, setMobileOpen] = useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    return (
        <div className="App">
            <SideNav open={mobileOpen} toggle={handleDrawerToggle} />
        </div>
    )
}

export default AdminHome