import { combineReducers } from "redux";
import alertReducer from "./alertReducer";

const allReducers = {
  alert: alertReducer,
}

const rootReducers =  combineReducers(allReducers);
export default rootReducers;