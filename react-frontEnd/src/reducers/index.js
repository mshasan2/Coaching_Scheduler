import { combineReducers } from 'redux';
import slotReducer from './slotReducer';

const rootReducer = combineReducers({
  slots: slotReducer
});

export default rootReducer;
