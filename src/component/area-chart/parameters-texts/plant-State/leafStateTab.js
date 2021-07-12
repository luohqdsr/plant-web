import React, {Component} from  'react';
import {Button,Form,Row ,Col ,Radio,Input} from 'antd'
import {connect} from 'react-redux'
import { actionCreatores } from '../store';
import {  Select } from "antd";
import intl from 'react-intl-universal';
import axios from 'axios'
class LeafStateTab extends Component{
    constructor(props) {
        super(props);
        this.state ={
            JSONdata:'',
            colorNum:0

        }
    }

    static getDerivedStateFromProps(nextProps, prevState){


        if (nextProps.selectParameters !== prevState.selectParameters) {
            return {
                selectParameters : nextProps.selectParameters
            }
        }
        if (nextProps.imgIndex !== prevState.imgIndex) {
            return {
                imgIndex : nextProps.imgIndex,
            }
        }

        
    }


    shouldComponentUpdate(nextProps,nextState){

        if ( nextProps.selectParameters !== this.props.selectParameters ){
        
            
            return true; 
        }

        if ( nextProps.plantChecked !== this.props.plantChecked ){
        console.log(nextProps.plantChecked )
            
            return true; 
        }
        if ( nextProps.imgIndex !== this.props.imgIndex ){
        
            
            return true; 
        }
        if(nextProps.fileId !=this.props.fileId){
            
            
            return true
        }

        return false; 
    }

    renderButtonMenue= ( selectParameters)=>{
        const { parameters } =this.props;
        const { imgIndex } =this.props;
        const parametersData = parameters[imgIndex];
        const { Trans } =this.props;
    
        if(selectParameters == undefined){
            return null
        }else{
            return selectParameters.map((item) =>{
                    if ( parametersData[Trans[0][item]]){
                        let parameterShow;
                        let centroidParamter=[];
                        if(item ==='Centroid'){
                            parametersData[Trans[0][item]].map((item)=>{
                                centroidParamter.push(item.toFixed(2))

                            })
                   
                            parameterShow =centroidParamter
                        }else{
                            parameterShow =Number(parametersData[Trans[0][item]]).toFixed(2)
                        }
                        return (
                            <Col span="12" key ={item}>
                                
                                <Row >
                                    <Col span="14" > 
                                        <Radio.Button value={item}  disabled={this.isDisabled(item)} style={this.setSelectColor(item)}  >{intl.get(`Parameters.Plants.${item}.C_Name`)}</Radio.Button>
                                    </Col>
                                    <Col span="10" >
                                            <p className="ant-form-text"  name="userName">{parameterShow}</p>
                                        </Col>
                                </Row>
                              
                            </Col>
                        )
                    
                    }else{
                        console.log('无此参数')
                    }

            })

        }

    }

    handleCheckChange= (e)=>{

        const checkedMenu =this.props.plantChecked.toJS()

        console.log(e.target.value)
        if((checkedMenu).includes(e.target.value)){

            this.props.deleteChecked(e.target.value)
        }else{

            this.props.addChecked(e.target.value)
        }

    }
    isDisabled= (id)=>{
        const checkedMenu =this.props.plantChecked.toJS()
        return checkedMenu.length > 1? (checkedMenu.includes(id) ? false : true) :false
    }
    setSelectColor=(id)=>{
        const checkedMenu =this.props.plantChecked.toJS()
        const selectRGBColor = [...this.props.selectButtonColor];



        return checkedMenu.includes(id) ? {background:selectRGBColor[checkedMenu.length-1]}:{ background: "-webkit-linear-gradient(top, #bebebe, #848484 45%, #231815 46%, #777575)"}
    }
    render(){
        const {selectParameters} = this.props
        return(
     
                <div className="chooseParamter">
                    <Radio.Group value="default" onChange={this.handleCheckChange}>
                        <Row>
                            {this.renderButtonMenue( selectParameters)}
                        </Row>
                    </Radio.Group>
                </div>


        
              
        )
    } 

}

const mapState = (state) => ({
    
    selectParameters: state.getIn(['button', 'plantTargetKeys']),
    plantChecked: state.getIn(['patametersButton', 'plantChecked']),
    fileId : state.getIn(['model', 'documentId']),
    fileName : state.getIn(['model', 'documentName']),
    imgIndex: state.getIn(['model','imgIndex']), 
    selectButtonColor: state.getIn(['patametersButton','ChartColor']),
    parameters: state.getIn(['model','parameters']),
    Trans:  state.getIn(['model','Trans'])
})
const  mapDispatch = (dispatch) => ({

    deleteChecked(value, checked){
        dispatch(actionCreatores.deleteCheckedMenu(value,checked))
    },
    addChecked(value, checked){
        dispatch(actionCreatores.addCheckedMenu(value, checked))
    }



})
export default connect(mapState, mapDispatch)(LeafStateTab);