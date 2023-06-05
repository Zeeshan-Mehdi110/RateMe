import { authAction } from '../actions/authActions'
import { userActions } from '../actions/userActions'

const initialState = {
  records: []
}

function userReducer(state = initialState, action) {
  switch (action.type) {
    case userActions.ADD_USER:
      const newUsersArray = [action.user, ...state.records]
      return {
        ...state,
        records: newUsersArray
      }
    case userActions.UPDATE_USER:
      return {
        ...state,
        records: state.records.map((item) => {
          if (item._id !== action.user._id) return item
          else return action.user
        })
      }
    case userActions.REMOVE_USER:
      return {
        ...state,
        records: state.records.filter((item) => item._id !== action.id)
      }
    case userActions.USERS_LOADED:
      return {
        ...state,
        records: action.users
      }
    case authAction.AUTH_FAILED:
    case authAction.SIGN_OUT:
      return {
        ...state,
        records: []
      }
    default:
      return state
  }
}

export default userReducer
