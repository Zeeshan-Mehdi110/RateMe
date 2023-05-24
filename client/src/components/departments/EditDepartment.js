import { Form, Field } from 'react-final-form'
import { Button, Box } from '@mui/material'
import axios from 'axios'
import TextInput from '../library/TextInput'
import {
  hideProgressBar,
  showProgressBar
} from '../../store/actions/progressBarAction'
import FileInput from '../library/FileInput'
import { showError, showSuccess } from '../../store/actions/alertActions'
import { updateDepartment } from '../../store/actions/departmentActions'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'

function EditDepartment() {
  const dispatch = useDispatch()
  const { deptId } = useParams()
  console.log(deptId)
  const validate = (data) => {
    const errors = {}

    if (!data.name) errors.name = 'Name is required'
    if (!data.email) errors.email = 'Email is required'
    else if (!/^\w+([.-]?\w+)@\w+([.-]?\w+)(.\w{2,3})+$/.test(data.email))
      errors.email = 'Invalid email address'

    return errors
  }

  const handelDepartment = async (data, form) => {
    try {
      dispatch(showProgressBar())
      let result = await axios.postForm('api/departments/edit', data)
      if (result.data.department) {
        dispatch(updateDepartment(result.data.department))
        dispatch(showSuccess('Department Updated successfully'))
      }
      dispatch(hideProgressBar())
    } catch (error) {
      let message =
        error && error.response && error.response.data
          ? error.response.data.error
          : error.message
      dispatch(hideProgressBar())
      dispatch(showError(message))
    }
  }

  return (
    <Box
      textAlign={'center'}
      sx={{ width: { sm: '50%', md: '50%' }, mx: 'auto' }}
    >
      <h3>Edit Department</h3>
      <Form
        onSubmit={handelDepartment}
        validate={validate}
        initialValues={{}}
        render={({ handleSubmit, submitting, invalid }) => (
          <form
            onSubmit={handleSubmit}
            method="post"
            encType="multipart/form-data"
          >
            <Field
              component={TextInput}
              type="text"
              name="name"
              placeholder="Enter name"
            />
            <Field
              component={TextInput}
              type="email"
              name="email"
              placeholder="Enter email address"
            />
            <Field
              component={TextInput}
              type="text"
              name="phone"
              placeholder="Enter phone number"
            />
            <Field
              component={FileInput}
              type="file"
              name="logo"
              inputProps={{ accept: 'image/*' }}
            />
            <Field
              component={TextInput}
              type="text"
              multiline
              rows={5}
              name="address"
              placeholder="Enter address"
            />

            <Button
              sx={{ marginTop: '20px' }}
              variant="outlined"
              type="submit"
              disabled={invalid || submitting}
            >
              Edit Department
            </Button>
          </form>
        )}
      />
    </Box>
  )
}
export default EditDepartment
