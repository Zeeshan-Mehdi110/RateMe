import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { hideProgressBar, showProgressBar } from '../../store/actions/progressBarAction';
import { showError } from '../../store/actions/alertActions';
import axios from 'axios';
import { Avatar, Box, Grid, Rating, Typography } from '@mui/material';
import EmployeeFeedback from './EmployeeFeedback';


export default function EmployeeProfile() {
  const { employeeId } = useParams()
  const dispatch = useDispatch();
  const [employee, setEmployee] = useState(null)

  useEffect(() => {
    dispatch(showProgressBar())
    axios.get('api/employees/details/' + employeeId).then(result => {
      dispatch(hideProgressBar())
      setEmployee(result.data.employee)

    }).catch(error => {
      dispatch(hideProgressBar())
      let message = error && error.response && error.response.data ? error.response.data.error : error.message;
      dispatch(showError(message))
    })
  }, [])
  if (!employee) return null;
  return (
    <Box>
      <Grid container spacing={2}>
        <Grid item md={2} xs={12}>
          <Avatar variant='square' sx={{ width: "100%", height: "auto" }} src={process.env.REACT_APP_BASE_URL + 'content/' + employee.departmentId + '/' + employee.profilePicture} />
        </Grid>
        <Grid item md={10} xs={12}>
          <Typography color="#706f6f"><b>Name</b> {employee.name}</Typography>
          <Typography color="#706f6f"><b>Email</b> {employee.email}</Typography>
          <Typography color="#706f6f"><b>Phone</b> {employee.phone}</Typography>
          <Typography color="#706f6f"><b>CNIC</b> {employee.cnic}</Typography>
          <Typography color="#706f6f"><b>Desiginatin</b> {employee.designation}</Typography>
          <Typography color="#706f6f" justifyContent={"center"} ><Rating sx={{ mt: 1 }} readOnly precision={0.5} value={employee.rating ? employee.rating : 0} /> {`(${employee?.rating})`}</Typography>
        </Grid>
      </Grid>
      <EmployeeFeedback employeeId={employeeId} />
    </Box>
  )
}