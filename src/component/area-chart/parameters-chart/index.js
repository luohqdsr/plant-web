import React ,{Component} from 'react';

import eachartTheme from './echartTheme'
// 引入 ECharts 主模块
import echarts from 'echarts/lib/echarts';
// 引入柱状图
import  'echarts/lib/chart/bar';
// 引入提示框和标题组件
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';

import ReactEcharts from 'echarts-for-react';
import {connect} from 'react-redux'
import './index.less'
import { actionCreatores } from './store';
class ParametersChart extends Component{
    constructor(props){
        super(props);
        this.state={

            plantChecked:this.props.plantChecked,


            parameters: this.props.parameters
            

        }

    }
    
    static getDerivedStateFromProps(nextProps, prevState){

        if (nextProps.plantChecked !== prevState.plantChecked) {
            return {
                plantChecked : nextProps.plantChecked,
                parameters:nextProps.parameters
            }
        }
    }

    
    shouldComponentUpdate(nextProps, nextState) {
        if( nextProps.plantChecked !==this.props.plantChecked){

            console.log(nextProps.plantChecked)
           
            const instance = this.echartsReact.getEchartsInstance();
            if (instance) {
                instance.setOption(this.getOption( nextProps.parameters,nextProps.plantChecked),true);
              }
            
            return true
        }
        if( nextProps.plantChecked !==this.props.plantChecked){
            console.log(nextProps.plantChecked)
            return true
        }
        //return true
	} 

    componentWillMount(){
        echarts.registerTheme('Imooc',eachartTheme) //主题
    }
    getOption =(parameters,plantChecked)=>{
        console.log(parameters);
        let option = {
          
            xAxis: {
                axisLabel: {
                    color: "white" //刻度线标签颜色
                },
                type: 'time',
                
                splitLine: {
                    lineStyle: {
                        color: '#F0FFF0'
                    }
                },
              

                ticks: {
                    fontColor: "white",  // this here
                  }
            },
            tooltip: {
                trigger: 'axis'
            },
           
            yAxis:[ {
                name:'y1',

                position: 'left',
                areaStyle: {
                    normal: {
                        color: '#091e3b' //改变区域颜色
                    }
                },

                axisLabel: {
                    color: "white" //刻度线标签颜色
                },
 
                
                type: 'value',splitLine: {
                    show: false
                },
                axisLine: {
                    show: true,
                    lineStyle: {
                        color: '#02C874'
                    }
                }
            }, {
                name:'y2',

                position: 'right',

                axisLabel: {
                    color: "white" //刻度线标签颜色
                },
 
                
                type: 'value',splitLine: {
                    show: false
                },
                axisLine: {
                    show: true,
                    lineStyle: {
                        color: '#F75000'
                    }
                }
            }]
           
          ,dataZoom: [{
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
                handleSize: '120%',
                textStyle: {
                    color: '#ffffff'
                }
            }],
            
            
            title: {

                text: 'Paramter Line Chart',
     
                left: 'center',


                textStyle: {
                   // font-family:'Microsoft JhengHei',
                   fontFamily:'Microsoft JhengHei',
                    color: '#ffffff'
                }
                    


            },
            series:  this.renderDataOfaXis(parameters,plantChecked)
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

    renderDataOfaXis(parameters,plantChecked){
        const { Trans } =this.props;
        const allParameters =[...parameters];

        let arr = []
        const dates = "date"
        console.log(plantChecked)
        if(plantChecked){
            plantChecked.map((item,index)=>{
                let obj = {};
                obj.type ='line'
                obj.label ='';
                obj.smooth=true
                obj.symbol= 'circle'
                console.log(index)

                if(index==0){
                    console.log('y1')
                    obj.name ='y1'
                    obj.symbolSize =8
                    obj.itemStyle= {
                        normal: {
                            color: '#02C874	', //改变折线点的颜色
                            lineStyle: {
                                color: '#02C874	' //改变折线颜色
                            }
                        }
                    }

                }else{
                    obj.name ='y2'
                    console.log('y2')
                    obj.yAxisIndex =1
                    obj.symbolSize =8
                    obj.itemStyle= {
                        normal: {
                            color: '#F75000		', //改变折线点的颜色
                            lineStyle: {
                                color: '#F75000	', //改变折线颜色
                                width: 2,
                         
                            }
                          
                        }
                    }
                  
                }
                
                obj.data= [];

                allParameters.forEach(element => {
                    obj.label=element;
                    let parametersDate = []
                    const noewDate = this.renderEchartOfXAxis(element.date);
                    parametersDate.push(noewDate)
                    parametersDate.push(element[Trans[0][item]])
                    obj.data.push(parametersDate)
                });
                arr.push(obj)////[['2018-03-10 13:35:47',  1320],['2018-03-22 13:35:47',  320]]
            })
        }
        return arr;
    }





    render(){

    const {ImgIndx,parameters,plantChecked} =this.state
        return(
            <div className="wrap-Echarts-block">
                <div className="Echarts-block">
                        <ReactEcharts 
                        ref={e => {
                            this.echartsReact = e;
                        }}
                        option={this.getOption(parameters,plantChecked)} 
                        theme="Imooc"  
                        style={{height: '100%',width:'100%', paddingTop:"1rem"}}/>
                </div>
            </div>
        )
    }
}


const mapState = (state) =>({

    plantChecked: state.getIn(['patametersButton', 'plantChecked']),

    ImgIndx: state.getIn(['model','imgIndex']),
    parameters: state.getIn(['model','parameters']),
    Trans:  state.getIn(['model','Trans'])
  
})
const mapDispatch =(dispatch) =>({

})

export default connect(mapState, mapDispatch)(ParametersChart)