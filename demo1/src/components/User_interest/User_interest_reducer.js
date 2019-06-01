
const interest_reducer = ( state={
    interest:[{}]
},action) => {
    switch(action.type) {
        case "set_interest":{
            //补上key
            let newdata=[]
            for (let i = 0; i <action.interest.length ; i++) {
                let perdata=action.interest[i]
                perdata.key=i
                newdata.push(perdata)
            }
            return{
                ...state,
                interest: newdata
            }
        }
        default:return state
    }

}
export default interest_reducer
