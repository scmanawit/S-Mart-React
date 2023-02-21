import {Navigate} from "react-router-dom";
import {Children} from "react";

export default function AuthenticatedUserRoute({children}) {
    if (!localStorage.getItem('token')) {
        // user is not authenticated
        return <Navigate to="/auth/login"/>;
    }

    return Children.only(children)
}