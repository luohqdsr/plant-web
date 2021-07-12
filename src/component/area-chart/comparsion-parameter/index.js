import React ,{Component} from 'react'
import {connect} from 'react-redux'
import {Button, Modal,Table, Image, Select} from 'antd'

import './index.less'

import eachartTheme from '../parameters-chart/echartTheme'
// 引入 ECharts 主模块
import echarts from 'echarts/lib/echarts';
// 引入柱状图
import  'echarts/lib/chart/bar';
// 引入提示框和标题组件
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import ReactEcharts from 'echarts-for-react';
import { actionCreatores } from '../select-id-box/store';
import { configConsumerProps } from 'antd/lib/config-provider'
const { Option } = Select;

class comparisonParameter extends Component{
    constructor(props){
        super(props)
        this.state={
            comparsionLists:this.props.comparsionLists,
            Datacolumns:'',
            DatacoSource:'',
            visible: this.props.showState,
            newcomparsionList:this.props.newcomparsionList,
            haveSelectButton:''
        }
        
    }


    static getDerivedStateFromProps(nextProps, prevState){

        if (nextProps.showState !== prevState.showState) {
      
            return {
               
                visible: nextProps.showState,
                comparsionLists: nextProps.comparsionLists,
                
            }
        }
    }
    componentWillMount(){
        echarts.registerTheme('Imooc',eachartTheme) //主题
    }
    
    shouldComponentUpdate(nextProps, nextState) { 
        // Rendering the component only if  
        // passed props value is changed 
        if (nextProps.showState !== this.props.showState) {
      
            this.defaultDataSource();
            this.defaultDatacolumns();
            return true; 
        }
        if (nextState.DatacoSource !== this.state.showState) {
      
          
            return true; 
        }

      } 

    handleCancel = () => {
    
        this.props.changeSHowState(false)
    };





    getOption =()=>{
        this.SelectoptionData()
        let option = {
            xAxis: {
                type: 'time',
                
                splitLine: {
                    lineStyle: {
                        color: '#ddd'
                    }
                }
            },
            tooltip: {
                trigger: 'axis'
            },
            yAxis: {
                type: 'value',splitLine: {
                    show: false
                }
            },dataZoom: [{
                type: 'inside',
                xAxisIndex: 0,
                minSpan: 5
            }, {
                type: 'slider',
                xAxisIndex: 0,
                minSpan: 5,
                height: 20,
                bottom: 50,
                handleIcon: 'M10.7,11.9H9.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4h1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
                handleSize: '120%'
            }],series:this.SelectoptionData()
            // series:[
                
            // {
            //     type: 'line',
            //     symbol: 'none',
            //     data: [['2018-03-23 13:35:47',  1310],['2018-03-22 13:35:47',  420]]
            // },
            // {
            //     type: 'line',
            //     symbol: 'none',

            //     data: [['2018-03-10 13:35:47',  1320],['2018-03-22 13:35:47',  320]],
            // }]
        };
        return option;
    }
    renderEchartOfXAxis(doucument){
        let arry =doucument.split("__",3)
        let day=  arry[1].replace(/_/g, '-');
        let date = new Date(day).toLocaleDateString()
        let min =  arry[2].replace(/_/g, ':');
        return date+" "+min
    }
    SelectoptionData = ()=>{
        let {haveSelectButton} =this.state
        const comparsionListCountent = [...this.props.comparsionListCountent]
        let trans = [...this.props.Trans]
        let arr = []
        comparsionListCountent.forEach((comparsionItem,comparsionIndex)=>{
       
                let obj = {};
                obj.type ='line'
                obj.label ='';
                
                obj.data= [];

            
               
                comparsionItem.parameters.forEach((parameters,parametersIndex) =>{
                    const noewDate = this.renderEchartOfXAxis(parameters.date);
                    let parametersDate = [] 
                  
                    parametersDate.push(noewDate,Number(parameters[trans[0][haveSelectButton]]).toFixed(2)) 
     
                    obj.data.push(parametersDate)
                })
                arr.push(obj)
           
    
            

        })
    
        return arr
     
    }



