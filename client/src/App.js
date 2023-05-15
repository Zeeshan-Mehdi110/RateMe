import { useEffect } from "react";
import AppPublic from "./AppPublic";
import { loadAuth, signOut } from "./store/actions/authActions";
import { connect } from "react-redux";
import { Button } from "@mui/material";
import AppPreLoader from "./components/library/AppPreLoader";
import { Navigate, useLocation } from "react-router-dom";

const publicRoutes = ["/admin/signin","/admin/forgot-password","/admin/reset-password/"]

function App({ user, isAuthLoaded, loadAuth }) {
  const location = useLocation()
  console.log(location)
  useEffect(() => {
    loadAuth();
  }, [])
  
  if(!isAuthLoaded) return <AppPreLoader message={"Loading App ..."} />;
  if(user && publicRoutes.find(url => location.pathname.startsWith(url)))
  return <Navigate to="/admin/dashboard" />
  if(!user && !publicRoutes.find(url => location.pathname.startsWith(url)))
  return <Navigate to="/admin/signin" />
  if(location.pathname === "/" || location.pathname === "/admin" )
  return <Navigate to="/admin/signin" />

  if (!user) return <AppPublic />
  
  return (
  <div>
    You are Signed in
    <Button onClick={signOut} >LogOut</Button>
  </div>
  )
}


const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
    isAuthLoaded: state.auth.isLoaded,
  };
}

export default connect(mapStateToProps, { loadAuth, signOut })(App);
