import { Box, Button, Grid } from '@mui/material'
import axios from 'axios';
import React, { useEffect, useMemo, useState } from 'react'
import { useDispatch } from 'react-redux'
import { hideProgressBar, showProgressBar } from '../../store/actions/progressBarAction';
import { showError } from '../../store/actions/alertActions';
import { Field, Form } from 'react-final-form';
import TextInput from '../library/TextInput';
import SelectInput from '../library/SelectInput';

export default function Home() {
  const dispatch = useDispatch();
  const [departments, setDepartments] = useState([])

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
      console.log(result.data.employees)
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
    <Box width='100%' minHeight='90%' p={4}>
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
          <form onSubmit={handleSubmit} method="post" encType="multipart/form-data" >
            <Grid container spacing={2}>
              <Grid item md={4} xs={12}>
                <Field size='small' component={SelectInput} type='text' name="departmentId" options={deptOptions} />
              </Grid>
              <Grid item md={4} xs={12}>
                <Field component={TextInput} type='text' name="name" placeholder="Name" autoFocus />
              </Grid>
              <Grid item md={4} xs={12}>
                <Button variant="outlined" type="submit" disabled={invalid || submitting}>Search</Button>
              </Grid>
            </Grid>
          </form>
        )}
      />
    </Box>
  )

};