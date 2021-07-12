
import React,{Component} from 'react';
import {Transfer, Switch } from 'antd';
import {connect} from 'react-redux'
// import jsonData from "./lang/locale_zh.json";
import axios from 'axios';
import { actionCreators } from '../store';
import '../index.less'
class ChooseIdBox extends Component {
    
    constructor(props) {
        super(props)
        this.state = {
            targetKeys :this.props.plantTargetKeys
        }
    }

    componentWillMount(){
        this.props.renderButton("Plant")
        this.handleChange()
    }
    shouldComponentUpdate(prevProps, prevState){
        if( prevState.plantBUTTONS !==this.props.plantBUTTONS){
         
            return true
        }
        
    }
    handleChange = targetKeys => {
        console.log(targetKeys)
        console.log(this.props.plantBUTTONS)
        this.props.handlePlantChange(targetKeys)
        this.setState({ targetKeys });
        console.log(this.state.targetKeys)
    };
    filterOption = (inputValue, option) => option.description.indexOf(inputValue) > -1;
    componentDidMount(){

    }
    render() {

        return(

            <div className='parameters-id-transfer'>
                <div className= 'transfer-box'>
                <Transfer
                className="asd"
                titles={['Source', 'Target']}
                dataSource={ this.props.plantBUTTONS}
                targetKeys={this.state.targetKeys}
                filterOption={this.filterOption}          
                onChange={this.handleChange}//改变
                render={item => item.title}
            
                />
                </div>
                </div>
        )
    }
}

const mapState =  (state ) => ({

    
    plantTargetKeys: state.getIn(['button', 'plantTargetKeys']),
    plantBUTTONS: state.getIn(['button','plantBUTTONS']),

})
const  mapDispatch = (dispatch) => ({
    renderButton(category) {
        dispatch(actionCreators.renderMenu(category))
    },
    handlePlantChange(targetKeys) {
        dispatch(actionCreators.handlePlantButtonChange(targetKeys))
    }
})

export default connect(mapState, mapDispatch)(ChooseIdBox)