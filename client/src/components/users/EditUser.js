import { Form, Field } from 'react-final-form'
import { Button, Box } from '@mui/material'
import axios from 'axios'
import TextInput from '../library/TextInput'
import {
  hideProgressBar,
  showProgressBar
} from '../../store/actions/progressBarAction'
import { showError, showSuccess } from '../../store/actions/alertActions'
import { connect, useDispatch, useSelector } from 'react-redux'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import SelectInput from '../library/SelectInput'
import { loadDepartments } from '../../store/actions/departmentActions'
import { useEffect } from 'react'
import { updateUser } from '../../store/actions/userActions'
import { userTypes } from '../../utils/constants'

function EditUser() {
  const dispatch = useDispatch()
  const { userId } = useParams()
  const navigator = useNavigate()

  const user = useSelector((state) =>
    state.users.records.find((item) => item._id === userId)
  )

  if (!user) return <Navigate to="/admin/users" />

  const validate = (data) => {
    const errors = {}

    if (!data.name) errors.name = 'Name is required'
    if (!data.email) errors.email = 'Email is required'
    else if (!/^\w+([.-]?\w+)@\w+([.-]?\w+)(.\w{2,3})+$/.test(data.email))
      errors.email = 'Invalid email address'

    if (!data.phoneNumber) errors.phoneNumber = 'Please enter phone number'

    if (data.password) {
      if (data.password.length < 6)
        errors.password = 'Password should have at least 6 characters'
    }

    return errors
  }

  const handelUser = async (data, form) => {
    try {
      dispatch(showProgressBar())
      let result = await axios.post('api/users/edit', { ...data, id: userId })
      if (result.data.user) {
        dispatch(updateUser(result.data.user))
        dispatch(showSuccess('User updated successfully'))
        navigator('/admin/users')
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
      <h3>Update User</h3>
      <Form
        onSubmit={handelUser}
        validate={validate}
        initialValues={{
          name: user.name,
          email: user.email,
          phoneNumber: user.phoneNumber,
          type: 0,
          departmentId: user.departmentId
        }}
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
              placeholder="Name..."
              autoFocus
            />
            <Field
              component={TextInput}
              type="email"
              name="email"
              placeholder="Email address..."
              disabled
            />
            <Field
              component={TextInput}
              type="text"
              name="phoneNumber"
              placeholder="Phone number..."
            />
            <Field
              component={TextInput}
              type="password"
              name="password"
              placeholder="Passowrd..."
            />


            <Button
              sx={{ marginTop: '20px' }}
              variant="outlined"
              type="submit"
              disabled={invalid || submitting}
            >
              Update User
            </Button>
          </form>
        )}
      />
    </Box>
  )
}

export default EditUser
