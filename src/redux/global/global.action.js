import {UserActionTypes} from './global.types'


export const setSettingsData = (response) => (
    {
        type:UserActionTypes.SETTINGS_DATA,
        settings:response
    }
) 


export const setWishlistData = (response) => (
    {
        type:UserActionTypes.SET_WISHLIST,
        wishlists:response
    }
) 
