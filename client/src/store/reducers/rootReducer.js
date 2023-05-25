import { combineReducers } from 'redux'
import alertReducer from './alertReducer'
import progressBarReducer from './progressBarReducer'
import authReducer from './authReducer'
import departmentReducer from './departmentReducer'
import userReducer from './userReducer'

const allReducers = {
  alert: alertReducer,
  progressBar: progressBarReducer,
  auth: authReducer,
  departments: departmentReducer,
  users: userReducer
}

const rootReducers = combineReducers(allReducers)
export default rootReducers
