import React from 'react'
import { Route, Routes } from 'react-router-dom'
import SignIn from './components/auth/SignIn'
import ForgotPassword from './components/auth/ForgotPassword'
import ResetPassword from './components/auth/ResetPassword'

const AppPublic = () => {
  return (
    <div>
      <Routes>
        <Route path="/admin/signin" element={<SignIn />} />
        <Route path="/admin/forgot-password" element={<ForgotPassword />} />
        <Route path="/admin/reset-password/:resetCode" element={<ResetPassword />} />
      </Routes>
    </div>
  )
}

export default AppPublic