    handleChange=(value) =>{
        const Trans = [...this.props.Trans];


        let  dateArr=value.split("__");
        const selectDate = dateArr[0];
        const comparsionListCountent = [...this.props.comparsionListCountent]
        let obj = comparsionListCountent.find(item => item._document_Name ==selectDate)
        let changeSowData = obj.parameters.find(item => item.date ==value)

        let originalDatacoSource = [...this.state.DatacoSource]
        let changDataName =`PLANT_${selectDate}`;


        const datapath ="https://3d-plantdata.oss-cn-beijing.aliyuncs.com/";

        originalDatacoSource.map((item,index)=>{
            if(index == 0){
                item[changDataName] = `${datapath}${changeSowData.Name}/${selectDate}/image/${value}__topview.png`
             
            }else if(index ==2){
                
               
                    item[changDataName] = changeSowData.Leaf.length
            }else if(index !=1){

                if(item.key == 'Centroid'){

                    const PCParamter = [...changeSowData.pC]
                    let  PCParamterArray = [];
                  
                    PCParamter.forEach((item,index)=>{
              
                        PCParamterArray.push(`${Number(item).toFixed(2)} `) 
                    })
                    item[changDataName] =PCParamterArray
                }else if(item.key =='LeafAreaIndex'){
                    console.log(changeSowData[Trans[0][item.key]])
                    
                }else{
                    item[changDataName] =changeSowData[Trans[0][item.key]].toFixed(2)
                }
            }
        })
        this.setState({DatacoSource:originalDatacoSource})
    }
    ButtonShowParamterChart = (value)=>{
        this.setState({haveSelectButton: this.props.plantButtonList[value-2].key})
    }



    defaultDatacolumns = () =>{
        
        const {comparsionListCountent} = this.props

        let dataArry = []
        let parameters ={}

        parameters.title = '参数'
        parameters.dataIndex ='parametersName'
        parameters.fixed= 'left'
        parameters.width =140
        parameters.render =(value, row, index) => {
            if(index ==0 ||index == 1){      
                return <span> {value}</span>
            }
            else{
                return <Button  onClick={()=>this.ButtonShowParamterChart(index) }  > {value}</Button>
            }

        }
        dataArry.push(parameters)
        let dataset=[...comparsionListCountent]

        const datapath ="https://3d-plantdata.oss-cn-beijing.aliyuncs.com/";
        
        dataset.map((item)=>{
            let obj ={}
            obj.title = String('PLANT_'+item._document_Name)
            parameters.width =140
            obj.dataIndex=  String('PLANT_'+item._document_Name)
            obj.render =(value, row, index) => {
                if(index ==0){      
                    return <Image src={value}></Image>
                }
                else if(index ==1){
                    return  <Select defaultValue={value[0]}   onChange={this.handleChange} >
                                {value.map((item,index)=>{
                                        return <Option key={index} value= {item}>{item}</Option>
                                    })}
                            </Select>
                }
                else{
                    return <span> {value}</span>
                }
            }
            dataArry.push(obj)
        })
 
        this.setState({Datacolumns:dataArry})
    }

