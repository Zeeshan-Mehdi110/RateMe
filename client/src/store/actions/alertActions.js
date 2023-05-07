export const alertActionTypes = {
  SHOW_SUCCESS: 'SHOW_SUCCESS',
  SHOW_ERROR: 'HIDE_ALERT',
  SHOW_INFO: 'CLEAR_ALERT',
  SHOW_WARNING : "SHOW_WARNING",
  CLEAR_ALERT:"CLEAR_ALERT",
}

export const showSuccess = (message) => ({type : alertActionTypes.showSuccess, message})
export const showError = (message) => ({type : alertActionTypes.SHOW_ERROR, message})
export const showInfo = (message) => ({type : alertActionTypes.SHOW_INFO, message})
export const showWarning = (message) =>( {type : alertActionTypes.SHOW_WARNING, message})
export const clearAlert = () => ({type : alertActionTypes.CLEAR_ALERT})