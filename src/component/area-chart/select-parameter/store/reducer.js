import { fromJS } from 'immutable'
import * as constants from './constants'

const defaultState = fromJS({
    plantButtonList:[],
    leafButtonList:[],
    plantTargetKeys:[],
    leafTargetKeys:[],
    plantBUTTONS:[],
    leafBUTTONS:[]
})

export default (state =defaultState, action)=>{
    switch(action.type){
        case constants.RENDER_LEAF_BUTTON:
            return state.merge({
                
                leafButtonList: action.payload
            })
        case constants.RENDER_PLANT_BUTTON:
            console.log( action.plantButtonList )
            return state.merge({
                plantButtonList: action.plantButtonList,
            })
        case constants.HANDLE_CHANGE_LEAF_TARGET:
            return state.merge({
                leafTargetKeys: action.leafTargetKeys
            })
        case constants.HANDLE_CHANGE_PLANT_TARGET:
            console.log( action.plantTargetKeys )
            return state.merge({
                plantTargetKeys: action.plantTargetKeys

            })
        case constants.RENDER_PLANT_BUTTONS:
            console.log( action.renderPlantButton)
            return state.merge({
                plantBUTTONS: action.renderPlantButton

            })
        case constants.RENDER_LEAF_BUTTONS:
            console.log( action.renderLeafButton)
            return state.merge({
                leafBUTTONS: action.renderLeafButton

            })
        default:
            return state;
    }
}