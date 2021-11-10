import { combineReducers } from "redux";
import alertReducer from "./alert/alert.reducer";
import appDataSetReducer from "./appdata/app.reducer";
import cartReducer from "./cart/cart.reducer";
import globalDataSetReducer from "./global/global.reducer";
import orderConfReducer from "./order/order.reducer";
import redirectReducer from "./redirect/redirect.reducer";
import userReducer from "./user/user.reducer";

export default combineReducers({
    user:userReducer,
    cart:cartReducer,
    redirection:redirectReducer,
    alert:alertReducer,
    orderConf:orderConfReducer,
    app_data:appDataSetReducer,
    global:globalDataSetReducer

})