import React, {Component} from  'react';
import PlantStateTab from './plant-State/plantStateTab.js';
import LeafStateTab from './plant-State/leafStateTab.js';
import PlantSelectItems from '../select-parameter/plant-select/index'
import LeafSelectItems from '../select-parameter/leaf-select/index'
import './index.less'
import { Tabs, Radio} from 'antd';
import {Button,Form,Row ,Col } from 'antd'
import {connect} from 'react-redux'
import { actionCreatores } from './store';
import intl from 'react-intl-universal';
class ParametersText extends Component{
    // constructor(props) {   
    //     super(props);
    //     this.state = {searchStr: ''};
    //     this.handleChange = this.handleChange.bind(this);
    //     }
    constructor(props) {
        super(props)
        this.state={
            mode:'LeafStateTab',
            plantdate:'',
            imgIndex:this.props.imgIndex
            
        }
        // this.handleChange = this.handleChange.bind(this);
    }
    static getDerivedStateFromProps(nextProps, prevState){

        if (nextProps.imgIndex !== prevState.imgIndex) {
            return {
                imgIndex : nextProps.imgIndex,
            }
        }
        
        if (nextProps.plantdate !== prevState.plantdate) {
            return {
                plantdate : nextProps.plantdate,
            }
        }

    }

    shouldComponentUpdate(nextProps,nextState){
       
        if(nextProps.fileName !== this.props.fileName) {
            return true

        }
        if(nextProps.parameters !== this.props.parameters) {
            return true

        }

        if(nextProps.imgIndex !=this.props.imgIndex){
                this.showPlantDate(nextProps.imgIndex)
            return true
        }
        if(nextState.mode !=this.state.mode){
            this.showPlantDate(nextProps.imgIndex)
            return true
        }
        if(nextProps.fileId !=this.props.fileId){
            console.log(this.props.fileId)
            
            return true
        }
    return false


    }


    showPlantDate = (imgIndex)=>{
        const plantNowDate = this.props.imgList[imgIndex]
        const date =this.changeDateFormat(plantNowDate)
    }
    changeDateFormat=(path)=>{
        /*
        const arry = path.split('__')
        const minutes = arry[2].replace('_',':')
        this.setState({
        plantdate:arry[1]+' '+minutes
        
 
    })

        console.log(arry[1]+' '+minutes)
*/

    }

    handleModeChange = e => {
        console.log(e )
        const mode = e.target.value;
        this.setState({ mode });
    };

    callback(val) {
        this.setState( {  numMo: val })
    }
    plantdate=()=>{
        const imageName = this.props.mapListData[this.props.ImgIndx]
    }
    renderTiem(doucument){
        if(doucument){
            console.log(doucument)
            let arry =doucument.date.split("__",3)
            let day=  arry[1].replace(/_/g, '-');
            let date = new Date(day).toLocaleDateString()
            let min =  arry[2].replace(/_/g, ':');
            console.log(date+" "+min)
            return date+" "+min

        }else{
            return null
        }
      
    }
    renderName(doucument){
        if(doucument){
            console.log(doucument)
            let arry =doucument.date.split("__",3)

            return arry[0]

        }else{
            return null
        }
      
    }
    
    render(){
        const { TabPane } = Tabs;
        const { fileId ,parameters} =this.props
        return(
            <div className="parameters-texts">
                <Radio.Group
                className="parameters-class-group"
                onChange={this.handleModeChange} value={this.state.mode} centered="true">
                    <Radio.Button className="leaf-button" value="LeafStateTab">{ intl.get(`UI.Plant`)} </Radio.Button>
                    <Radio.Button className="plant-button" value="PlantStateTab">{ intl.get(`UI.Leaf`)}</Radio.Button>
                </Radio.Group> 
                <Tabs
                    className="tab-content"
                    defaultActiveKey={PlantStateTab} 
                    tabPosition={this.state.mode}
                    activeKey={this.state.mode}
                    onChange={this.callback.bind(this)}
                >

                    <TabPane  key="LeafStateTab">
                        <Row  className="parameters-nametime">
                                <Col span="16">
                                    <Row>
                                        <Col span="10"  className='plant-name'>
                                            <Form.Item label={ intl.get(`UI.Name`)}>
                                            {this.renderName(parameters[this.state.imgIndex])}
                                            </Form.Item>
                                        </Col>
                                        <Col span="14" className='plant-date' >
                                            <Form.Item label={ intl.get(`UI.Time`)}>
                                                {/* {this.state.imgIndex} */}
                                        
                                                {this.renderTiem(parameters[this.state.imgIndex])}
                                            </Form.Item>
                                        </Col>
                                        <Col span="24"  className="parameters-texts-tab">
                                            <div >
                                                <LeafStateTab />
                                            </div>
                                        </Col>
                                    </Row>
                                </Col>

                                <Col span="8">
                                    <Col span={24} className="parameters-texts-select">
                                        <PlantSelectItems></PlantSelectItems>
                                    </Col>                                
                                </Col>
                        </Row>
                        
                        
                    
                    </TabPane>
                    
                    <TabPane  key="PlantStateTab">
                    <Row  className="parameters-nametime">
                                <Col span="16">
                                    <Row>
                                        <Col span="8"  className='plant-name'>
                                            <Form.Item label={ intl.get(`UI.Name`)}>
                                            {this.renderName(parameters[this.state.imgIndex])}
                                            </Form.Item>
                                        </Col>
                                        <Col span="16" className='plant-date' >
                                            <Form.Item label={ intl.get(`UI.Time`)}>
                                                {/* {this.state.imgIndex} */}
                                        
                                                {this.renderTiem(parameters[this.state.imgIndex])}
                                            </Form.Item>
                                        </Col>
                                        <Col span="24"  className="parameters-texts-tab">
                                            <div >
                                                <PlantStateTab />
                                            </div>
                                        </Col>
                                    </Row>
                                </Col>

                                <Col span="8">
                                    <Col span={24} className="parameters-texts-select">
                                        <LeafSelectItems></LeafSelectItems>
                                    </Col>                                
                                </Col>
                        </Row>
                 
                    </TabPane>
                </Tabs>
            </div>
        )
    }
}

const mapState = (state) => ({
    imgList : state.getIn(['model', 'imgList']),
    imgIndex: state.getIn(['model','imgIndex']), 
    fileName : state.getIn(['model', 'documentName']),
    fileId : state.getIn(['model', 'documentId']),
    parameters: state.getIn(['model','parameters'])

    

    
})
const  mapDispatch = (dispatch) => ({


})
export default connect(mapState, mapDispatch)(ParametersText);

