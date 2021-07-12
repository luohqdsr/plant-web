import React, {Component} from  'react';
import {Layout,  Select, Button, Row, Col  }  from 'antd';
import { Popover } from 'antd';
import {CloseSquareOutlined} from '@ant-design/icons';
import './index.less'
import intl from 'react-intl-universal';
import _ from 'lodash';
import axios from 'axios';
import { actionCreatores } from './sotre/index';
import {connect} from 'react-redux'
import { emit } from "../../emit/index";
const SUPPOER_LOCALES = [
{
    name: 'English',
    value: 'en-US'
},
{
    name: '简体中文',
    value: 'zh-CN'
},
{
    name: '繁體中文',
    value: 'zh-TW'
}
];

const { Header } = Layout;
class NavLinkBar extends Component{
    componentDidMount() {
    }





    onSelectLocale= (e) =>{
        console.log(e)
      
        localStorage.setItem('change_language', e);
        window.location.reload();
        //emit.emit('change_language', e);

        //this.loadLocales(e)
    };
    ca=(e)=>{
        console.log(1)
    }
    'Parameters.Plants.SolidityCompactness.C_Name'
    render(){
        const {Option} = Select
        return(
            <div className ="navLink-box">
                <Layout>
                    <Header >
                        <Row>
                          
                             <Col   flex={3}>  
                                <div className="closeWindow">
                                    <Button type="primary" icon={<CloseSquareOutlined /> } ></Button>
                                 </div> 
                                
                            </Col>
                          
                            
                            <Col flex={21} ><div className="threeDModel">
                            3D-MODEL
                                </div> </Col>
                            <Col  flex={3}>
                                <div className = "languageTranslation">
                                    <Select onChange={this.onSelectLocale} defaultValue={localStorage.getItem('change_language')|| 'zh-TW'}>
                                        <Option key= "zh-TW" value ="zh-TW"> 繁體中文 </Option>
                                        <Option key= "en-US" value ="en-US"> English </Option>
                                    </Select>

                                </div>
                               
                                {/* <Popover placement="topLeft" title={intl.get('UI.PlantParameters')} content={intl.get('UI.PlantParameters')}>
                                    <Button>{intl.get('UI.PlantParameters')}</Button>
                                </Popover> */}
                            </Col>
                        </Row>
                    </Header>
                </Layout>
            </div>
            
        )
    }
}

const mapState = (state) => ({
    imgList : state.getIn(['model', 'imgList']),
    imgIndex: state.getIn(['model','imgIndex']), 
    

    
})
const  mapDispatch = (dispatch) => ({
    changeInitDone (value){
        dispatch(actionCreatores.changeInitDone(value))
    }



})
export default connect(mapState, mapDispatch)( NavLinkBar);

