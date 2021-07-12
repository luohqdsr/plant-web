import { fromJS,List } from 'immutable'
import * as constants from './constants'

const defaultState = fromJS({
    echartSampleOfPlant:'',
    echartSampleOfPleaf:'',
    sampleOfYaXis: '',
    sampleOfXaXis:''

    


})
export default (  state = defaultState, action)=> {
    switch(action.type){
        case constants.POUPULATION_PARAMETER:
            return state.merge({
                echartSampleOfPlant: action.sampleOfPlant
            })

        case constants.GENERATED_YAYUS_DATA :
            console.log(action)
            return state.merge({
                sampleOfYaXis: action.sampleOfYaXis
            })

        case constants.GENERATED_XAXUS_DATA :
            console.log(action)
            return state.setIn(['sampleOfXaXis'],action.sampleOfXaXis) 
       
        default:
            
            return state;


    }
}