    defaultDataSource = () =>{
        
        const obj = [...this.state.comparsionLists];

        const {comparsionListCountent} = this.props

        if(!obj){
            return null
        }
    

        let sourceArray =[]
        let imageName = {key:"imageName",parametersName :'植物圖像',}
        let select = {key:"slectTime",parametersName :'時間選項'}
        sourceArray.push(imageName)
        sourceArray.push(select)
        this.props.plantButtonList.forEach((item,index,value)=>{
            let obj ={}
            obj.key= item.key;
            obj.parametersName=item.title
            sourceArray.push(obj)
        })
    
        let dataset=[...comparsionListCountent]
        let trans = [...this.props.Trans]
        const datapath ="https://3d-plantdata.oss-cn-beijing.aliyuncs.com/";
        sourceArray.map((items, index) => {
            if(index == 0){
                dataset.map((item,index)=>{
                    items['PLANT_'+item._document_Name] =`${datapath}${item._property}/${item._document_Name}/image/${item.parameters[0].date}__topview.png`
                })
            }else if(index == 1 ){
                dataset.map((item)=>{
                    let dateArrary =[];
                    item.parameters.map((item)=>{
                        dateArrary.push(item.date)
                    })
                    items['PLANT_'+item._document_Name] =dateArrary
                })
            }else{
        
                dataset.map((item)=>{
                    let parameters =[...item.parameters]
                    parameters.map((parametersitem)=>{
                        let parametersName =trans[0][items.key]

                        if(parametersName == 'pC'){
                            const PCParamter = [...parametersitem[parametersName]]
                            let  PCParamterArray = [];
                            PCParamter.forEach((item,index)=>{
                                PCParamterArray.push(`${item.toFixed(2)}, `) 
                            })
                            items['PLANT_'+item._document_Name] =PCParamterArray
                        }else if(parametersName == 'pLC'){
                        
                            items['PLANT_'+item._document_Name] =parametersitem.Leaf.length
                        }else{
                            items['PLANT_'+item._document_Name] =Number(parametersitem[parametersName]).toFixed(2);
                        }

                    })
                    
                })

            
            }

        })
        this.setState({DatacoSource:sourceArray})
    }



    render(){
        //0.图像  //1.下拉选单
    // const dataSource = [{
    //     key: '0',
    //     PLANT_100: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
    //     PLANT_200:"https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
    //     PLANT_300:"https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
    // }, {
    //     key: '1',
    //     PLANT_100: [1,3,5,6,1],
    //     PLANT_200:[1,3,5,6,1],
    //     PLANT_300:[1,3,5,6,1], 
    // }
    // ,  {
    //     key: '2',
    //     PLANT_100: 454564,
    //     PLANT_200:456456,
    //     PLANT_300:4564565, 
    // }
    // ]
    const {DatacoSource ,visible} =this.props


        return (
            <div>

              
                <div className ="Modal-box">
                    <Modal
                        className="comparsion-box"
                        title="3D comparsion-box "
                        visible={this.state.visible}
                        onCancel={this.handleCancel}
                        cancelText
                        footer={null} 
                        >
                        <div className="comparsion-Table">
                            <Table 
                            
                                dataSource={this.state.DatacoSource}
                                columns={ this.state.Datacolumns}
                                pagination={false}
                                scroll={{ x:500, y: 800 }}
                                >
                            </Table>
                        </div>
                            <div className="comparsion-chart">
                                    <div className="Echarts-block"> 
                                        <ReactEcharts option={this.getOption()} theme="Imooc"  style={{height: '100%'}}/>
                                    </div>
                            </div>
                    </Modal>
                </div>
            </div>
            
        )
    }
    
}
const mapState = (state) =>({
    showState : state.getIn(['sampleId','visibleState']),
    comparsionLists:  state.getIn(['sampleId','comparsionList']),
    newcomparsionList:  state.getIn(['sampleId','newcomparsionList']),
    plantButtonList: state.getIn(['button','plantButtonList']),
    comparsionListCountent: state.getIn(['sampleId','comparsionListCountent']),
    Trans:  state.getIn(['model','Trans'])
})
const mapDispatch = (dispatch) => ({
    changeSHowState(showStates){
        dispatch(actionCreatores.changeShow(showStates))

    },
    changeComarsionContent(propsState,changeIndex,buttonList){
        dispatch(actionCreatores.changeComarsionMSG(propsState,changeIndex,buttonList))

    }

})

export default connect(mapState, mapDispatch)(comparisonParameter)