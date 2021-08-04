import { combineReducers } from "redux";
import alertReducer from "./alert/alert.reducer";
import cartReducer from "./cart/cart.reducer";
import redirectReducer from "./redirect/redirect.reducer";
import userReducer from "./user/user.reducer";

export default combineReducers({
    user:userReducer,
    cart:cartReducer,
    redirection:redirectReducer,
    alert:alertReducer
})