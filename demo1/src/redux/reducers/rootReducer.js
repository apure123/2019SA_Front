import {combineReducers}from "redux"
import regreducer from "./reg_reducer";
import login_reducer from "./login_reducer";
import star_reducer from "./star_reducer";
import search_reducer from "./search_reducer";
import shopcar_reducer from "./shopcar_reducer";
import profile_reducer from "./Profile_reducer";
import buyed_reducer from "./Buyed_Reducer";
import editProfile_reducer from "./EditProfile_Reducer";
const rootReducer=combineReducers({
    reg:regreducer,
    login:login_reducer,
    star:star_reducer,
    search:search_reducer,
    shopcar:shopcar_reducer,
    profile:profile_reducer,
    buyed:buyed_reducer,
    editProfile:editProfile_reducer
})
export default rootReducer