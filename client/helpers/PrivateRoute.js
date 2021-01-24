import React,{useState,useEffect} from 'react';
import { Route, Redirect } from 'react-router-dom';
import { authenticated } from "./api-auth";

const PrivateRoute = ({component: Component, ...rest}) => {
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        setTimeout(() => {
            setLoading(false)
        }, 1);
    }, [])

    if(loading) return null
    return (

        // Show the component only when the user is logged in
        // Otherwise, redirect the user to /signin page
        <Route {...rest} render={props => (
            authenticated() ?
                <Component {...props} />
            : <Redirect to="/signin" />
        )} />
    );
};

export default PrivateRoute;