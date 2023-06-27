import {
  Avatar,
  Box,
  Button,
  Container,
  IconButton,
  Menu,
  MenuItem,
  AppBar as MuiAppBar,
  Toolbar,
  Tooltip,
  Typography
} from '@mui/material'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { signOut } from '../store/actions/authActions'
import ProgressBar from './library/ProgressBar'
import StarsIcon from '@mui/icons-material/Stars'
import { userTypes } from '../utils/constants'


const AppBar = () => {
  const user = useSelector((state) => state.auth.user)
  const userType = user.type
  const dispatch = useDispatch()
  const [anchorEl, setAnchorEl] = useState(null)

  const openMenu = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const closeMenu = () => {
    setAnchorEl(null)
  }
  const logOut = () => {
    dispatch(signOut())
    closeMenu()
  }



  return (
    <MuiAppBar>
      <Container maxWidth="xl" disableGutters >
        <Toolbar>
          <StarsIcon sx={{ display: 'flex', mr: { xs: 1, md: 2 } }} />
          <Typography
            variant="h6"
            component={Link}
            to={"/admin/dashboard"}
            sx={{
              mr: { xs: 0, md: 2 },
              display: 'flex',
              fontFamily: 'Josefin Sans',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none'
            }}
          >
            RateMe
          </Typography>
          <Box flexGrow={1} textAlign={'right'} p={0} >
            {userType === userTypes.USER_TYPE_SUPER && (
              <>
                <Button
                  component={Link}
                  to="/admin/departments"
                  sx={{ color: 'white', "padding": { xs: 0, md: 2 } }}
                >
                  Departments
                </Button>
              </>
            )}
            {userType === userTypes.USER_TYPE_STANDARD && (
              <Button
                LinkComponent={Link}
                to={`/admin/employees/${user.departmentId}`}
                sx={{ color: 'white', "padding": { xs: 0, md: 2 } }}
              >
                Employees
              </Button>
            )}
            <Button component={Link} to="/admin/users" sx={{ color: 'white', "padding": { xs: 0, md: 2 } }}>
              Users
            </Button>
          </Box>
          <Box>
            <Tooltip title="Open Settings">
              <IconButton onClick={openMenu} sx={{ "padding": { xs: 0, md: "auto" } }} >
                <Avatar sx={{ "width": "32px", "height": "32px" }} alt="Profile Picture" src={user?.profilePicture} />
              </IconButton>
            </Tooltip>
            <Menu
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right'
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right'
              }}
              open={Boolean(anchorEl)}
              onClose={closeMenu}
            >
              <MenuItem
                component={Link}
                to="/admin/account-settings"
                onClick={closeMenu}
              >
                <Typography textAlign={'center'}>Account Settings</Typography>
              </MenuItem>
              <MenuItem onClick={logOut}>
                <Typography textAlign={'center'}>Sign Out</Typography>
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
      <ProgressBar />
    </MuiAppBar>
  )
}

export default AppBar
