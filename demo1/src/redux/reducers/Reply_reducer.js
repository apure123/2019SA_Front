const reply_reducer = ( state={
    visible: false,
    message_uid:""
},action) => {
    switch(action.type) {
        case "set_reply_visible":{
            return{
                ...state,
                visible: action.visible
            }
        }
        case "set_reply_uid":return{
            ...state,
            message_uid: action.uid
        }
        default:return state
    }

}
export default reply_reducer
