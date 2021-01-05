export default (state,action)=>{
    switch (action.type) {
        case 'REGISTER_USER':
            return {
                ...state,
                message:action.payload
            }

        case 'UPDATE_USER':
            return {
                ...state,
                message:action.payload
            }

                    
        case 'READ_USER':
            return {
                ...state,
                user:action.payload
            }

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
        case 'ERROR':
            return {
                ...state,
                error:action.payload
            }
        
        case 'SET_TO_NULL':
            return {
                ...state,
                error:action.payload,
                message:action.payload
            }
        case 'SIGN_OUT':
            return {
                ...state,
                message:action.payload
            }

        
        case 'GET_PUBLISHED_COURSES':
            return {
                ...state,
                publishedCourses: action.payload
            }

        case 'ADD_LESSON':
            return {
                ...state,
                course:action.payload
            }

        case 'GET_ALL_COURSES':
            return {
                ...state,
                courses: action.payload
            }

        case 'CREATE_COURSE':
            return {
                ...state,
                message: action.payload
            }

        case 'GET_COURSE':
            return {
                ...state,
                course:action.payload
            }

        case 'UPDATE_COURSE':
            return {
                ...state,
                message:action.payload
            }

        case 'DELETE_COURSE':
            return {
                ...state,
                message:action.payload
            }
        
        case 'ENROLL':
            return {
                ...state,
                message:action.payload
            }
        
        case 'GET_ENROLLMENT':
            return {
                ...state,
                enrollment:action.payload
            }

        case 'GET_USER_ENROLLMENTS':
            return {
                ...state,
                userEnrollments:action.payload
            }

        case 'COMPLETE_LESSON':
            return {
                ...state,
                message:action.payload
            }

        case 'STATS':
            return {
                ...state,
                stats: action.payload
            }

        case 'GET_PERSONAL_INFO':
            return {
                ...state,
                personalInfo: action.payload
            }

        default:
            return state
    }
}