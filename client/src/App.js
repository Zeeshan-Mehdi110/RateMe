import { useEffect } from 'react'
import AppPublic from './AppPublic'
import { loadAuth, signOut } from './store/actions/authActions'
import { connect } from 'react-redux'
import { Button } from '@mui/material'
import AppPreLoader from './components/library/AppPreLoader'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import AppBar from './components/AppBar'
import { Container } from '@mui/system'
import AccountSettings from './components/AccountSettings'
import Dashboard from './components/Dashboard'
import AlertMessage from './components/library/AlertMessage'
import BlockInterface from './components/library/BlockInterface'

const publicRoutes = [
  '/admin/signin',
  '/admin/forgot-password',
  '/admin/reset-password/'
]

function App({ user, isAuthLoaded, loadAuth }) {
  const location = useLocation()
  useEffect(() => {
    loadAuth()
  }, [])

  if (!isAuthLoaded) return <AppPreLoader message={'Loading App ...'} />
  if (user && publicRoutes.find((url) => location.pathname.startsWith(url)))
    return <Navigate to="/admin/dashboard" />
  if (!user && !publicRoutes.find((url) => location.pathname.startsWith(url)))
    return <Navigate to="/admin/signin" />
  if (location.pathname === '/' || location.pathname === '/admin')
    return <Navigate to="/admin/signin" />

  if (!user) return <AppPublic />

  return (
    <div>
      <AppBar />
      <AlertMessage />
      <Container
        sx={{
          mt: 10,
          p: 3,
          backgroundColor: '#fff',
          borderRadius: '5px',
          boxShadow: '0px 0px 17px 5px #dbdada',
          position: 'relative'
        }}
        maxWidth="lg"
      >
        <BlockInterface />
        <Routes>
          <Route path="/admin/account-settings" Component={AccountSettings} />
          <Route path="/admin/dashboard" Component={Dashboard} />
        </Routes>
      </Container>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
    isAuthLoaded: state.auth.isLoaded
  }
}

export default connect(mapStateToProps, { loadAuth, signOut })(App)
