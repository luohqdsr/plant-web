import { fromJS, List,Map } from 'immutable'
import * as constants from './constants'
const defaultState =fromJS({
    doucumentId:[],
    checked:'',
    visibleState: false,
    comparsionList:[],
    newcomparsionList:[],
    comparsionListCountent:''
    

})

export default( state=defaultState, action) => {
    switch(action.type) {
        case constants.GET_DOCUMENT_NAME_LIST:
            return state.merge({
                doucumentId: action.doucumentId
            })
        case constants.GET_HANGDLE_CHECKED:
           
            return state.merge({
                checked:action.checked
            })
        case constants.CHANGE_MODEL_SHOW:
            
            return state.merge({
                visibleState:action.visible
            })
        case constants.GET_COMPARSION_LIST:
            console.log(action.comparsionList) 
            return state.merge({
               
                ...state, comparsionList: action.comparsionList
            })
        case constants.COMPARISION_DOCUMENT_CONTENT:
            console.log(action.comparsionListCountent) 
            return state.merge({
                
                ...state, comparsionListCountent: action.comparsionListCountent.data
            })
        case constants.CHANGE_SELECT_SAMPLE_DATA:
            console.log(action.changeSelectSample) 
            return state.merge({
                
                ...state, comparsionListCountent: action.changeSelectSample
            })
        // case constants.CHANGE_COMPARSION_LIST:
        //     console.log(action.changeComparsionList) 
        //     return state.merge({
                
        //         ...state,comparsionList: action.changeComparsionList,newcomparsionList:action.changeComparsionList
        //     })
        default:
            return state;
    }
}
