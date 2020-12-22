import React,{useEffect,useState,useContext} from 'react'
import { GlobalContext } from './../../context/GlobalContext'
import { Redirect } from "react-router-dom";

export default function Signin() {
    const {signIn} = useContext(GlobalContext)
    const [redirect, setRedirect] = useState(false)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    function onSubmit(e) {
        e.preventDefault()
        const user = {
            email,
            password
        }

        signIn(user)
    }

    console.log(redirect);

    return (
        <>
            <form onSubmit={onSubmit}>
                <input type="email" placeholder='Email' onChange={e=>{setEmail(e.target.value)}} />
                <input type="password" placeholder='Password' onChange={e=>{setPassword(e.target.value)}} />
                <button type='submit'>Submit</button>
            </form>
        </>
    )
}
