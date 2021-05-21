import {UserActionTypes} from './user.types'
const INITIAL_STATE = {
    currentUser : null,
    token:null,
    refreshToken:null
}

const userReducer = (state = INITIAL_STATE,action) => {
    switch (action.type) {
        case UserActionTypes.SET_CURRENT_USER:
            return {
                ...state,
                currentUser:action.payload,
                token:action.token ? action.token : null,
                refreshToken:action.refreshToken ? action.refreshToken : null

            }
            break;

        case UserActionTypes.SET_LOCATION:
            return {
                ...state,
                location:action.location,
            }
            break;

            // case UserActionTypes.SIGNUP_REQUEST:
            //     return {
            //         ...state,
            //         signupUser:action.payload,
            //     }
            //     break;
            // case UserActionTypes.LOGOUT_USER:
            //     return {
            //         ...state,
            //         currentUser:null,
            //         token:null
            //     }
            //     break;

            //     case UserActionTypes.UPDATE_USER:
            //     return {
            //         ...state,
            //         currentUser:action.payload
            //     }
            //     break;
        default:
            return state;
    }
}

export default userReducer;