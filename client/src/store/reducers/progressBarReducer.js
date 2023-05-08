import { progressBarActionTypes } from "../actions/progressBarAction"

const initState = {
  loading : false,

}

const progressBarReducer = (state = initState,action) => {
    switch (action.type) {
      case progressBarActionTypes.LOADING:
        return {
        ...state,
          loading : true,
        }
      case progressBarActionTypes.LOADED:
        return {
        ...state,
          loading : false,
        }
      default:
        return state
    }
}

export default progressBarReducer