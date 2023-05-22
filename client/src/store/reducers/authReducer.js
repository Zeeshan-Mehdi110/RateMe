import { authAction } from '../actions/authActions'

const initState = {
  user: null,
  token: null,
  userType: null,
  isLoaded: false
}

const authReducer = (state = initState, action) => {
  switch (action.type) {
    case authAction.SIGN_IN:
      return {
        ...state,
        user: action.user,
        token: action.token,
        userType: action.user.type,
        isLoaded: true
      }
    case authAction.LOAD_TOKEN:
      return {
        ...state,
        token: action.token
      }
    case authAction.UPDATE_USER:
      return {
        ...state,
        user: action.user
      }
    case authAction.AUTH_LOADED:
      return {
        ...state,
        user: action.user,
        userType: action.user.type,
        isLoaded: true
      }
    case authAction.SIGN_OUT:
    case authAction.AUTH_FAILED:
      return {
        ...state,
        user: null,
        userType: null,
        token: null,
        isLoaded: true
      }
    default:
      return state
  }
}

export default authReducer
