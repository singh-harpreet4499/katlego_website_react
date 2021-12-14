import {UserActionTypes} from './/order.types'
const INITIAL_STATE = {
    address_id:null,
    payment_mode:null,
    schedule_date:null,
    schedule_time:null,
    delivery_type:null
}

const orderConfReducer = (state = INITIAL_STATE,action) => {
    switch (action.type) {
        case UserActionTypes.ORDER_CONF:
            return {
                ...state,
                address_id:action.address_id,
                payment_mode:action.payment_mode,
                schedule_date:action.schedule_date,
                schedule_time:action.schedule_time,
                delivery_type:action.delivery_type
            }
            
        default:
            return state;
    }
}

export default orderConfReducer;