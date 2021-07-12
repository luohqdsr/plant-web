
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
            targetKeys :this.props.leafTargetKeys
        }
    }

    componentWillMount(){
        this.props.renderButton("Leaf")
        this.handleChange()
    }
    shouldComponentUpdate(prevProps, prevState){
        if( prevState.leafBUTTONS !==this.props.leafBUTTONS){
         
            return true
        }
        
    }
    handleChange = targetKeys => {

        console.log(this.props.leafBUTTONS)
        this.props.handlePlantChange(targetKeys)
        this.setState({ targetKeys });

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
                dataSource={ this.props.leafBUTTONS}
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
    leafTargetKeys: state.getIn(['button', 'leafTargetKeys']),
    leafBUTTONS: state.getIn(['button','leafBUTTONS']),

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