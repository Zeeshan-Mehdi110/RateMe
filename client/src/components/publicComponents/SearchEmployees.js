import { Avatar, Box, Button, Card, CardActionArea, CardContent, Grid, Typography } from '@mui/material'
import axios from 'axios';
import { useEffect, useMemo, useState } from 'react'
import { useDispatch } from 'react-redux'
import { hideProgressBar, showProgressBar } from '../../store/actions/progressBarAction';
import { showError } from '../../store/actions/alertActions';
import { Field, Form } from 'react-final-form';
import TextInput from '../library/TextInput';
import SelectInput from '../library/SelectInput';
import ProgressBar from '../library/ProgressBar';
import { Link } from 'react-router-dom';
import AlertMessage from '../library/AlertMessage';
import ScanQRCode from './ScanQRCode';
const SearchEmployees = () => {
  const dispatch = useDispatch();
  const [departments, setDepartments] = useState([])
  const [employees, setEmployees] = useState([])
  const [isSearchDone, setIsSearchDone] = useState(false)

  useEffect(() => {
    dispatch(showProgressBar())
    axios.get('api/departments').then(result => {
      setDepartments(result.data.departments);
      dispatch(hideProgressBar())
    }).catch(error => {
      dispatch(hideProgressBar())
      let message = error && error.response && error.response.data ? error.response.data.error : error.message;
      dispatch(showError(message))
    })
  }, []);

  const validate = (data) => {
    const errors = {};

    if (!data.departmentId) errors.name = "Please select Department";
    if (!data.name) errors.name = "Please enter name of employee";
    else if (data.name.length < 3) errors.name = "Nmae should have at least 3 characters";
    return errors
  };

  const searchEmploys = async (data, form) => {
    try {
      dispatch(showProgressBar())
      let result = await axios.post("api/employees/publickSearch", data);
      setEmployees(result.data.employees)
      setIsSearchDone(true)
      dispatch(hideProgressBar())

    } catch (error) {
      let message = error && error.response && error.response.data ? error.response.data.error : error.message;
      dispatch(hideProgressBar())
      dispatch(showError(message))
    }
  };

  const deptOptions = useMemo(() => {
    const options = [{ label: "Select Department", value: 0 }];
    departments.forEach(department => options.push({ label: department.name, value: department._id }));
    return options;
  }, [departments])

  return (
    <>
      <Box mt={5} >
        <Box display={"flex"} justifyContent={"space-evenly"} >
          <Form
            onSubmit={searchEmploys}
            validate={validate}
            initialValues={{
              departmentId: 0

            }}
            render={({
              handleSubmit,
              submitting,
              invalid,
            }) => (
              <form onSubmit={handleSubmit} method="post" encType="multipart/form-data" style={{ "width": "90%" }} >
                <Grid container spacing={2} >
                  <Grid item md={4} xs={12}>
                    <Field size='small' component={SelectInput} type='text' name="departmentId" options={deptOptions} />
                  </Grid>
                  <Grid item md={4} xs={12}>
                    <Field component={TextInput} type='text' name="name" placeholder="Name" />
                  </Grid>
                  <Grid item md={4} xs={12}>
                    <Button variant="outlined" type="submit" disabled={invalid || submitting}>Search</Button>
                    <ScanQRCode />
                  </Grid>
                </Grid>
              </form>
            )}
          />
        </Box>
        <ProgressBar />
        <AlertMessage />

        <Grid container spacing={2} >
          {
            employees.map(employee => (
              <Grid item lg={2} md={3} sm={4} xs={12} key={employee._id} >
                <Card sx={{ width: '100%', height: '100%' }} >
                  <CardActionArea component={Link} to={`/employee/feedback/${employee._id}`} >
                    <Avatar variant='square' sx={{ width: "100%", height: "auto" }} src={employee.profilePicture} />
                    <CardContent>
                      <Typography variant='h6' textAlign={"center"} component={"div"} >
                        {employee.name}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
            ))
          }
        </Grid>
        {
          isSearchDone && employees.length === 0 &&
          <Box mt={5} textAlign={"center"} >
            <Typography>no employees found</Typography>
          </Box>
        }
      </Box>
    </>
  )
}

export default SearchEmployees