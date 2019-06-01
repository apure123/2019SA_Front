
const article_reducer = ( state={
    article:{authors:[{name:"",uid:""}],keyword_list:["热"]},
    patent:{inventor:[{name:"",uid:""}]},
    article_type:"P1"
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
        case "set_patent":{
            return{
                ...state,
                patent: action.patent_data
            }
        }
        case "set_article_type":return{
            ...state,
            article_type:action.article_type
        }
        default:return state
    }

}
export default article_reducer
