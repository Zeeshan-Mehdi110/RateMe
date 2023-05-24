import { combineReducers } from 'redux'
import alertReducer from './alertReducer'
import progressBarReducer from './progressBarReducer'
import authReducer from './authReducer'
import departmentReducer from './departmentReducer'

const allReducers = {
  alert: alertReducer,
  progressBar: progressBarReducer,
  auth: authReducer,
  departments: departmentReducer
}

const rootReducers = combineReducers(allReducers)
export default rootReducers
