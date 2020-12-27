import React from 'react'
import { Route,Switch } from 'react-router-dom'
import Home from './components/Home'
import Signin from './components/user/Signin'
import Navbar from './components/Navbar'
import Signup from './components/user/Signup'
import Profile from './components/user/Profile'
import Users from './components/user/Users'

export default function MainRouter() {
    return (
        <>
            <Route path='/' component={Navbar} />
            <Switch>
                <Route exact path='/' component={Home} />
                <Route exact path='/signin' component={Signin} />
                <Route exact path='/signup' component={Signup} />
                <Route exact path='/users' component={Users} />
                <Route exact path='/profile/:userId' component={Profile} />
            </Switch>

        </>
    )
}
