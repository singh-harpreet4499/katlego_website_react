import {UserActionTypes} from './order.types'

export const setOrderConf = (response) => (
    {
        type:UserActionTypes.ORDER_CONF,
        address_id:response.address_id,
        payment_mode:response.payment_mode,
        schedule_date:response.schedule_date,
        schedule_time:response.schedule_time,
        delivery_type:response.delivery_type
    }
) 
