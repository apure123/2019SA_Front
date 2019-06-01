const star_reducer = ( state={star_data:[],selectedRowKeys:[]},action) => {
    switch(action.type) {

        case "set_star_data":{
            var newdata=[];
            //类型检测与纠正
            for (let i = 0; i <action.data.length ; i++) {
                let perdata=action.data[i]
                /*newdata.push(action.data[i]);*/
                perdata.key=i;
                if(perdata.patent_id){
                    //如果是专利
                    perdata.article_type="P2";
                    perdata.Type="专利"
                }else {
                    perdata.article_type="P1";
                    perdata.Type="论文"
                }
                newdata.push(perdata)
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
        case "set_star_detail":{
            let newdata=state.star_data;
            newdata[action.key].authors=action.authors;
            newdata[action.key].buyed=action.buyed;
            newdata[action.key].detail_flag=true;
            return{
                ...state,
                star_data:newdata
            }
        }
        default:return state
    }

}

export default star_reducer
