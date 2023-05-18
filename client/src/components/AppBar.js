import {Avatar, Box, Button, Container, IconButton, Menu, MenuItem, AppBar as MuiAppBar, Toolbar, Tooltip, Typography } from '@mui/material'
import AdbIcon from "@mui/icons-material/Adb"
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { signOut } from '../store/actions/authActions'
import ProgressBar from './library/ProgressBar'
const AppBar = () => {
  const dispatch = useDispatch()
  const [anchorEl,setAnchorEl] = useState(null);
  const openMenu = (event) => {
    setAnchorEl(event.currentTarget);
  }
  const closeMenu = () => {
    setAnchorEl(null);
  }
  const logOut = () => {
    dispatch( signOut() )
    closeMenu();
  }
  return (
    <MuiAppBar>
      <Container maxWidth="xl" >
        <Toolbar>
          <AdbIcon sx={{ display: "flex", mr: 1 }} />
          <Typography variant="h6"
            component={Link}
            sx={{
              mr: 2,
              display: "flex",
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            RateMe
          </Typography>
          <Box flexGrow={1} textAlign={"right"} >
            <Button
            component={Link}
            to="/admin/departments"
            sx={{"color": "white"}}
            >
              Departments
            </Button>
          </Box>
          <Box>
            <Tooltip title="Open Settings" >
              <IconButton onClick={openMenu} >
                <Avatar alt="Profile Picture" />
              </IconButton>
            </Tooltip>
            <Menu
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical : "bottom",
              horizontal : "right",
            }}
            transformOrigin={{
              vertical : "top",
              horizontal : "right",
            }}
            open={Boolean(anchorEl)}
            onClose={closeMenu}
            >
              <MenuItem component={Link} to="/admin/account-settings" onClick={closeMenu} >
                <Typography textAlign={"center"} >Account Settings</Typography>
              </MenuItem>
              <MenuItem onClick={logOut} >
                <Typography textAlign={"center"} >Sign Out</Typography>
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
