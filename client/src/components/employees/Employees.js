import { Avatar, Box, Button, IconButton, Pagination, Rating, Table, TableBody, TableCell, TableHead, TableRow, TextField, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import { hideProgressBar, showProgressBar } from '../../store/actions/progressBarAction';
import axios from 'axios';
import DeleteEmployee from './DeleteEmployee';
import { showError, showSuccess } from '../../store/actions/alertActions';
import EmployeeQRCode from './EmployeeQRCode';
function Employees() {
  const { deptId } = useParams()
  const dispatch = useDispatch()
  const [employees, setEmployees] = useState([])
  const [department, setDepartment] = useState(null)
  const [page, setPage] = useState(1);
  const [numOfPages, setNumOfPages] = useState(1)
  const [query, setQuery] = useState("")

  const loadEmployees = () => {
    dispatch(showProgressBar());
    axios.post('/api/employees/search', { deptId, page, query }).then(result => {
      setDepartment(result.data.department)
      setEmployees(result.data.employees)
      setNumOfPages(result.data.numOfPages)
      dispatch(hideProgressBar())
    }).catch((err) => {
      let message =
        err && err.response && err.response.data
          ? err.response.data.error
          : err.message
      dispatch(showError(message))
    })
  }
  const deleteEmployee = (id) => {
    dispatch(showProgressBar())
    axios
      .post('api/employees/delete', { id })
      .then(({ data }) => {
        if (data.success) {
          dispatch(showSuccess('Employee deleted successfully'))
          dispatch(hideProgressBar())
          setEmployees(employees => employees.filter(item => item._id !== id))
        }
      })
      .catch((error) => {
        dispatch(hideProgressBar())
        let message =
          error && error.response && error.response.data
            ? error.response.data.error
            : error.message
        dispatch(showError(message))
      })
  }
  useEffect(() => {
    loadEmployees()
  }, [page]);
  if (!department) return null
  return (
    <Box overflow="auto" >
      <Box display='flex' justifyContent='space-between' alignItems={"center"} >
        <Typography sx={{ fontSize: { xs: "12px", md: "24px" } }} fontWeight="bold" fontFamily="Josefin Sans" >{department.name}-Employees</Typography>
        <Rating sx={{ "fontSize": { xs: "10px", md: "28px" } }} value={department.rating} readOnly />
        <Box display={{ xs: "flex", md: "block" }} >
          <Button component={Link} to={`/admin/departments/edit/${deptId}`} variant='outlined' sx={{ fontSize: { xs: "7px", md: "14px" }, mr: 1 }} startIcon={<EditIcon />}> Edit Department</Button>
          <Button component={Link} to={`/admin/employees/add/${deptId}`} variant='outlined' sx={{ fontSize: { xs: "7px", md: "14px" } }} startIcon={<AddIcon />}> Add Employees</Button>
        </Box>
      </Box>
      <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"} mt={2} >
        <TextField onChange={(event) => setQuery(event.target.value)} size='small' sx={{ "flexGrow": 1, mr: 2 }} placeholder='search name , cnic,phone,designation etc...' />
        <Button variant='contained' onClick={loadEmployees} >Search</Button>
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
                  <Avatar sx={{ "width": "32px", "height": "32px" }} alt="P" src={employee?.profilePicture} />
                </TableCell>
                <TableCell>
                  <Link to={`/admin/employees/profile/${employee._id}`}>
                    {employee.name}
                  </Link>
                </TableCell>
                <TableCell>{employee.phone}</TableCell>
                <TableCell>{employee.cnic}</TableCell>
                <TableCell sx={{ display: { xs: "flex", flexDirection: "row" } }} >
                  <IconButton component={Link} to={`/admin/employees/edit/${employee._id}`}> <EditIcon /> </IconButton>
                  <DeleteEmployee employeeId={employee._id} name={employee.name} deleteEmployee={deleteEmployee} />
                  <EmployeeQRCode name={employee.name} employeeId={employee._id} />
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
      <Box mt={3} display={"flex"} justifyContent={"center"} >
        <Pagination count={numOfPages} page={page} color='primary' onChange={(event, value) => { setPage(value) }} />
      </Box>
    </Box>
  )
}
export default Employees
