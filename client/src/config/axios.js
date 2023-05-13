import axios from "axios"
import { authAction } from "../store/actions/authActions";

export const configureAxios = (store) => {
  axios.defaults.baseURL = process.env.REACT_APP_BASE_URL

  // response middleware
  axios.interceptors.request.use((config) => {
    const state = store.getState();
    config.headers.Authorization = "Bearer " + state.auth.token;
    return config;
  },err => Promise.reject(err))

  // response middleware
  axios.interceptors.response.use(response => response,err => {
    if(err.response && err.response.status === 401) {
      store.dispatch({
        type: authAction.AUTH_FAILED
      })
      localStorage.removeItem("token");
      return Promise.reject(new Error("Authentication failed"))  
  }else{
    return Promise.reject(err)
  }
})

}