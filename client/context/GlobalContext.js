import React,{createContext,useReducer} from 'react'
import axios from 'axios'
import AppReducer from './AppReducer'

const initialState = {
    users: [],
    error: null
}

export const GlobalContext = createContext(initialState)

export const GlobalProvider = ({children}) => {
    const [state, dispatch] = useReducer(AppReducer, initialState)

    /*******************      USER CRUD     ******************/ 
    async function registerUser(user){
        try {
            const res = await axios.post('/api/v1/users/',user)
            dispatch({
                type: 'REGISTER_USER',
                payload: res.data
            })
        } catch (err) {
            dispatch({
                type: 'ERROR',
                payload: err.response.data.error
            })
        }
    }

    async function listUsers(token) {
        const config = {
            cancelToken:token.token
        }
        try {
            const res = await axios.get('/api/v1/users/',config)

            dispatch({
                type: 'LIST_USERS',
                payload : res.data
            })
        } catch (err) {
            if(axios.isCancel(err)){
                console.log(err);
            }
            dispatch({
                type: 'ERROR',
                payload: err.response.data.error
            })
        }
    }

    async function readUser(jwt,params) {
        const config = {
            headers:{
                'Autherization' : 'Bearer ' + jwt
            }
        }

        try {
            const res =await axios.get('/api/v1/users' + params.uersId , config)

            dispatch({
                type: 'READ_USER',
                payload: res.data
            })
        } catch (err) {
            dispatch({
                type: 'ERROR',
                payload: err.response.data.error
            })
        }
    }

    async function updateUser(jwt,params,updatedUser) {
        const config = {
            headers: {
                'Autherization' : 'Bearer ' + jwt
            }
        }

        try {
            const res = await axios.put('/api/v1/users/' + params.userId,updatedUser,config)

            dispatch({
                type: 'UPDATE_USER',
                payload: res.data
            })
        } catch (err) {
            dispatch({
                type: 'ERROR',
                payload: err.response.data.error
            })
        }
    }

    async function deleteUser(jwt,params) {
        const config = {
            headers: {
                'Autherization' : 'Bearer ' + jwt
            }
        }

        try {
            const res = await axios.delete('/api/v1/users/' + params.userId,config)
        } catch (err) {
            dispatch({
                type: 'ERROR',
                payload: err.response.data.error
            })
        }
    }

    /**************************        USER AUTH          **********************/ 

    async function signIn(user) {
        const config = {
            withCredentials:true
        }
        try {
            const res =await axios.post('/auth/signin',user,config)

            dispatch({
                type:'SIGN_IN',
                payload: res.data
            })
            
        } catch (err) {
            dispatch({
                type: 'ERROR',
                payload: err.response.data.error
            })
            
        }
    }

    async function signOut(params) {
        
    }

    return (
        <GlobalContext.Provider value={{
            users:state.users,
            loading:state.loading,
            error:state.error,
            registerUser,
            listUsers,
            signIn
        }}>
            {children}
        </GlobalContext.Provider>
    )
}