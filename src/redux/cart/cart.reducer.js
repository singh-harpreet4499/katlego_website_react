import {UserActionTypes} from './cart.types'
const INITIAL_STATE = {
    items:[],
    total_amount:0,
}

const cartReducer = (state = INITIAL_STATE,action) => {
    switch (action.type) {
        case UserActionTypes.UPDATE_CART:
            return {
                ...state,
                items:action.items,
                total_amount:action.total_amount
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

export default cartReducer;