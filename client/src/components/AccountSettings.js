import { Link } from 'react-router-dom'
import axios from 'axios'
import { connect, useDispatch } from 'react-redux'
import { showError, showSuccess } from '../store/actions/alertActions'
import { Box, Button, CircularProgress, Typography } from '@mui/material'
import { Field, Form } from 'react-final-form'
import TextInput from './library/TextInput'
import {
  hideProgressBar,
  showProgressBar
} from '../store/actions/progressBarAction'
import FileInput from './library/FileInput'

const AccountSettings = ({ user, loading }) => {
  const dispatch = useDispatch()
  return (
    <Box
      textAlign={'center'}
      sx={{ width: { sm: '100%', md: '50%' }, mx: 'auto' }}
    >
      <Typography textAlign={'center'} variant="h5" fontWeight={'bold'} pb={2}>
        Rate Me
      </Typography>
      <Form
        onSubmit={(data) => {
          dispatch(showProgressBar())
          return axios
            .postForm('/users/profile-update', data)
            .then(({ data }) => {
              if (data.user) {
                dispatch(showSuccess('Account settings updated successfully'))
              }
              dispatch(hideProgressBar())
            })
            .catch((err) => {
              let message =
                err && err.response && err.response.data
                  ? err.response.data.error
                  : err.message
              dispatch(showError(message))
              dispatch(hideProgressBar())
            })
        }}
        validate={(data) => {
          const errors = {}
          if (!data.name) {
            errors.name = 'Name is required'
          }
          if (data.newPassword) {
            if (!data.currentPassword) {
              errors.currentPassword = 'Current password  is required'
            }
            if (data.newPassword < 6)
              errors.newPassword =
                'New password must be at least 6 characters long'
            if (!data.confirmPassword)
              errors.confirmPassword = 'Confirm password is required'
            else if (!data.newPassword !== data.confirmPassword) {
              errors.confirmPassword = 'Password are not same'
            }
          }
          return errors
        }}
        initialValues={{
          name: user.name,
          email: user.email,
          phoneNumber: user.phoneNumber
        }}
      >
        {(props) => {
          const { invalid } = props
          return (
            <form onSubmit={props.handleSubmit}>
              <Field
                name="name"
                type="text"
                component={TextInput}
                placeholder="Enter your Name"
              />
              <Field
                name="email"
                type="email"
                disabled
                component={TextInput}
                placeholder="Enter email address"
              />
              <Field
                name="phoneNumber"
                type="text"
                component={TextInput}
                placeholder="Enter phone number"
              />
              <Field
                name="profilePicture"
                type="file"
                component={FileInput}
                inputProps={{ accept: 'image/*' }}
              />
              <Field
                name="currentPassword"
                type="password"
                component={TextInput}
                placeholder="Enter current password ..."
              />
              <Field
                name="newPassword"
                type="password"
                component={TextInput}
                placeholder="Enter new password"
              />
              <Field
                name="confirmPassword"
                type="password"
                component={TextInput}
                placeholder="Enter confirm password ..."
              />
              <Button type="submit" variant="outlined" disabled={invalid}>
                Update
              </Button>
            </form>
          )
        }}
      </Form>
    </Box>
  )
}

const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
    loading: state.progressBar.loading
  }
}
export default connect(mapStateToProps)(AccountSettings)
