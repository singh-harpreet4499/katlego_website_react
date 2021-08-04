import {UserActionTypes} from './alert.types'
const INITIAL_STATE = {
    alert_config:
    {   show_alert:false,
        title:'',
        message:'',
        success:false,
        danger:false
    }
}

const alertReducer = (state = INITIAL_STATE,action) => {
    switch (action.type) {
        case UserActionTypes.SHOW_CUSTOM_ALERT:
            return {
                ...state,
                alert_config:action.alert_config
            }
            case UserActionTypes.CLOSE_CUSTOM_ALERT:
                return {
                    ...state,
                    alert_config:INITIAL_STATE
                }
        default:
            return state;
    }
}

export default alertReducer;