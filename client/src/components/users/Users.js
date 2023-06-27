import {
  Avatar,
  Box,
  Button,
  Chip,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography
} from '@mui/material'
import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { loadUsers } from '../../store/actions/userActions'
import { connect } from 'react-redux'
import AddIcon from '@mui/icons-material/Add'
import RefreshIcon from '@mui/icons-material/Refresh'
import EditIcon from '@mui/icons-material/Edit'
import DeleteUser from './DeleteUser'
import { userTypes } from '../../utils/constants'

function Users({ users, loadUsers, loggedInUserType }) {
  useEffect(() => {
    if (users.length === 0) loadUsers()
  }, [])
  return (
    <Box overflow={'auto'} >
      <Box display="flex" justifyContent="space-between">
        <Typography sx={{ fontSize: { xs: "20px", md: "30px" } }} fontWeight="bold" fontFamily="Josefin Sans">Users</Typography>
        <Box>
          <Button
            component={Link}
            to="/admin/users/add"
            variant="outlined"
            startIcon={<AddIcon />}
            sx={{ fontSize: { xs: "10px", md: "16px" } }}
          >
            {' '}
            Add
          </Button>
          <Button
            sx={{ fontSize: { xs: "10px", md: "16px" }, ml: 1 }}
            onClick={loadUsers}
            variant="outlined"
            endIcon={<RefreshIcon />}
          >
            Refresh
          </Button>
        </Box>
      </Box>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Phone</TableCell>
            <TableCell>Email</TableCell>
            {
              loggedInUserType === userTypes.USER_TYPE_SUPER && <TableCell>Type</TableCell>
            }
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user._id}>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.phoneNumber}</TableCell>
              <TableCell>{user.email}</TableCell>
              {
                loggedInUserType === userTypes.USER_TYPE_SUPER &&
                <>
                  <TableCell>
                    {user.type == 1 ? (
                      <Chip size="small" label="Super Admin" color="secondary" />
                    ) : (
                      <Chip size="small" label="Standard" color="primary" />
                    )}
                  </TableCell>
                </>
              }
              <TableCell sx={{ display: { xs: "flex", flexDirection: "row" } }} >
                <IconButton
                  component={Link}
                  to={`/admin/users/edit/${user._id}`}
                >
                  <EditIcon />
                </IconButton>
                <DeleteUser userId={user._id} name={user.name} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  )
}

const mapStateToProps = (state) => {
  return {
    users: state.users.records,
    loggedInUserType: state.auth.user.type
  }
}

export default connect(mapStateToProps, { loadUsers })(Users)
