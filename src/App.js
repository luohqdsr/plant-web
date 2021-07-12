import React, { Component } from 'react';
import {Provider} from 'react-redux';

import store from './sotre/index'
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom'
import intl from 'react-intl-universal';
import DataComparison from './container/comparison-analysis'
import _ from 'lodash';
import axios from 'axios';

import { emit } from "./component/emit";
import {IntlProvider} from 'react-intl';
import { ConfigProvider } from 'antd';




// const locales = {
//   'en-US': require('/lang/en-US.json'),
//   'zh-TW': require('./lang/zh-TW.json'),
// };
const SUPPOER_LOCALES = [
  {
    
    name: 'English',
    value: 'en-US'
  },
  {
    name: '繁體中文',
    value: 'zh-TW'
  }
];


class App extends Component{

    state={
      initDone: false,
      asd:localStorage.getItem('change_language') || 'zh-TW',
      language:'',
      antdLang:  'zh-TW',  // 修改antd  组件的国际化
      
    }


  //state = { initDone: false };
//   static getDerivedStateFromProps(nextProps, prevState){

//     if (nextProps.language !== prevState.language) {
//         return {
//           language : nextProps.language
//         }
//     }
// }



  componentDidMount() {

    localStorage.getItem('change_language', lang => this.loadLocales(lang)); // 监听语言改变事件
     this.loadLocales();
  }
  
  shouldComponentUpdate(nextProps, nextState){
    if(this.state.language !== nextState.language){
         return true;

    } 
  
    if(this.state.initDone !== nextState.initDone){
      return true;
    } 
    return false;
  }

 //http://localhost:3000/plantView/display?sampled=1T001&value=200
 loadLocales() {
   const Locale = this.state.asd
   console.log(this.state.asd)
  let currentLocale = intl.determineLocale({
    urlLocaleKey: 'lang',
    cookieLocaleKey: 'lang'
  });

  console.log(currentLocale);

  // 如果没找到，则默认为汉语
  // if (!_.find(SUPPOER_LOCALES, { value: currentLocale })) {
  //   currentLocale = 'zh-TW';
  // }

  if(Locale ==undefined){
    currentLocale = 'zh-TW';
  }else{
      currentLocale = Locale
  }

  console.log(currentLocale);

  axios
    .get(`/lang/${currentLocale}.json`)
    .then(res => {
      console.log('App locale data', res.data);
      // init 方法将根据 currentLocale 来加载当前语言环境的数据
      return intl.init({
        currentLocale,
        locales: {
          [currentLocale]: res.data
        }
      });
    })
    .then(() => {
      this.setState({ initDone: true });
      this.setState({ language: currentLocale });
      console.log(intl.get('UI.PlantParameters'))
     // language
    });
}

  render() {
    const {language} = this.state

    return(
      this.state.initDone &&(
        <div>
          {console.log(intl.get('UI.PlantParameters'))} 
          {console.log(this.state)} 
         
            <Provider store={store}   >
              
              <BrowserRouter>
                <div>
                  <Switch>
                    <Route path='/plantView/display' exact component={DataComparison} ></Route>
                  </Switch>
                </div>
              </BrowserRouter> 
            </Provider>

         
        
          
            
          
      </div>
      )


    )
  }

}
export default App;
