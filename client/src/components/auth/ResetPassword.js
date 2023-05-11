import { Box, Button, Typography } from "@mui/material"
import { Field, Form } from "react-final-form"
import TextInput from "../library/TextInput"
import { Link } from "react-router-dom"

const ResetPassword = () => {
  return (
    <Box  p={3} textAlign={"center"} bgcolor="#fff" boxShadow={'0px 0px 17px 5px #dbdada'} minWidth={"350px"} >
      <Typography textAlign={"center"} variant="h5" fontWeight={"bold"} pb={1} >Rate Me</Typography>
      <Form
        onSubmit={(data) => {
          console.log(data)
        }}
        validate={(data) => {
          const errors = {};
          if (!data.newPassword) {
            errors.newPassword = "Password Required";
          }else if(data.newPassword.length < 6) {
            errors.newPassword = "password should be at least 6 characters long";
          }
          if(!data.confirmPassword) {
            errors.confirmPassword = "Confirm Password Required";
          }else if(data.newPassword !== data.confirmPassword){
            errors.confirmPassword = "Passwords do not match";
          }
          return errors;
        }}
      >
        {
          (props) => {
            return (
              <form onSubmit={props.handleSubmit} action="">
                <Field name="newPassword" type="password" placeholder="Enter new Password" component={TextInput} />
                <Field name="confirmPassword" type="password" placeholder="Enter Confirm Password" component={TextInput} />
                <Button type="submit" >Change Password</Button>
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

export default ResetPassword
