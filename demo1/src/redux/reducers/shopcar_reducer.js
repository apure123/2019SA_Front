const shopcar_reducer = ( state={data:[],selectedRowKeys:[]},action) => {
    switch(action.type) {
        case "get_shopcar"://从服务器将购物车全部覆盖本地数据的操作，需要把selectrowkey一起删掉
        {
            console.log("进入设置购物车的reducer")
            console.log(action)
            var newdata=[];
            for (let i = 0; i <action.data.length ; i++) {
                newdata.push(action.data[i]);
                newdata[i].key=action.data[i].rank;
                //类型检测与纠正
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
                data: newdata,
                selectedRowKeys:[]
            }
        }

        case "set_shopcar_selectedRowKeys":
        {
            return{
                ...state,
                selectedRowKeys:action.selectedRowKeys
            }
        }
        default:return state
    }

}

export default shopcar_reducer