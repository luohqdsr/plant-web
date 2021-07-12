import { fromJS, List } from 'immutable'
import * as constants from './constants'
const defaultState =fromJS({
    InitDone:false



})


export default( state=defaultState, action) => {
    switch(action.type) {

        case constants.CHAGE_INIT_DONE:
            console.log(action.InitDone)
            return state.merge({
                InitDone: action.InitDone
            })
        default:
            return state;

    }
}