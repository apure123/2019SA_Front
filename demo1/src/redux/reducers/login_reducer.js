const login_reducer=(state={loginflag:false,is_expert: true,},action)=>{
    switch (action.type) {
        case "login":{
            if(action.is_expert==0)
            return{...state,
            loginflag:true,
            username:action.username,
            is_expert:false,
                user_id:action.user_id
        }
            else return{...state,
                loginflag:true,
                username:action.username,
                is_expert:true,
                user_id:action.user_id
            }
        }
        case "quit":return{...state,loginflag:false}
        default: return state
    }
}
export default login_reducer