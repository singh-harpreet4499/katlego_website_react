import {UserActionTypes} from './user.types'

export const setCurrentUser = (user,token,refreshToken) => (
    {
        type:UserActionTypes.SET_CURRENT_USER,
        payload:user,
        token:token,
        refreshToken:refreshToken
    }
) 



export const logoutUser = () => (
    {
        type:UserActionTypes.LOGOUT_USER
    }
) 


export const signupRequest = (user) => (
    {
        type:UserActionTypes.SIGNUP_REQUEST,
        payload:user
    }
) 



export const updateUser = (user) => (
    {
        type:UserActionTypes.UPDATE_USER,
        payload:user
    }
) 


