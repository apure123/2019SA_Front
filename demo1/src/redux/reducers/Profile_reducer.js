
const profile_reducer=(state={account:100,all_data: {user_ID:0,username:'',mail:"",user_type:"",telephone:"",introduction:"",is_expert: false}},action)=>{
    switch (action.type) {
        case "profile_set_account": {
            let newdata = action.all_data;
            newdata.is_expert=false;
            if (newdata.Type == "E") {
                newdata.user_type="专家用户"
                newdata.is_expert=true
            }else if (newdata.Type == "U") {
                newdata.user_type="普通用户"
            }else if (newdata.Type == "A"){
                newdata.user_type="管理员"
            } else {
                newdata.user_type="未知"
            }
            return{
            ...state,
            account: action.account,
            all_data:action.all_data
        }}
        default: return state
    }
}
export default profile_reducer
