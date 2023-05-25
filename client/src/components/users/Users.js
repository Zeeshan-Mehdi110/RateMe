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

function Users({ users, loadUsers }) {
  useEffect(() => {
    if (users.length === 0) loadUsers()
  }, [])
  return (
    <Box>
      <Box display="flex" justifyContent="space-between">
        <Typography variant="h5">Users</Typography>
        <Box>
          <Button
            component={Link}
            to="/admin/users/add"
            variant="outlined"
            startIcon={<AddIcon />}
          >
            {' '}
            Add
          </Button>
          <Button
            sx={{ ml: 1 }}
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
            <TableCell>Type</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {users.map((user) => (
            <TableRow key={user._id}>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.phoneNumber}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>
                {user.type == 1 ? (
                  <Chip size="small" label="Super Admin" color="secondary" />
                ) : (
                  <Chip size="small" label="Standard" color="primary" />
                )}
              </TableCell>
              <TableCell>
                <IconButton
                  component={Link}
                  to={`/admin/users/edit/${user._id}`}
                >
                  <EditIcon />
                </IconButton>
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
    users: state.users.records
  }
}

export default connect(mapStateToProps, { loadUsers })(Users)
