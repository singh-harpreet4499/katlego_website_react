import {UserActionTypes} from './redirect.types';


export const redirectUnauthUser = () => (
    {
        type:UserActionTypes.UNAUTH_USER,
    }
) 


export const setRedirectFalse = () => (
    {
        type:UserActionTypes.REDIRECT_FALSE,
    }
) 
