
const article_reducer = ( state={
    article:{authors:[{name:"",uid:""}],keyword_list:["热"]}
},action) => {
    switch(action.type) {
        case "set_article":{
            let tempdata=action.article;
            let newauthors= tempdata.author1.concat(tempdata.authors)
            tempdata.authors=newauthors
            tempdata.keyword_list=action.article.keywords.split(",")
            return{
                ...state,
                article: tempdata
            }}

        default:return state
    }

}
export default article_reducer
