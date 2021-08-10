import {UserActionTypes} from './user.types'
const INITIAL_STATE = {
    currentUser : null,
    token:null,
    refreshToken:null,
    address_list:[]
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

        case UserActionTypes.SET_LOCATION:
            return {
                ...state,
                location:action.location,
            }
        
        case UserActionTypes.SET_ADDRESS_LIST:
            return {
                ...state,
                address_list:action.address_list,
            }

            
        default:
            return state;
    }
}

export default userReducer;