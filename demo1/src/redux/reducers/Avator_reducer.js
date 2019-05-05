const avator_reducer = ( state={avator_url:"http://127.0.0.1:8000/static/author_avator/default.jpg"},action) => {
    switch(action.type) {
        case "set_avator"://从服务器将已购资源全部覆盖本地数据的操作
        {
            return{
                ...state,
                avator_url: "http://127.0.0.1:8000/static/"+action.url
            }
        }

        default:return state
    }

}

export default avator_reducer