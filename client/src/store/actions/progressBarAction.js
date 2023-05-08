export const progressBarActionTypes = {
  LOADING : "LOADING",
  LOADED : "LOADED",
}

export const showProgressBar = () => ({type : progressBarActionTypes.LOADING})
export const hideProgressBar = () => ({type : progressBarActionTypes.LOADED})