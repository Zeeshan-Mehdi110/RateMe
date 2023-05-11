import React from 'react'
import { Route, Routes } from 'react-router-dom'
import SignIn from './components/auth/SignIn'
import ForgotPassword from './components/auth/ForgotPassword'
import ResetPassword from './components/auth/ResetPassword'
import { Box } from '@mui/material'

const AppPublic = () => {
  return (
      <Box display={'flex'} justifyContent={'center'} alignItems={"center"} height="100%"  >
        <Routes>
          <Route path="/admin/signin" element={<SignIn />} />
          <Route path="/admin/forgot-password" element={<ForgotPassword />} />
          <Route path="/admin/reset-password/:resetCode" element={<ResetPassword />} />
        </Routes>
      </Box>
  )
}

export default AppPublic
