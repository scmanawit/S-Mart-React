import {createBrowserRouter} from "react-router-dom";
import App from "./App.jsx";
import Login from "./pages/login.jsx"
import Register from "./pages/register";
import { UserProvider } from './UserContext';
import CreateShop from "./pages/createShop.jsx";
import AddProduct from "./pages/createShopProduct";

const router = createBrowserRouter(
    [
    
    {
        path: "/",
        element: <App />,
        children: [

        ]
    },
    {
        path: "/login",
        element: <Login/>,
        children: []

    },
    {
        path: "/register",
        element: <Register/>
    },
    {
        path: "/createShop",
        element: <CreateShop/>
    },
    {
        path: "/product/:shopId/",
        element: <AddProduct/>
    }

])

export default router