const u2e_ine_reducer=(state={u2e_visible:false},action)=>{
    switch (action.type) {
        case "u2e_ine_set_visible":return{
            ...state,
            u2e_visible: action.visible
        }
        default: return state
    }
}
export default u2e_ine_reducer
