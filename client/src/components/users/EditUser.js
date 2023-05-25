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

function EditUser({ departments, loadDepartments }) {
  const dispatch = useDispatch()
  const { userId } = useParams()
  const navigator = useNavigate()

  const user = useSelector((state) =>
    state.users.records.find((item) => item._id === userId)
  )

  useEffect(() => {
    if (departments.length === 0) loadDepartments()
  }, [])

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

    if (!data.type) errors.type = 'User type is required'
    if (!data.departmentId) errors.departmentId = 'User type is required'

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
          type: user.type,
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
              name="phoneNumber"
              placeholder="Enter phone number"
            />
            <Field
              component={TextInput}
              type="password"
              name="password"
              placeholder="Enter current passowrd"
            />
            <Field
              component={SelectInput}
              name="type"
              options={[
                { label: 'Select user type', value: ' ' },
                { label: 'Super Admin', value: 1 },
                { label: 'Standard', value: 2 }
              ]}
            />
            <Field
              component={SelectInput}
              value={user.departmentId}
              name="departmentId"
              options={
                departments &&
                departments.map((department) => ({
                  label: department.name,
                  value: department._id
                }))
              }
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

const mapStateToProps = ({ departments }) => {
  return {
    departments: departments.records
  }
}

export default connect(mapStateToProps, { loadDepartments })(EditUser)
