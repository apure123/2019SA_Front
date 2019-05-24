
const search_reducer = ( state={dis_flag:false,search_result_list:[],keyword:"",detail_flag:[],super_search_flag:false},action) => {
    switch(action.type) {
        case "search":
            return{
                ...state,
                dis_flag: true,
                keyword: action.keyword
            }
        case "search_init":return{
            ...state,
            dis_flag:false
        }
        case "search_load":{


            //数据监测与纠正
            let newlist=[];
            let newflaglist=[]
            for (let i = 0; i <action.list.length;i++){
                let perdata=action.list[i];
                perdata.key=i;
                if (action.list[i].Type){
                    if (action.list[i].Type=="P1") {
                        perdata.Type="Paper"
                    }else if(action.list[i].Type=="P2"){
                        perdata.Type="Patent"
                    }else if(action.list[i].Type=="P3"){
                        perdata.Type="Project"
                    }
                    else {
                        perdata.Type="未知"
                    }
                }
                else {
                    perdata.Type="未指定类型"
                }
                perdata.detail_flag=false;
                newlist.push(perdata);
            }
            return{
            ...state,
                search_result_list: newlist,
                keyword:action.keyword
        }}
        case "quit_search":return{
            ...state,
            dis_flag:false,
            search_result_list:[]
        }
        case "search_loading":{
            let temp_data=[]
            temp_data.push({loading:true,name:{},key:state.search_result_list.length})
            return{
                ...state,
                search_result_list:state.search_result_list.concat(temp_data)
            }
        }
        case "search_deloading":{
            let temp_data=state.search_result_list;
                temp_data.pop();
            return{
                ...state,
                search_result_list:temp_data
            }
        }
        case "search_detail":{
            let newdata=state.search_result_list;
            newdata[action.key].authors=action.authors;
            newdata[action.key].starred=action.starred;
            newdata[action.key].detail_flag=true;
            return{
                ...state,
                search_result_list:newdata
            }
        }
        /*case "star":{
            let newdata=state.search_result_list;
            newdata[action.key].starred=true;
            return{
                ...state,
                search_result_list:newdata
            }
        }*/
        case "switch_super_search":{
            return{...state,
                super_search_flag:!state.super_search_flag
            }
        }
        default:return state
    }

}
export default search_reducer
