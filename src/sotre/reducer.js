import { combineReducers } from 'redux-immutable';

import { reducer as threeDComparisonVieReducer } from '../component/area-chart/3D-comparison-view/store/index'
import { reducer as renderParameterButton } from '../component/area-chart/select-parameter/store/index.js'
import {reducer as renderSelectParameterButton} from '../component/area-chart/parameters-texts/store/index'
import { reducer as SampleOfPlant  } from '../component/area-chart/parameters-chart/store/index'
import { reducer as echartParameters } from '../component/area-chart/parameters-chart/store/index'
import { reducer as selectSampledId} from '../component/area-chart/select-id-box/store/index'
import { reducer as comparisonParameter} from '../component/area-chart/comparsion-parameter/store/index'
import { reducer as navLink} from '../component/area-chart/navlink/sotre/index.js'
const reducer = combineReducers({
    model:threeDComparisonVieReducer,
    button: renderParameterButton,
    patametersButton: renderSelectParameterButton,
    Sample: SampleOfPlant,
    echart:echartParameters,
    sampleId:selectSampledId,
    comparisonChart:comparisonParameter,
    navLink :navLink
    
});
export default reducer;