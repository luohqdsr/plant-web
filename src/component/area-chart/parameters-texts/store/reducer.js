import { fromJS, List } from 'immutable'
import * as constants from './constants'
const defaultState =fromJS({

    leafParametersPath :'',
    plantChecked: [],
    leafChecked:[],
    sampleOfXaXis: '',
    ChartColor:["#008B00","#00BFFF"]



})


export default( state=defaultState, action) => {
    switch(action.type) {
        case constants.LEAF_DATA_PATH:
            return state.merge({
                leafParametersPath: action.leafParametersPath
            })
        case constants.HANDLE_DELETE_PLANT_CHECKED:
            const Checked =action.plantChecked
            console.log(Checked)
            console.log(List(state.get('plantChecked')))
            return state.merge({
                
                ...state,plantChecked: List(state.get('plantChecked')).splice(List(state.get('plantChecked')).indexOf(Checked), 1)
            })
            // return { ...state, plantChecked: action.payload }
            // return { ...state, plantChecked: action.handleDeletCheckedButton }
        case constants.HANDLE_ADD_PLANT_CHECKED:
            console.log(action.plantChecked)
            return state.merge({
                ...state,plantChecked: List(state.get('plantChecked')).push(action.plantChecked)
            })
        case constants.GENERATED_XAXUS_DATA :
            return state.merge({
                sampleOfXaXis: action.sampleOfXaXis
            })

        case constants.ADD_PLANT_PARAMETERS :
            return state.merge({
                ...state,plantParameters: action.plantParameters

                
            })
            // return { ...state, plantChecked: action.payload }
            // return { ...state, plantChecked: action.handleAddCheckedButton }
        default:
            return state;

    }
}