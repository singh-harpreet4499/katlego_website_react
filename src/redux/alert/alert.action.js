import {UserActionTypes} from './alert.types'

export const showCustomAlert = (response) => (
    {
        type:UserActionTypes.SHOW_CUSTOM_ALERT,
        alert_config:response
    }
) 


export const closeCustomAlert = () => (
    {
        type:UserActionTypes.CLOSE_CUSTOM_ALERT,
        alert_config:{}
    }
) 
