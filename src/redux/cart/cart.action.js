import {UserActionTypes} from './cart.types'

export const updatecarts = (items) => (
    {
        type:UserActionTypes.UPDATE_CART,
        items:items,
    }
) 
