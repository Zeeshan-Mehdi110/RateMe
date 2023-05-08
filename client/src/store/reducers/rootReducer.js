import { combineReducers } from "redux";
import alertReducer from "./alertReducer";
import progressBarReducer from "./progressBarReducer";

const allReducers = {
  alert: alertReducer,
  progressBar : progressBarReducer,
}

const rootReducers =  combineReducers(allReducers);
export default rootReducers;