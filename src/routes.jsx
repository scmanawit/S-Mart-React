import {createBrowserRouter} from "react-router-dom";
import App from "./App.jsx";
import Login from "./pages/login.jsx"
import Register from "./pages/register";
import AddProduct from "./pages/createShopProduct";
import LayoutAuth from "./layouts/auth.jsx";
import AuthenticatedUserRoute from "./middleware/AuthenticatedUserRoute.jsx";
import UnathenticatedUserRoute from "./middleware/UnathenticatedUserRoute";
import Profile from "./pages/profile";
import Shop from "./pages/shop.jsx";
import OrderHistory from "./pages/orderHistory.jsx";


const router = createBrowserRouter([
    {
        path: "/",
        element: (
            <AuthenticatedUserRoute>
                <App/>
            </AuthenticatedUserRoute>
        ),
        children: [
            {
                path: "user/profile",
                element: <Profile/>
            },
            {
                path: "user/shops",
                element: <Shop/>
            },
            {
                path: "user/orderHistory",
                element: <OrderHistory/>
            }
        ]
    },
    {
        path: "/auth",
        element: (
            <UnathenticatedUserRoute>
                <LayoutAuth/>
            </UnathenticatedUserRoute>
        ),
        children: [
            {
                path: 'login',
                element: <Login/>
            },
            {
                path: 'register',
                element: <Register/>
            },
        ]
    },
    {
        path: "/product/:shopId/",
        element: <AddProduct/>
    }
])

export default router