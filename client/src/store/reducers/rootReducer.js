import { combineReducers } from "redux";
import alertReducer from "./alertReducer";
import progressBarReducer from "./progressBarReducer";
import authReducer from "./authReducer";

const allReducers = {
  alert: alertReducer,
  progressBar : progressBarReducer,
  auth : authReducer,
}

const rootReducers =  combineReducers(allReducers);
export default rootReducers;