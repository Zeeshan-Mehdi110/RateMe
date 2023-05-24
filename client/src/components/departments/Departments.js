import {
  Avatar,
  Box,
  Button,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography
} from '@mui/material'
import { connect } from 'react-redux'
import { loadDepartments } from '../../store/actions/departmentActions'
import { useEffect } from 'react'
import AddIcon from '@mui/icons-material/Add'
import { Link } from 'react-router-dom'
import RefreshIcon from '@mui/icons-material/Refresh'
import EditIcon from '@mui/icons-material/Edit'

const Departments = ({ departments, loadDepartments }) => {
  useEffect(() => {
    if (departments.length === 0) loadDepartments()
  }, [])
  return (
    <Box>
      <Box display={'flex'} justifyContent={'space-between'}>
        <Typography variant="h6">Departments</Typography>
        <Box>
          <Button
            LinkComponent={Link}
            to="/admin/departments/add"
            variant="outlined"
            startIcon={<AddIcon />}
          >
            Add
          </Button>
          <Button
            sx={{ ml: 1 }}
            onClick={loadDepartments}
            variant="outlined"
            startIcon={<RefreshIcon />}
          >
            Refresh
          </Button>
        </Box>
      </Box>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Logo</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Phone</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {departments.map((dept) => (
            <TableRow key={dept && dept._id}>
              <TableCell>
                <Avatar
                  alt={dept && dept.name}
                  src={
                    dept?.logo &&
                    process.env.REACT_APP_BASE_URL +
                      `content/departments/${dept.logo}`
                  }
                />
              </TableCell>
              <TableCell>{dept && dept.name}</TableCell>
              <TableCell>{dept && dept.phone}</TableCell>
              <TableCell>{dept && dept.email}</TableCell>
              <TableCell>
                <IconButton
                  component={Link}
                  to={`/admin/departments/edit/${dept && dept._id}`}
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
    departments: state.departments.records
  }
}

const wrapper = connect(mapStateToProps, { loadDepartments })

export default wrapper(Departments)
