import { Box, Button, CircularProgress, Typography } from '@mui/material'
import { Field, Form } from 'react-final-form'
import TextInput from '../library/TextInput'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { showError } from '../../store/actions/alertActions'
import { signIn } from '../../store/actions/authActions'

const SignIn = () => {
  const dispatch = useDispatch()
  return (
    <Box p={3} borderRadius={"5px"} boxShadow={'0px 0px 17px 5px #dbdada'} textAlign={"center"} bgcolor={"#fff"} minWidth={"350px"} >
      <Typography textAlign={'center'} variant='h5' fontWeight={"bold"} pb={2} >Rate Me</Typography>
      <Form
        onSubmit={(data) => {
          return axios.post("api/users/signin",data).then(({data}) =>{
            dispatch(signIn(data.user,data.token))
            localStorage.setItem('token', data.token)
          }).catch((err) => {
            let message = err && err.response && err.response.data ? err.response.data.error : err.message;
            dispatch(showError(message))
          })
        }}
        validate={(data) => {
          const errors = {};
          if (!data.email) {
            errors.email = 'Email Address is required';
          }
          else if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(data.email)) {
            errors.email = 'Email Address is invalid';
          }
          if (!data.password) {
            errors.password = 'password  is required';
          }
          return errors;
        }
        }
      >
        {
          (props) => {
            const { invalid, submitting} = props;
            return (
              <form onSubmit={props.handleSubmit} >
                <Field name="email" type="email" component={TextInput} placeholder="Enter email address" autoFocus />
                <Field name="password" type="password" component={TextInput} placeholder="Enter your  password" />
                <Button type='submit' variant='outlined' disabled={invalid || submitting} >Sign In { submitting && <CircularProgress size={20} style={{"marginLeft" : "10px"}} />  } </Button>
                <Box mt={2} > 
                  <Link style={{"textDecoration":"none"}} to="/admin/forgot-password">Forgot Password</Link>
                </Box>
              </form>
            )
          }
        }
      </Form>
    </Box>
  )
}

export default SignIn
