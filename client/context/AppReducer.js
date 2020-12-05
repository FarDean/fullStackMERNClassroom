export default (state,action)=>{
    switch (action.type) {
        case 'LIST_USERS':
            return {
                ...state,
                users:action.payload,
                error:null
            }

        case 'SIGN_IN':
            return {
                ...state,
                error:null
            }
        case 'CLIENT_ERROR':
            return {
                ...state,
                clientError:action.payload
            }
        
        case 'SERVER_ERROR':
            return {
                ...state,
                serverError:action.payload
            }
        default:
            return state
    }
}