import { useEffect } from "react";
import AppPublic from "./AppPublic";
import { useDispatch } from "react-redux";
import { loadAuth, loadToken } from "./store/actions/authActions";

function App() {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(loadToken())
    dispatch(loadAuth())
  },[])
  return <AppPublic />
}

export default App;
