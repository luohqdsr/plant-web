import Axios from 'axios'
import * as constants from './constants'



const handleDeletCheckedButton =(plantChecked)=>({
    type :constants.HANDLE_DELETE_PLANT_CHECKED,
    plantChecked
})
const handleAddCheckedButton =(plantChecked)=>({
    type :constants.HANDLE_ADD_PLANT_CHECKED,
    plantChecked
})




export const deleteCheckedMenu= (targetValue,checked)=>{
    return (dispatch)=>{
   // const newCheack =checked.delete(targetValue)
        dispatch(handleDeletCheckedButton(targetValue, checked))
    }

}

export const addCheckedMenu =(targetValue)=>{
    return (dispatch) =>{
        dispatch(handleAddCheckedButton(targetValue))
    }
}