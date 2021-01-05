import React,{createContext,useReducer} from 'react'
import axios from 'axios'
import AppReducer from './AppReducer'

const initialState = {
    users: [],
    error: null,
    user:{},
    message:null,
    publishedCourses:[],
    courses: [],
    course: {},
    enrollment: {},
    userEnrollments: [],
    stats:{},
    personalInfo:{}
}

export const GlobalContext = createContext(initialState)

export const GlobalProvider = ({children}) => {
    const [state, dispatch] = useReducer(AppReducer, initialState)

    function setToNull() {
        dispatch({
            type: 'SET_TO_NULL',
            payload:null
        })
    }

    /*******************      USER CRUD     ******************/ 
    async function registerUser(user){
        try {
            const res = await axios.post('/api/v1/users/',user)
            console.log(typeof res.data.message);
            dispatch({
                type: 'REGISTER_USER',
                payload: res.data.message
            })
        } catch (err) {
            dispatch({
                type: 'ERROR',
                payload: err.response.data.error
            })
        }
    }

    async function listUsers(jwt) {
        const config = {
            // cancelToken:token.token
            headers:{
                'Authorization' : 'Bearer ' + jwt
            }
        }
        try {
            const res = await axios.get('/api/v1/users',config)

            dispatch({
                type: 'LIST_USERS',
                payload : res.data
            })
        } catch (err) {
            // if(axios.isCancel(err)){
            //     console.log(err);
            // }
            dispatch({
                type: 'ERROR',
                payload: err.response.data.error
            })
        }
    }

    async function readUser(jwt,params) {
        const config = {
            headers:{
                'Authorization' : 'Bearer ' + jwt
            }
        }

        try {
            const res =await axios.get('/api/v1/users/' + params.userId , config)

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
                'Authorization' : 'Bearer ' + jwt
            }
        }

        try {
            const res = await axios.put('/api/v1/users/' + params.userId,updatedUser,config)

            dispatch({
                type: 'UPDATE_USER',
                payload: res.data.message
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
                'Authorization' : 'Bearer ' + jwt
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

    async function getPersonalInfo(jwt,params,password) {
        const config = {
            headers: {
                'Authorization' : 'Bearer ' + jwt
            }
        }

        try {
            const res = await axios.post('/api/v1/users/info/' + params.userId,password,config)

            dispatch({
                type:'GET_PERSONAL_INFO',
                payload: res.data
            })
        } catch (err) {
            dispatch({
                type: 'ERROR',
                payload: err.response.data.error
            })
        }
    }

    /**************************        USER AUTH          **********************/ 

    async function signIn(user,cb) {
        const config = {
            withCredentials:true
        }

        try {
            await axios.post('/auth/signin',user,config)
            cb()
        } catch (err) {
            dispatch({
                type: 'ERROR',
                payload: err.response.data.error
            })
        }


    }

    async function signOut() {
        try {
            const res = await axios.get('/auth/signout')

            dispatch({
                type: 'SIGN_OUT',
                payload:res.data.message
            })
        } catch (err) {
            dispatch({
                type: 'ERROR',
                payload: err.response.data.error
            })
        }
    }

    /**************************        Course          **********************/ 

    async function getPublishedCourses() {
        try {
            const res = await axios.get('/api/v1/courses/published')

            dispatch({
                type: 'GET_PUBLISHED_COURSES',
                payload: res.data
            })
        } catch (err) {
            dispatch({
                type: 'ERROR',
                payload: err.response.data.error
            })
        }
    }


    // List courses by specific user
    async function courseByUser(jwt,params) {
        const config = {
            headers: {
                'Authorization' : 'Bearer ' + jwt
            }
        }
        try {
            const res = await axios.get('/api/v1/courses/by/' + params.userId,config)

            dispatch({
                type: 'COURSE_BY_USER',
                payload:res.data
            })
        } catch (err) {
            dispatch({
                type: 'ERROR',
                payload: err.response.data.error
            })
        }
    }

    // Add Lessons 
    async function addLesson(jwt,params,lesson) {
        const config = {
            headers: {
                'Authorization' : 'Bearer ' + jwt
            }
        }

        try {
            const res = await axios.put('/api/v1/courses/' + params.courseId + '/lesson/new',lesson,config)

            dispatch({
                type: 'ADD_LESSON',
                payload:res.data
            })
        } catch (err) {
            dispatch({
                type: 'ERROR',
                payload: err.response.data.error
            })
        }
    }

    // Course crud
    async function getAllCourses(jwt) {
        const config = {
            headers: {
                'Authorization': 'Bearer' + jwt
            }
        }

        try {
            const res = await axios.get('/api/v1/courses',config)

            dispatch({
                type: 'GET_ALL_COURSES',
                payload: res.data
            })
        } catch (err) {
            dispatch({
                type: 'ERROR',
                payload: err.response.data.error
            })
        }
    }

    async function createCourse(jwt,course) {
        const config = {
            headers: {
                'Authorization' : 'Bearer ' + jwt
            }
        }

        try {
            const res = await axios.post('/api/v1/courses',course,config)

            dispatch({
                type: 'CREATE_COURSE',
                payload: res.data.message
            })
        } catch (err) {
            dispatch({
                type: 'ERROR',
                payload: err.response.data.error
            })
        }
    }

    async function getCourse(params) {
        try {
            const res = await axios.get('/api/v1/courses/' + params.courseId)

            dispatch({
                type: 'GET_COURSE',
                payload: res.data
            })
        } catch (err) {
            dispatch({
                type: 'ERROR',
                payload: err.response.data.error
            })
        }
    }

    async function editCourse(jwt,params,updatedCourse) {
        const config = {
            headers: {
                'Authorization' : 'Bearer ' + jwt
            }
        }

        try {
            const res = await axios.put('/api/v1/courses/' + params.courseId,updatedCourse,config)

            dispatch({
                type: 'UPDATE_COURSE',
                payload:res.data.message
            })
        } catch (err) {
            dispatch({
                type: 'ERROR',
                payload: err.response.data.error
            })
        }
    }

    async function deleteCourse(jwt,params) {
        const config = {
            headers: {
                'Authorization' : 'Bearer ' + jwt
            }
        }

        try {
            const res = await axios.delete('/api/v1/courses/' + params.courseId,config)

            dispatch({
                type: 'DELETE_COURSE',
                payload: res.data.message
            })
        } catch (err) {
            dispatch({
                type: 'ERROR',
                payload: err.response.data.error
            })
        }
    }


    /**************************        Enrollment          **********************/ 

    async function enroll(jwt,params) {
        const config = {
            headers: {
                'Authoriztion': 'Bearer ' + jwt 
            }
        }

        try {
            const res = await axios.get('/api/v1/enrollment/new/' + params.courseId,config)

            dispatch({
                type: 'ENROLL',
                payload: res.data.message
            })
        } catch (err) {
            dispatch({
                type: 'ERROR',
                payload: err.response.data.error
            })
        }
    }

    async function getEnrollment(jwt,params) {
        const config = {
            headers: {
                'Authoriztion': 'Bearer ' + jwt 
            }
        }

        try {
            const res = await axios.get('/api/v1/enrollments/' + params.enrollmentId,config)

            dispatch({
                type: 'GET_ENROLLMENT',
                payload:res.data
            })
        } catch (err) {
            dispatch({
                type: 'ERROR',
                payload: err.response.data.error
            })
        }
    }

    async function getAllEnrollments(jwt) {
        const config = {
            headers: {
                'Authoriztion': 'Bearer ' + jwt 
            }
        }

        try {
            const res = await axios.get('/api/v1/enrollments',config)

            dispatch({
                type: 'GET_USER_ENROLLMENTS',
                payload: res.data
            })
        } catch (err) {
            dispatch({
                type: 'ERROR',
                payload: err.response.data.error
            })
        }
    }

    async function completeLesson(jwt,params,updatedEnrollment) {
        const config = {
            headers: {
                'Authoriztion': 'Bearer ' + jwt 
            }
        }

        try {
            const res = await axios.put('/api/v1/enrollment/complete/' + params.enrollmentId,updatedEnrollment,config)

            dispatch({
                type: 'COMPLETE_LESSON',
                payload:res.data.message
            })
        } catch (err) {
            dispatch({
                type: 'ERROR',
                payload: err.response.data.error
            })
        }
    }

    async function getStats(params) {
        try {
            const res = await axios.get('/api/v1/stats/' +params.courseId)

            dispatch({
                type: 'STATS',
                payload: res.data
            })
        } catch (err) {
            dispatch({
                type: 'ERROR',
                payload: err.response.data.error
            })
        }
    }

    return (
        <GlobalContext.Provider value={{
            users:state.users,
            user:state.user,
            error:state.error,
            message:state.message,
            courses:state.courses,
            course:state.course,
            publishedCourses:state.publishedCourses,
            enrollment:state.enrollment,
            userEnrollments:state.userEnrollments,
            stats:state.stats,
            personalInfo:state.personalInfo,
            registerUser,
            listUsers,
            readUser,
            updateUser,
            signIn,
            signOut,
            getPublishedCourses,
            courseByUser,
            addLesson,
            getAllCourses,
            createCourse,
            getCourse,
            editCourse,
            deleteCourse,
            enroll,
            getEnrollment,
            getAllEnrollments,
            completeLesson,
            getStats,
            setToNull,
            getPersonalInfo
        }}>
            {children}
        </GlobalContext.Provider>
    )
}