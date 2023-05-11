import { Box, Button, Typography } from '@mui/material'
import { Field, Form } from 'react-final-form'
import TextInput from '../library/TextInput'
import { Link } from 'react-router-dom'

const SignIn = () => {
  return (
    <Box p={3} borderRadius={"5px"} boxShadow={'0px 0px 17px 5px #dbdada'} textAlign={"center"} bgcolor={"#fff"} minWidth={"350px"} >
      <Typography textAlign={'center'} variant='h5' fontWeight={"bold"} pb={2} >Rate Me</Typography>
      <Form
        onSubmit={(data) => {
          console.log("submitting", data)
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
            return (
              <form onSubmit={props.handleSubmit} >
                <Field name="email" type="email" component={TextInput} placeholder="Enter email address" />
                <Field name="password" type="password" component={TextInput} placeholder="Enter your  password" />
                <Button type='submit' variant='outlined' >Sign In</Button>
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
