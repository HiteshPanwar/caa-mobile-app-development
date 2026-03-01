import { combineReducers } from 'redux';
import reducer from './reducer';
import {AuthReducer} from './AuthReducer'
const rootReducer = combineReducers({ reducer,AuthReducer });
export default rootReducer;
