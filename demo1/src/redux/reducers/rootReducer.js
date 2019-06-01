import {combineReducers}from "redux"
import regreducer from "./reg_reducer";
import login_reducer from "./login_reducer";
import star_reducer from "./star_reducer";
import search_reducer from "./search_reducer";
import shopcar_reducer from "./shopcar_reducer";
import profile_reducer from "./Profile_reducer";
import buyed_reducer from "./Buyed_Reducer";
import editProfile_reducer from "./EditProfile_Reducer";
import avator_reducer from "./Avator_reducer";
import article_reducer from "./article_reducer";
import expert_reducer from "./expert_reducer";
import relation_graph_reducer from "./relation_graph_reducer";
import recom1_reducer from "./recom1_reducer";
import recom2_reducer from "./recom2_reducer";
import u2e_ine_reducer from "./u2e_ine_reducer";
import interest_reducer from "../../components/User_interest/User_interest_reducer";
import interest_receive_reducer from "../../components/Author_interest/Author_interest_reducer";
import reply_reducer from "./Reply_reducer";


const rootReducer=combineReducers({
    reg:regreducer,
    login:login_reducer,
    star:star_reducer,
    search:search_reducer,
    shopcar:shopcar_reducer,
    profile:profile_reducer,
    buyed:buyed_reducer,
    editProfile:editProfile_reducer,
    avator:avator_reducer,
    article:article_reducer,
    expert:expert_reducer,
    relation_graph:relation_graph_reducer,
    recom1:recom1_reducer,
    recom2:recom2_reducer,
    u2e_ine:u2e_ine_reducer,
    interest:interest_reducer,
    interest_recive:interest_receive_reducer,
    reply:reply_reducer
})
export default rootReducer
