const expert_reducer = ( state={
    expert:{coworkers:[{uid:"",name:""}],
        short_coworkers:[{uid:"",name:""}],
        publishes:[{}],
        detail_coworkers_flag:false,
        domains:[{name:""}]
    }
},action) => {

    switch(action.type) {
        case "set_expert":{
            let tempdata=action.expert;
            //加key
            console.log("开始修改key")
            for (let i = 0; i <tempdata.publishes.length ; i++) {
                    tempdata.publishes[i].key=i
                //
                console.log("正在修改key")
            }
            for (let i = 0; i <tempdata.coworkers.length ; i++) {
                tempdata.coworkers[i].key=i
                //
                console.log("正在修改合作者的key")
            }
            //长度裁剪
            if(tempdata.coworkers.length>4){
                let short_coworkers=tempdata.coworkers.slice(0,3)
                tempdata.short_coworkers=short_coworkers
            }else {
                let short_coworkers=tempdata.coworkers
                tempdata.short_coworkers=short_coworkers
            }
            return{
                ...state,
                expert: tempdata
            }
        }
        case "open_detail_coworkers":{
            let tempdata=action.expert;
            //全传进去
            let short_coworkers=tempdata.coworkers;
            tempdata.expert.short_coworkers=short_coworkers;
            tempdata.detail_coworkers_flag=true;
            return{
                ...state,
                expert:tempdata
            }
        }
        case "close_detail_coworkers":{
            let tempdata=action.expert;
            //传进去
            if(tempdata.coworkers.length>4){
                let short_coworkers=tempdata.coworkers.slice(0,3)
                tempdata.expert.short_coworkers=short_coworkers
            }else {
                tempdata.expert.short_coworkers=tempdata.coworkers
            }

            tempdata.detail_coworkers_flag=true;
            return{
                ...state,
                expert:tempdata
            }
        }

        default:return state
    }

}
export default expert_reducer
