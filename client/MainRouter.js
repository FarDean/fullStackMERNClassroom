import React from 'react'
import { Route } from 'react-router-dom'
import Home from './components/Home'
import Signin from './components/user/Signin'

export default function MainRouter() {
    return (
        <>
            <Route exact path='/' component={Home} />
            <Route exact path='/signin' component={Signin} />
        </>
    )
}
