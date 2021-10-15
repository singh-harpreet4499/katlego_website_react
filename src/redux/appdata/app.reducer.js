import {UserActionTypes} from './app.types'
const INITIAL_STATE = null

const appDataSetReducer = (state = INITIAL_STATE,action) => {
    switch (action.type) {
        case UserActionTypes.SET_APP_DATA:
            return {
                ...state,
               ...action
            }
            
        default:
            return state;
    }
}

export default appDataSetReducer;