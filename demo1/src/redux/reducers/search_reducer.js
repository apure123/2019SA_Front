
const search_reducer = ( state={
    dis_flag:false,
    search_result_list:[],
    keyword:"",
    detail_flag:[],
    super_search_flag:false,
    super_search_filed:{title:"",author:"",keyword:"",time_low:"",time_high:""},
    search_type:"title",
    article_type:"P1"
},action) => {
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
        //将数据加载到结果数据里面
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
                    perdata.Type="未指定类型(reducer里的修正)"
                }
                /*perdata.detail_flag=false;*/


                //如果是专利的话，把发明人加进作者authors里面,同时修改发表时间
                if(perdata.inventor){
                    perdata.authors=perdata.inventor;
                    perdata.year=perdata.applicant_date
                    newlist.push(perdata)
                }else {//论文
                    //将第一作者加进作者里面
                    perdata.authors=perdata.author1.concat(perdata.authors)
                    newlist.push(perdata);
                }
            }
            return{
            ...state,
                search_result_list: newlist
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
        case "open_super_search":{
            return{...state,
                super_search_flag:true
            }
        }
        case "close_super_search":{
            return{...state,
                super_search_flag:false
            }
        }
        case "set_search_type":return{
            ...state,
            search_type:action.search_type
        }
        case "article_type":return{
            ...state,
            article_type:action.article_type
        }
        default:return state
    }

}
export default search_reducer
