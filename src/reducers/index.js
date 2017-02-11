import { combineReducers } from 'redux';
import {reducer as form} from 'redux-form';
import authReducer from './auth_reducer';


const rootReducer = combineReducers({
  // could also just write form and es6 would extend it to form: form
  form: form,
  auth: authReducer
});

export default rootReducer;
