export const alertActionTypes = {
  SHOW_SUCCESS: 'SHOW_SUCCESS',
  SHOW_ERROR: 'SHOW_ERROR',
  SHOW_INFO: 'show info',
  SHOW_WARNING : "SHOW_WARNING",
  CLEAR_ALERT:"CLEAR_ALERT",
}

export const showSuccess = (message) => ({type : alertActionTypes.SHOW_SUCCESS, message})
export const showError = (message) => ({type : alertActionTypes.SHOW_ERROR, message})
export const showInfo = (message) => ({type : alertActionTypes.SHOW_INFO, message})
export const showWarning = (message) =>( {type : alertActionTypes.SHOW_WARNING, message})
export const clearAlert = () => ({type : alertActionTypes.CLEAR_ALERT})