import {UserActionTypes} from './cart.types'

export const updatecarts = (response) => (
    {
        type:UserActionTypes.UPDATE_CART,
        items:response.data,
        total_amount:response.total_amount
    }
) 
