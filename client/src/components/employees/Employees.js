import { Avatar, Box, Button, IconButton, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { loadDepartments } from '../../store/actions/departmentActions'
import { connect, useDispatch } from 'react-redux';
import AddIcon from '@mui/icons-material/Add';
import RefreshIcon from '@mui/icons-material/Refresh';
import EditIcon from '@mui/icons-material/Edit';
import { hideProgressBar, showProgressBar } from '../../store/actions/progressBarAction';
import { showError } from '../../store/actions/alertActions';
import axios from 'axios';
import DeleteEmployee from './DeleteEmployee';
function Employees() {
  const { deptId } = useParams()
  const dispatch = useDispatch()
  const [employees, setEmployees] = useState([])
  const [department, setDepartment] = useState(null)

  const loadEmployees = () => {
    dispatch(showProgressBar());
    axios.post('/api/employees/search', { deptId }).then(result => {
      setDepartment(result.data.department)
      setEmployees(result.data.employees)
      dispatch(hideProgressBar())
    }).catch((err) => {
      let message =
        err && err.response && err.response.data
          ? err.response.data.error
          : err.message
      dispatch(showError(message))
    })
  }
  useEffect(() => {
    loadEmployees()
  }, []);
  if (!department) return null
  return (
    <Box>
      <Box display='flex' justifyContent='space-between'>
        <Typography variant='h5'>{department.name}-Employees</Typography>
        <Box>
          <Button component={Link} to={`/admin/departments/edit/${deptId}`} variant='outlined' sx={{ mr: 1 }} startIcon={<EditIcon />}> Edit Department</Button>
          <Button component={Link} to={`/admin/employees/add/${deptId}`} variant='outlined' startIcon={<AddIcon />}> Add Employees</Button>
        </Box>
      </Box>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Picture</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Phone</TableCell>
            <TableCell>CNIC</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {
            employees.length === 0 &&
            <TableRow>
              <TableCell colSpan={5} sx={{ textAlign: "center" }}>
                Employees not Found...
              </TableCell>
            </TableRow>
          }
          {
            employees.map(employee => (
              <TableRow key={employee._id}>
                <TableCell>
                  {
                    <Avatar
                      src={process.env.REACT_APP_BASE_URL + 'content/' + department._id + '/' + employee.profilePicture} />
                  }
                </TableCell>
                <TableCell>
                  <Link to={`/admin/employees/profile/${employee._id}`} >
                    {employee.name}
                  </Link>
                </TableCell>
                <TableCell>{employee.phone}</TableCell>
                <TableCell>{employee.cnic}</TableCell>
                <TableCell>
                  <IconButton component={Link} to={`/admin/departments/edit/${employee._id}`}> <EditIcon /> </IconButton>
                  <DeleteEmployee employeeId={employee._id} name={employee.name} />
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </Box>
  )
}
export default Employees
