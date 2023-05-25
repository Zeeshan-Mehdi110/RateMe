import { departmentActions } from '../actions/departmentActions'

const initialState = {
  records: []
}

function departmentReducer(state = initialState, action) {
  switch (action.type) {
    case departmentActions.ADD_DEPT:
      const newDepartmentsArray = [action.department, ...state.records]
      return {
        ...state,
        records: newDepartmentsArray
      }
    case departmentActions.UPDATE_DEPT:
      return {
        ...state,
        records: state.records.map((item) => {
          if (item._id !== action.department._id) return item
          else return action.department
        })
      }
    case departmentActions.REMOVE_DEPT:
    case departmentActions.DEPTS_LOADED:
      return {
        ...state,
        records: action.departments
      }

    default:
      return state
  }
}

export default departmentReducer
