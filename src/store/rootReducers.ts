import { combineReducers } from '@reduxjs/toolkit';
import systemReducer from './modules/system';
import userReducer from './modules/user';

const rootReducers = combineReducers({
  system: systemReducer,
  user: userReducer
});

export default rootReducers;
