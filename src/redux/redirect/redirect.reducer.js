import { act } from 'react-dom/cjs/react-dom-test-utils.production.min'
import {UserActionTypes} from './redirect.types'
const INITIAL_STATE = {
    redirect : false
}

const redirectReducer = (state = INITIAL_STATE,action) => {
    switch (action.type) {
        case UserActionTypes.UNAUTH_USER:
            return {
                ...state,
                redirect:'/login'

            }
        case UserActionTypes.REDIRECT_FALSE:
                return {
                    ...state,
                    redirect:false
                }

        default:
            return state;
    }
}

export default redirectReducer;