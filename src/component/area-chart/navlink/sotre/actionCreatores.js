import * as constants from './constants'

const  setInitDone=(value)=>({
    type: constants.CHAGE_INIT_DONE,
    InitDone:value
    
})

export const changeInitDone =(value)=>{
    return (dispatch) => {   
        dispatch(setInitDone(value))   
    }
}