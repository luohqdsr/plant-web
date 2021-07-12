import { createStore, compose, applyMiddleware } from 'redux';
import reducer from './reducer'
import thunk from 'redux-thunk';
//检测
//设置中间键
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer, composeEnhancers(
    applyMiddleware(thunk)
));
export default store;