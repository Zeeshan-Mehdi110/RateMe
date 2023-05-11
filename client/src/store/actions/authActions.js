import axios from "axios"

export const authAction = {
  SIGN_IN: "signIn",
  SIGN_OUT: "signOut",
  AUTH_LOADED: "authLoaded",
  AUTH_FAILED: "authFailed",
  LOAD_TOKEN: "loadToken"
}

export const signIn = (user, token) => ({ type: authAction.SIGN_IN, user, token })
export const loadToken = () => {
  const token = localStorage.getItem("token")
  return {
    type: authAction.LOAD_TOKEN,
    token: token ? token : null
  }
}

export const loadAuth = () => {
  return (dispatch, getState) => {
    axios.get("/users/profile").then(({ data }) => {
      dispatch({
        type: authAction.AUTH_LOADED,
        user: data.user
      })
    }).catch((err) => {
      console.log(err);
    })
  }
}