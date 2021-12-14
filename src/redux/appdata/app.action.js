import {UserActionTypes} from './app.types'

export const setAppData = (response) => (
    {
        type:UserActionTypes.SET_APP_DATA,
        ...response
    }
) 
