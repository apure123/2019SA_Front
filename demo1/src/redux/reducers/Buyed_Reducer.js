const buyed_reducer = ( state={data:[]},action) => {
    switch(action.type) {
        case "set_buyed"://从服务器将已购资源全部覆盖本地数据的操作
        {
            console.log("进入设置已购资源的reducer，下面是action")
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

            }
        }

        default:return state
    }

}

export default buyed_reducer