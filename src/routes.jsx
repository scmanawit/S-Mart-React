import {createBrowserRouter} from "react-router-dom";
import App from "./App.jsx";
import Login from "./pages/login.jsx"
import Register from "./pages/register";

const router = createBrowserRouter([
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
    }
])

export default router