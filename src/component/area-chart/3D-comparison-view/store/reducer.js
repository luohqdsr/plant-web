//储存空间
import { fromJS } from 'immutable'
import * as constants from './constants'

const defaultState = fromJS({
    documentName:'',
    documentId:'',
    parameters:'', // 数据库内容
    leafIndex: 0,//叶片索引默认0
    plantIndex: 0,
    leafList:[],
    Trans:'',

    sample_ID :[],
    comparison_Document:[],
    

    leafCount:0,
    plantPLY:'',
    imgList:[],
    imgIndex:0,//图片索引
    showImagePath:'',
    
    showLeafIndex: false,
    PLYList:'',
    JSONdata:'',
    leafCountS:''




})

export default (state = defaultState, action) => {
    switch(action.type) {
        case constants.SET_PLANT_PLY_DATA:
 
            console.log(',action.imageList',action.imageList)
            return state.setIn(['imgList'],action.imageList)
        case constants.CHANGE_DOCUMENTNAME_AND_ID:
            console.log("CHANGE_DOCUMENTNAME_AND_ID"+action.documentName)
            return   state.merge({
                ...state,documentName:action.documentName, documentId :action.documentId
            })
        case constants.SELECT_IMG_INDEX:
            return state.merge({
                ...state,imgIndex:action.imgIndex
            })
        case constants.CHANGE_PLY_LIST:
            return state.merge({
                ...state,PLYList:action.PLYList
            })
        case constants.CHANGE_LEAF_COUNT:
            return state.merge({
                
                ...state,leafCountS: action.leafCountS
            })
        case constants.SET_PLANT_PARAMTER_DATA:
            return state.merge({
                ...state,parameters: action.parameters
            })
        case constants.CHANGE_LEAF_TRANS:
            console.log(action.Trans)
            return state.merge({
                ...state,Trans: action.Trans
            })
        case constants.ADD_COMPARISON:
            console.log(action.comparison_Document)
            return state.merge({
                ...state,comparison_Document: action.comparison_Document
            })
        case constants.ADD_SAMPLE_ID:

            return state.merge({
                ...state,sample_ID: action.sample_ID
            })

        default:
            return state;
        
    }

}
