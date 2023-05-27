import axios from 'axios'
import { hideProgressBar, showProgressBar } from './progressBarAction'
import { showError, showSuccess } from './alertActions'

export const departmentActions = {
  ADD_DEPT: 'addDept',
  UPDATE_DEPT: 'updateDept',
  REMOVE_DEPT: 'removeDept',
  DEPTS_LOADED: 'deptsLoaded'
}

export const addDepartment = (department) => ({
  type: departmentActions.ADD_DEPT,
  department
})

export const updateDepartment = (department) => ({
  type: departmentActions.UPDATE_DEPT,
  department
})

export const loadDepartments = () => {
  return (dispatch, getState) => {
    dispatch(showProgressBar())
    axios
      .get('api/departments')
      .then((result) => {
        dispatch({
          type: departmentActions.DEPTS_LOADED,
          departments: result.data.departments
        })
        dispatch(hideProgressBar())
      })
      .catch((error) => {
        dispatch(hideProgressBar())
        let message =
          error && error.response && error.response.data
            ? error.response.data.error
            : error.message
        dispatch(showError(message))
      })
  }
}

export const deleteDepartment = (id) => {
  return (dispatch, getState) => {
    dispatch(showProgressBar())
    axios
      .post('api/departments/delete', { id })
      .then(({ data }) => {
        if (data.success) {
          dispatch({
            type: departmentActions.REMOVE_DEPT,
            id
          })
          dispatch(showSuccess('Department deleted successfully'))
          dispatch(hideProgressBar())
        }
      })
      .catch((error) => {
        dispatch(hideProgressBar())
        let message =
          error && error.response && error.response.data
            ? error.response.data.error
            : error.message
        dispatch(showError(message))
      })
  }
}
