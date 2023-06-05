import { Form, Field } from 'react-final-form'
import { Button, Box } from '@mui/material'
import axios from 'axios'
import TextInput from '../library/TextInput'
import {
  hideProgressBar,
  showProgressBar
} from '../../store/actions/progressBarAction'
import { showError, showSuccess } from '../../store/actions/alertActions'
import { addUser } from '../../store/actions/userActions'
import { connect, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import SelectInput from '../library/SelectInput'
import { loadDepartments } from '../../store/actions/departmentActions'
import { useEffect, useMemo } from 'react'
import { userTypes } from '../../utils/constants'

function AddUser({ departments, loadDepartments, loggedInUserType }) {
  const dispatch = useDispatch()
  const navigator = useNavigate()

  useEffect(() => {
    if (loggedInUserType === userTypes.USER_TYPE_SUPER && departments.length === 0) loadDepartments()
  }, [])

  const validate = (data) => {
    const errors = {}

    if (!data.name) errors.name = 'Name is required'
    if (!data.email) errors.email = 'Email is required'
    else if (!/^\w+([.-]?\w+)@\w+([.-]?\w+)(.\w{2,3})+$/.test(data.email))
      errors.email = 'Invalid email address'

    if (!data.phoneNumber) errors.phoneNumber = 'Pphone number is required'

    if (!data.password) errors.password = 'Ppassword is required'
    else if (data.password.length < 6)
      errors.password = 'Password should have at least 6 characters'
    if (loggedInUserType === userTypes.USER_TYPE_SUPER) {
      if (!data.type) errors.type = 'User type is required'
      if (data.type === userTypes.USER_TYPE_STANDARD && !data.departmentId)
        errors.departmentId = 'Department is required'
    }

    return errors
  }

  const handelUser = async (data, form) => {
    try {
      dispatch(showProgressBar())
      let result = await axios.post('api/users/add', data)
      if (result.data.user) {
        dispatch(addUser(result.data.user))
        dispatch(showSuccess('User added successfully'))
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

  const deptOptions = useMemo(() => {
    const options = [{ label: "Select Department", value: 0 }]
    departments.forEach(department => options.push({ label: department.name, value: department._id }));
    return options
  }, [departments])

  return (
    <Box
      textAlign={'center'}
      sx={{ width: { sm: '50%', md: '50%' }, mx: 'auto' }}
    >
      <h3>Add User</h3>
      <Form
        onSubmit={handelUser}
        validate={validate}
        initialValues={{
          type: 0,
          departmentId: 0,
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
              placeholder="Email address ..."
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
              placeholder="password..."
            />
            {
              loggedInUserType === userTypes.USER_TYPE_SUPER &&
              <>
                <Field
                  component={SelectInput}
                  name="type"
                  options={[
                    { label: 'Select user type', value: 0 },
                    { label: 'Super Admin', value: userTypes.USER_TYPE_SUPER },
                    { label: 'Standard', value: userTypes.USER_TYPE_STANDARD }
                  ]}
                />
                <Field
                  component={SelectInput}
                  name="departmentId"
                  options={deptOptions}
                />
              </>
            }
            <Button
              sx={{ marginTop: '20px' }}
              variant="outlined"
              type="submit"
              disabled={invalid || submitting}
            >
              Add User
            </Button>
          </form>
        )}
      />
    </Box>
  )
}

const mapStateToProps = ({ departments, auth }) => {
  return {
    departments: departments.records,
    loggedInUserType: auth.user.type
  }
}

export default connect(mapStateToProps, { loadDepartments })(AddUser)
