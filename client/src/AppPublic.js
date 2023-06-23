import React from 'react'
import { Route, Routes } from 'react-router-dom'
import SignIn from './components/auth/SignIn'
import ForgotPassword from './components/auth/ForgotPassword'
import ResetPassword from './components/auth/ResetPassword'
import { Box } from '@mui/material'
import AlertMessage from './components/library/AlertMessage'
import Home from "./components/publicComponents/Home";
import FeedBack from './components/publicComponents/FeedBack'

const AppPublic = () => {
  return (
    <Box height={"100%"} >
      <AlertMessage />
      <Routes>
        <Route path="/admin/signin" element={<SignIn />} />
        <Route path="/admin/forgot-password" element={<ForgotPassword />} />
        <Route path="/admin/reset-password/:resetCode" element={<ResetPassword />} />
        <Route path="/" Component={Home} />
        <Route path="/employee/feedback/:employeeId" Component={FeedBack} />
      </Routes>
    </Box>
  )
}

export default AppPublic
