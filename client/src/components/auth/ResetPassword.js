import { Box, Button, CircularProgress, Typography } from '@mui/material'
import { Field, Form } from 'react-final-form'
import TextInput from '../library/TextInput'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useEffect } from 'react'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { showError, showSuccess } from '../../store/actions/alertActions'

const ResetPassword = () => {
  const dispatch = useDispatch()
  const navigator = useNavigate()
  const { resetCode } = useParams()
  useEffect(() => {
    axios
      .post('/users/verify-reset-code', { code: resetCode })
      .then((result) => {})
      .catch((err) => {
        dispatch(showError('invalid request'))
      })
  }, [])
  return (
    <Box
      p={3}
      textAlign={'center'}
      bgcolor="#fff"
      boxShadow={'0px 0px 17px 5px #dbdada'}
      minWidth={'350px'}
    >
      <Typography textAlign={'center'} variant="h5" fontWeight={'bold'} pb={1}>
        Rate Me
      </Typography>
      <Form
        onSubmit={(data) => {
          return axios
            .post('api/users/reset-password', { ...data, code: resetCode })
            .then(({ data }) => {
              if (data.success) {
                dispatch(
                  showSuccess(
                    'Password reset successfully . Please Signin with new password'
                  )
                )
                navigator('/admin/signin')
              }
            })
            .catch((err) => {
              let message =
                err && err.response && err.response.data
                  ? err.response.data.error
                  : err.message
              dispatch(showError(message))
            })
        }}
        validate={(data) => {
          const errors = {}
          if (!data.newPassword) {
            errors.newPassword = 'Password Required'
          } else if (data.newPassword.length < 6) {
            errors.newPassword = 'password should be at least 6 characters long'
          }
          if (!data.confirmPassword) {
            errors.confirmPassword = 'Confirm Password Required'
          } else if (data.newPassword !== data.confirmPassword) {
            errors.confirmPassword = 'Passwords do not match'
          }
          return errors
        }}
      >
        {(props) => {
          const { submitting, invalid } = props
          return (
            <form onSubmit={props.handleSubmit} action="">
              <Field
                name="newPassword"
                type="password"
                placeholder="Enter new Password"
                component={TextInput}
              />
              <Field
                name="confirmPassword"
                type="password"
                placeholder="Enter Confirm Password"
                component={TextInput}
              />
              <Button type="submit" disabled={submitting || invalid}>
                Change Password{' '}
                {submitting && (
                  <CircularProgress size={20} style={{ marginLeft: '10px' }} />
                )}{' '}
              </Button>
              <Box mt={2}>
                <Link style={{ textDecoration: 'none' }} to="/admin/signin">
                  Sign In
                </Link>
              </Box>
            </form>
          )
        }}
      </Form>
    </Box>
  )
}

export default ResetPassword
