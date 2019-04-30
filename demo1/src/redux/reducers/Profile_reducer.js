
const profile_reducer=(state={account:100},action)=>{
    switch (action.type) {
        case "profile_set_account": {
            let newdata = action.all_data;
            if (newdata.Type == "E") {
                newdata.user_type="专家用户"
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