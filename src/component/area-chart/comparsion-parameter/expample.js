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
const { Option } = Select;

class comparisonParameter extends Component{
    constructor(props){
        super(props)
        this.state={
            Datacolumns:'',
            DatacoSource:''
           
        }
        
    }
    componentWillMount(){
        echarts.registerTheme('Imooc',eachartTheme) //主题
    }
    


   

    getOption =()=>{
       
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
            }],
            series:[
                
                {
                type: 'line',
                symbol: 'none',
                // encode: {
                //     x:  this.props.xAxisPatameter,
                //     y:  [["2019/4/16 05:06:42", 9.218085289001465],["2019/4/16 05:06:42", 9.218085289001465]],
                // },
                data: [['2018-03-23 13:35:47',  1310],['2018-03-22 13:35:47',  420]]
               
            },{
                type: 'line',
                symbol: 'none',
                // encode: {
                //     x:  this.props.xAxisPatameter,
                //     y:  [823,  1330],
                // },
                data: [['2018-03-10 13:35:47',  1320],['2018-03-22 13:35:47',  320]],
               
            }]
        };
        
        return option;

    }
    sda=()=>{
        console.log(this.props.comparsionLists)

    }

 
      componentWillReceiveProps(nextProps, nextContext ) {
        //判断如果props发生改变
            if (nextProps.comparsionLists !== this.props.comparsionLists) {
                console.log(nextProps.comparsionLists)
                
             
              this.defaultDatacolumns(nextProps.comparsionLists)
              this.defaultDataSource()
            }
          }

    defaultDatacolumns = (comparsionLists) =>{
   
        let dataArry = [];
        let list = comparsionLists
        console.log(list)

        let parameters ={}
        parameters.title = '参数'
        parameters.dataIndex ='parametersName'
        dataArry.push(parameters)
                // list.forEach((item,value,index)=>{
        //     let obj ={}
        //     obj.title = String('PLANT_'+item.filename)
        //     obj.dataIndex=  String('PLANT_'+item.filename)
        //     obj.render =(value, row, index) => {
        //         if(index ==0){      
        //             return <Image src={value}></Image>
        //         }else if(index ==1){
        //             return  <Select defaultValue={value[0]}  >
        //                         {value.map((item,index)=>{
        //                                 return <Option key={index} value= {item}>{item}</Option>
        //                             })}
        //                     </Select>
        //         }else{
        //              return <Image src={value}></Image>
        //         }
        //     }
        //     console.log(obj)
        //     dataArry.push(obj)
        // })

        this.setState({Datacolumns:dataArry})
        // return (dataArry)
        

        
    }
    defaultDataSource = () =>{
        
        let sourceArray =[]
        let imageName = {key:"imageName",parametersName :'植物圖像'}
        let select = {key:"imageName",parametersName :'時間選項'}
        sourceArray.push(imageName)
        sourceArray.push(select)

        console.log(this.props.plantButtonList)
        this.props.plantButtonList.forEach((item,index,value)=>{
            let obj ={}
            obj.key= item.key;
            obj.parametersName=item.title
            sourceArray.push(obj)
           
        })
        this.setState({DatacoSource:sourceArray })
        
        



    }



    render(){
        //0.图像  //1.下拉选单
    const dataSource = [{
        key: '0',
        PLANT_100: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
        PLANT_200:"https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
        PLANT_300:"https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
     
       
       
      }, {
        key: '1',
        PLANT_100: [1,3,5,6,1],
        PLANT_200:[1,3,5,6,1],
        PLANT_300:[1,3,5,6,1], 
      }
      ,  {
        key: '2',
        PLANT_100: 454564,
        PLANT_200:456456,
        PLANT_300:4564565, 
      }
    ]


        return (
            <div>
               
                {console.log(this.props.comparsionLists)}

              
                <div className ="Modal-box">
                    <Modal
                        className="comparsion-box"
                        title="Basic Modal"
                        visible={this.props.showState}
                        cancelText
                        footer={null} 
                        >
                            <Table 
                            dataSource={this.state.DatacoSource}
                            columns={ this.state.Datacolumns}
                            pagination={false}

                            ></Table>

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
   
    comparsionLists: state.getIn(['sampleId', 'comparsionList']),
    plantButtonList: state.getIn(['button','plantButtonList'])


  


})
const mapDispatch =(dispatch) =>({
 
   
})

export default connect(mapState, mapDispatch)(comparisonParameter)