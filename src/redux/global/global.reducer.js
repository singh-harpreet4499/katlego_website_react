import {UserActionTypes} from './global.types'
const INITIAL_STATE = {
    settings:{},
    wishlists:[]
}

const globalDataSetReducer = (state = INITIAL_STATE,action) => {
    switch (action.type) {
        case UserActionTypes.SETTINGS_DATA:
            return {
                ...state,
               settings:action.settings
            }

        case UserActionTypes.SET_WISHLIST:
            return {
                ...state,
                wishlists:action.wishlists
            }
            
        default:
            return state;
    }
}

export default globalDataSetReducer;