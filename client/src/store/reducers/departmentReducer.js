import { departmentActions } from "../actions/departmentActions";

const initialState = {
  records: []
};

function departmentReducer(state = initialState, action) {
  switch (action.type) {
    case departmentActions.ADD_DEPT:
      const newDepartmentsArray = [action.department, ...state.records]
      return {
        ...state,
        records: newDepartmentsArray
      }
    case departmentActions.UPDATE_DEPT:
    case departmentActions.REMOVE_DEPT:
    case departmentActions.DEPTS_LOADED:
      return {
        ...state,
        records: action.departments
      }

    default:
      return state;
  }
}

export default departmentReducer;
