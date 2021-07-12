import React,{Component} from 'react';
import { List, Modal,Checkbox,Button,Image, Select,Dropdown,Menu}  from 'antd';

import {connect} from 'react-redux'
import { actionCreatores } from './store';
import {DeleteOutlined } from '@ant-design/icons';

import { HashRouter as Router, Link, Route } from 'react-router-dom';
import { withRouter } from 'react-router-dom'
import { DownOutlined } from '@ant-design/icons';
import axios from 'axios'

import './index.less'
import { actionCreators } from '../select-parameter/store';
const { Option } = Select

class SelectItems extends Component{
    constructor(props){
        super(props)
        this.state={
            visibleState:false,
            checkboxArray: [],
            comparisionID:'',
            fileName:this.props.fileName,
            comparisionList:'',
            selectPLant:'',
            selectDocumentName:'',
            comparsionListCountent:[...this.props.comparsionListCountent]
           

        }

    }
    static getDerivedStateFromProps(nextProps, prevState) {
        //该方法内禁止访问this
        if (nextProps.comparsionListCountent !== prevState.comparsionListCountent) {
            //通过对比nextProps和prevState，返回一个用于更新状态的对象
            return {
                comparsionListCountent: nextProps.comparsionListCountent
            }
        }
        //不需要更新状态，返回null
        return null
}
    componentDidMount(){

        this.getDoumentPath()
       
        let path= console.log(this.props.location.search)
        let query ;
        if(path){
            query = path;
            

        }else{
            query = this.props.location.search;

        }
        //const query = this.props.location.search;

        const arr = query.split('&')
        const documentName =arr[0].slice(9) // '1'

     


        axios.post('/user/getComparison',{documentName}).then(res=>{
            if(res.status ==200&& res.data.code ===0){
                let List = [...res.data.data]
                let arr =[];
                for (let i in List)
                 {
                    arr.push({ label:  List[i], value:  List[i] });        //key
                    //arr.push(obj[i]); //值
                }
              


                this.setState({
                    comparisionList:arr
                })
            
            }
        })
  
    }

    shouldComponentUpdate(nextProps, nextState){
        if(this.state.checkboxArray !=nextState.checkboxArray){
            return true
        }
        if(this.state.comparsionListCountent !=nextState.comparsionListCountent){
            return true
        }

    }

    shouldComponentUpdate(nextProps,nextState){
        if(nextProps.location !=this.props.location.search){
            return true
        }


        if(nextState.checkboxArray !=this.state.checkboxArray){
            return true
        }

        if(nextState.fileName !=nextProps.fileName){
           
      
            
            return true
        }
        if(nextState.fileName !=nextProps.fileName){
           
        
            
            return true
        }
        if(nextState.sampleID !=this.props.sampleID){
           
            return true
        }

        return false 

    }
    getDoumentPath(){
        const query =this.props;

    }
 


    handleCancel = () => {
        
        this.setState({visibleState:false})
    };
    handleOk= () => {
    this.props.changeSHowState(true)
   
    };

    showSelectButton=()=>{
        this.setState({visibleState:true})
        const checkBOx = [...this.state.checkboxArray]
        console.log(this.props.comparison_Document)
        const fileName = this.props.parameters[0].Name
       
        this.props.getSelectSampleIDData(fileName ,checkBOx);


        
    };

    deletChecked (value){

        const obj = [...this.state.checkboxArray];
        let a = obj.indexOf(value);  //  a:2
        obj.splice( a, 1);
        this.setState({checkboxArray:obj});

        const showImg = [...this.state.comparsionListCountent];
   
        let showImgValue = showImg.findIndex(text=>text._document_Name ===value);  //  a:2
        showImg.splice(showImgValue, 1);

        this.props.changeSelectSampleIDData([...showImg])

    }

    showSampleId(sample_ID){
        let arr = []
        for (let i in sample_ID.data) {
            arr.push(sample_ID.data[i]); 
        }
        return arr.map((item,index)=>{
         
            return<Option value={item}>{item}</Option>
        })
    }

    showDocuments(comparison_Document){

        let arr =[];
        for (let i in comparison_Document)
         {
            arr.push({ label:  comparison_Document[i], value:  comparison_Document[i] });        //key
            //arr.push(obj[i]); //值
        }
       
        return arr
        
    }
    selectDefaultValue(filename){
       
        if(filename){
            return {value: filename}
        }else{
            return null
        }

    }
    downOnChange(documentName){
        let ChooseIdBox = documentName
        this.setState({selectDocumentName:documentName})
        this.props.comparision_ID(ChooseIdBox)


        axios.post('/user/getComparison',{documentName}).then(res=>{
            if(res.status ==200&& res.data.code ===0){
                let List = [...res.data.data]
                let arr =[];
                for (let i in List)
                 {
                    arr.push({ label:  List[i], value:  List[i] });        //key
                }
                this.setState({
                    comparisionList:arr
                })
            }
        })




    
    }
    
