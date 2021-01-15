import React from 'react'
import { Redirect, Route } from 'react-router-dom'
import { dAuth,authenticated } from "./api-auth";

export default function RestrictedRoute({component:Component,...rest}) {
    return (
        <Route {...rest} render={props =>(
            dAuth() ? authenticated() ? <Component {...props} />: <Redirect to='/signin' /> : <Redirect to='/dauth' />
        )} />
    )
}
