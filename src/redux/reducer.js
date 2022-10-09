const initialState = {
    data:[]
}

export const reducer = (state = initialState,{type,payload})=>{
    switch(type){
        case "GET_DATA":
            return {...state,data:payload}

        case "SEARCH_DATA":
            return {...state,text:payload}
        
        default:
            return state;
    }
}