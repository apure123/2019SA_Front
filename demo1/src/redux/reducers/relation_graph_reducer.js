const relation_graph_reducer = ( state={
    graph:{nodes:[{id:0,name:"",value:1}],links:[{
            sourceWeight: 1,
            targetWeight: 1,
            source: 0,
            target: 0
        }]},uid:""
},action) => {
    switch(action.type) {
        case "set_relation_graph":{
            let tempdata=action.graph;
            return{
                ...state,
                graph: tempdata
            }}
        case "set_expert_uid":{
            return{
                ...state,
                uid:action.uid
            }
        }

        default:return state
    }

}
export default relation_graph_reducer
