import { Box, Button, Typography } from "@mui/material"
import { Field, Form } from "react-final-form"
import TextInput from "../library/TextInput"
import { Link } from "react-router-dom"

const ForgotPassword = () => {
  return (
    <Box  p={3} textAlign={"center"} bgcolor="#fff" boxShadow={'0px 0px 17px 5px #dbdada'} minWidth={"350px"} >
      <Typography textAlign={"center"} variant="h5" fontWeight={"bold"} pb={1} >Rate Me</Typography>
      <Form
        onSubmit={(data) => {
          console.log(data)
        }}
        validate={(data) => {
          const errors = {};
          if (!data.email) {
            errors.email = "Email Address Required";
          }else if(!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(data.email)){
            errors.email = "Invalid email address";
          }
          return errors;
        }}
      >
        {
          (props) => {
            return (
              <form onSubmit={props.handleSubmit} action="">
                <Field name="email" type="email" placeholder="Enter email address" component={TextInput} />
                <Button type="submit" >Forgot Password</Button>
                <Box mt={2} >
                  <Link style={{"textDecoration":"none"}} to="/admin/signin">Sign In</Link>
                </Box>
              </form>
            )
          }
        }
      </Form>
    </Box>
  )
}

export default ForgotPassword
