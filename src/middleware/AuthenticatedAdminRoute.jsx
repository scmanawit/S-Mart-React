import {Navigate} from "react-router-dom";
import {Children} from "react";
import { getLoggedInUser } from "../services/userService";
import { logout } from "../services/authService";

export default function AuthenticatedAdminRoute({children}) {
    if (!localStorage.getItem('token')) {
        // user is not authenticated
        logout()
        return <Navigate to="/auth/login"/>;
    }

    if (!getLoggedInUser().isAdmin) {
        return <Navigate to="/"/>
    }

    return Children.only(children)
}