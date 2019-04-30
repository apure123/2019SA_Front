const editProfile_reducer=(state={edit_visible:false},action)=>{
    switch (action.type) {
        case "edit_set_visible":return{
            ...state,
            edit_visible: action.visible
        }
        default: return state
    }
}
export default editProfile_reducer