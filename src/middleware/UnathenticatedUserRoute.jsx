import {Navigate} from "react-router-dom";
import {Children} from "react";

export default function UnathenticatedUserRoute({children}) {
    if (localStorage.getItem('token')) {
        return <Navigate to="/"/>;
    }

    return Children.only(children)
}