    selectID= (checkedValues) =>{
        this.setState({
            checkboxArray:checkedValues
            

        })
 
    }





    render (){
        const {visibleState,comparisionList,comparsionListCountent} =this.state
        const {fileName,comparison_Document,sample_ID} = this.props
        const columns=[{
            title:'DATA-ID',
            dataIndex: 'name'
        }]

        return(
            
            <div className="SelectItems-box">


                  <div className="dropdown-box">

                    <div className="Sample_text">
                        Sample-ID
                    </div>
               
                    <div className="Sample_ID" >
                        <Select placeholder="Select a Document" onChange={this.downOnChange.bind( this)} >
                            {this.showSampleId(sample_ID)}
                        </Select>

                    </div>

                </div>


                <div className="warpper-SelectItems-box">
                    <div class = "SelectIems">
                        

                        <Checkbox.Group onChange={this.selectID}  
                            
                            options={comparisionList} 
                            value= {this.state.checkboxArray}
                            >
                            
                        </Checkbox.Group>

                    </div>
                <div className="compareButton">
                    <div className = "showCompareButton">
                        <Button onClick={this.showSelectButton.bind(sample_ID)}>
                            对比
                        </Button>

                    </div>
                 
                    
                    <Modal
                        className="show-Select-Model"
                        title="comparison"
                        onOk={this.handleOk}
                        visible={visibleState}
                        onCancel={this.handleCancel}
                    >
                            <Checkbox.Group 
                            className="show-Select-Model"
                            onChange={this.onChange}  >
                                    <List
                                        itemLayout="horizontal"
                                        dataSource={ comparsionListCountent}
                                        renderItem={(item,index) => (
                                            <div className="ListItems">
                                              
                                                    <Image
                                                    
                                                    src={"https://3d-plantdata.oss-cn-beijing.aliyuncs.com/"+item._property+"/"+item._document_Name+"/image/"+item.parameters[0].date+"__topview.png"}           
                                                    /> 
                                                    <List.Item>              
                                                    <List.Item.Meta
                                                        title={`property : ${item._property}`}
                                                    />
                                                    <List.Item.Meta
                                                        title={`name : ${item._document_Name}`}
                                                    />
                                                    </List.Item>
                                                    <div  className="select-handle-Button">
                                                        <Button>s</Button>
                                                        <Button value={item._document_Name} onClick={() =>this.deletChecked(item._document_Name)} icon ={<DeleteOutlined />}></Button>
                                                    </div>
                                            </div>                                         
                                        )}
                                        >                                           
                                </List>
                            </Checkbox.Group>
                    </Modal>

                </div>

                </div>
            </div>
            

            

        )
    }
}

    const mapState = (state) =>({
        fileName : state.getIn(['model', 'documentName']),
        comparison_Document : state.getIn(['model', 'comparison_Document']),
        sample_ID : state.getIn(['model', 'sample_ID']),
        sampleCheckValue : state.getIn(['sampleId','checked']),
        plantButtonList: state.getIn(['button','plantButtonList']),
        parameters: state.getIn(['model','parameters']),
        comparsionListCountent: state.getIn(['sampleId','comparsionListCountent']),

    })
    const mapDispatch = (dispatch) => ({


        changeSHowState(showStates){
            dispatch(actionCreatores.changeShow(showStates))

        },
        deletCheckedValue(valueName){
            dispatch(actionCreatores.deletCheckedButton(valueName))
        },
        getInPlantComparsinMSG(sampleIndex,buttonList){
            dispatch(actionCreatores.getInComparsionMSG(sampleIndex,buttonList))
        },
        comparision_ID(selectDocument){

            dispatch(actionCreatores.comparisionIDList(selectDocument))
        },
        getSelectSampleIDData(ID,selectSample){
            dispatch(actionCreatores.getSelectSampleID(ID,selectSample))
        },
        changeSelectSampleIDData(selectSample){
            dispatch(actionCreatores.changeSelectSampleIDData(selectSample))
        }

    })

export default withRouter(connect(mapState,mapDispatch)(SelectItems))
