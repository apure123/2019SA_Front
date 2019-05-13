const login_reducer=(state={loginflag:false,is_expert: true,},action)=>{
    switch (action.type) {
        case "login":{
            if(action.is_expert==0)
            return{...state,
                username:action.username,
                is_expert:false,
                token:action.token,
                loginflag:true
        }
            else return{...state,
                username:action.username,
                is_expert:true,
                token:action.token,
                loginflag:true
            }
        }
        case "quit":return{...state,loginflag:false}

        default: return state
    }
}
export default login_reducer