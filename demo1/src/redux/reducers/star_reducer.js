const star_reducer = ( state={star_data:[],selectedRowKeys:[]},action) => {
    switch(action.type) {

        case "set_star_data":{
            var newdata=[];
            //类型检测与纠正
            for (let i = 0; i <action.data.length ; i++) {
                newdata.push(action.data[i]);
                newdata[i].key=action.data[i].rank;
                if (action.data[i].type){
                    if (action.data[i].type=="P1") {
                        newdata[i].Type="Paper"
                    }else if(action.data[i].type=="P2"){
                        newdata[i].Type="Patent"
                    }else if(action.data[i].type=="P3"){
                        newdata[i].Type="Project"
                    }
                    else {
                        newdata[i].Type="未知"
                    }
                }
                else {
                    newdata[i].Type="未指定类型"
                }
                //作者划分

            }
            return{
                ...state,
                star_data:newdata
            }
        }
        case "multidelete_stardata":
        {
            let newdata=state.star_data.filter(item => state.selectedRowKeys.indexOf(item.key)=== -1);
            return{
                ...state,
                star_data:newdata,
                selectedRowKeys: []
            }
        }
        case "delete_stardata":
        {
            let newdata=state.star_data.filter(item => item.key!==action.itemkey);
            return{
                ...state,
                star_data:newdata,
                selectedRowKeys:[]
            }
        }
        case "set_selectedRowKeys":
        {
            return{
                ...state,
                selectedRowKeys:action.selectedRowKeys
            }
        }
        default:return state
    }

}

export default star_reducer