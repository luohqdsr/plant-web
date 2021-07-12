import React, {Component} from  'react'

import NavLinkBar from '../../component/area-chart/navlink/index'
import ThreeDComparison from '../../component/area-chart/3D-comparison-view/index'
import ParametersChart from '../../component/area-chart/parameters-chart'
//import SelectItems from '../../component/area-chart/select-parameter/plant-select'
import ChooseIdBox from '../../component/area-chart/select-id-box/'
import ParametersText from '../../component/area-chart/parameters-texts/'
import ComparisonParaneter from '../../component/area-chart/comparsion-parameter/index'
// import comparisonButton from '../../component/area-chart/comparison-Button'
import {Row ,Col} from 'antd';
import './index.less'
import { withRouter } from 'react-router-dom'
class DataComparison extends Component{

    // constructor(props){
    //     super(props)
    //     //const params = new URLSearchParams(porps.location.search)
    //      console.log(props.match.params.idPath)
    //   }


    render (){
        return(
            <div className="main-page">
                <Row className ="NavLink">
                    <Col span={24} >
                        <NavLinkBar></NavLinkBar>

                    </Col>

                </Row>

                
                <Row className="main">
                    <Col span={24} className ="threeD-Interface">
                        
                        <ThreeDComparison></ThreeDComparison>
                    </Col>
                    
                    <Col span={24}  className="parameters-block">

                        <Row className="wrap-parameters-block" >
                            <Col span={24} >
                                <ParametersText></ParametersText>
                            </Col>
                        </Row>

                        <Row className="wrap-chart-block">
                            <Col span={16}>
                                <ParametersChart></ParametersChart>
                            </Col>
                            <Col span={8}>
                                <ChooseIdBox></ChooseIdBox>
                            </Col>
                        </Row>
                        
                    </Col>

                
                </Row>
 
                <ComparisonParaneter></ComparisonParaneter>

                
            </div>
            


        )
    }
}
export default withRouter(DataComparison)