import { createBrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import Login from "./pages/login.jsx"
import Register from "./pages/register";
import LayoutAuth from "./layouts/auth.jsx";
import AuthenticatedUserRoute from "./middleware/AuthenticatedUserRoute.jsx";
import UnathenticatedUserRoute from "./middleware/UnathenticatedUserRoute";
import Profile from "./pages/profile";
import Shop from "./pages/shop.jsx";
import OrderHistory from "./pages/orderHistory.jsx";
import Catalog from "./pages/catalog.jsx";
import AdminHome from "./pages/AdminHome.jsx";
import AuthenticatedAdminRoute from "./middleware/AuthenticatedAdminRoute.jsx";
import CheckOut from "./pages/CheckOut.jsx";
import UpdateProfileForm from "./components/form/UpdateProfileForm.jsx";
import VerifyShops from "./components/VerifyShop.jsx";
import NotFound from "./pages/NotFound.jsx";


const router = createBrowserRouter([
    {
        path: "/",
        element: (
            <AuthenticatedUserRoute>
                <App />
            </AuthenticatedUserRoute>
        ),
        children: [
            {
                path: "/",
                element: <Catalog />
            },
            {
                path: "user/profile",
                element: <Profile />
            },
            {
                path: "user/shops",
                element: <Shop />
            },
            {
                path: "user/orderHistory",
                element: <OrderHistory />
            },
            {
                path: "user/checkOut",
                element: <CheckOut/>
            }
        ]
    },
    {
        path: "/auth",
        element: (
            <UnathenticatedUserRoute>
                <LayoutAuth />
            </UnathenticatedUserRoute>
        ),
        children: [
            {
                path: 'login',
                element: <Login />
            },
            {
                path: 'register',
                element: <Register />
            },
        ]
    },
    {
        path: "/admin",
        element: (
            <AuthenticatedAdminRoute>
                <AdminHome />
            </AuthenticatedAdminRoute>
        ),
        children: [
            {
                path: '',
                element: <VerifyShops/>
            },
            {
                path: 'profile',
                element: <UpdateProfileForm />
            }
        ]
    },
    {
        path: "*",
        element: <NotFound/>
    }

])

export default router