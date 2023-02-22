import { Fragment } from "react";
import { Link } from "react-router-dom";


export default function NotFound() {
    return (
        <Fragment>
            <h1  className="text-center">"Error: Page Not Found"</h1>
            <p className="text-center">
                 Back to <Link to='/'>Homepage</Link>
            </p>
        </Fragment>
    )
}