const recom1_reducer = ( state={
    datalist:[{}]
},action) => {
    switch(action.type) {
        case "set_recom1":{
            let tempdata=action.datalist;
            //裁减至最多7条
            if(tempdata.length>7){
                let templist=tempdata.slice(0,6)
                tempdata=templist
            }else {

            }
            return{
                ...state,
                datalist: tempdata
            }}

        default:return state
    }

}
export default recom1_reducer
