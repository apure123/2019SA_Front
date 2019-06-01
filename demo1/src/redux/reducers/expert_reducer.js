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
            //计算被引频次,顺便给文章加key
            tempdata.ci_count_total=0
            for (let i = 0; i <tempdata.publishes.length ; i++) {
                    tempdata.publishes[i].key=i;
                    tempdata.ci_count_total+=tempdata.publishes[i].ci_count
                console.log("正在修改key")
            }
            for (let i = 0; i <tempdata.coworkers.length ; i++) {
                tempdata.coworkers[i].key=i
            }
            //长度裁剪
           /* if(tempdata.coworkers.length>4){
                let short_coworkers=tempdata.coworkers.slice(0,3)
                tempdata.short_coworkers=short_coworkers
            }else {
                let short_coworkers=tempdata.coworkers
                tempdata.short_coworkers=short_coworkers
            }*/



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
        case "set_expert_email":{
            let tempdata=state.expert;
            tempdata.email=action.email
            return{
            ...state,
            expert:tempdata
        }}

        default:return state
    }

}
export default expert_reducer
