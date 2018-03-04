import { combineReducers } from 'redux';
import coinsReducer from './coinsReducer';

const rootReducer = combineReducers({
  coins: coinsReducer,
});

export default rootReducer;
