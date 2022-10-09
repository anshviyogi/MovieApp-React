export const getData = (data)=>{
    return{
        type:"GET_DATA",
        payload:data
    }
}

export const getSearchedText = (text)=>{
    return{
        type:"SEARCH_DATA",
        payload:text
    }
}