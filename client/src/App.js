import { useEffect } from "react";
import AppPublic from "./AppPublic";
import { loadAuth, signOut } from "./store/actions/authActions";
import { connect } from "react-redux";
import { Button } from "@mui/material";
import AppPreLoader from "./components/library/AppPreLoader";

function App({ user, isAuthLoaded, loadAuth }) {
  useEffect(() => {
    loadAuth();
  }, [])
  
  if(!isAuthLoaded) return <AppPreLoader message={"Loading App ..."} />;
  if (!user) return <AppPublic />
  
  return <div>
    You are Signed in
    <Button onClick={signOut} >LogOut</Button>
  </div>
}


const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
    isAuthLoaded: state.auth.isLoaded,
  };
}

export default connect(mapStateToProps, { loadAuth, signOut })(App);
