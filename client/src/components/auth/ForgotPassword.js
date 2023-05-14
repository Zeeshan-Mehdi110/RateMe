import { Box, Button, CircularProgress, Typography } from "@mui/material"
import { Field, Form } from "react-final-form"
import TextInput from "../library/TextInput"
import { Link } from "react-router-dom"
import { useDispatch } from "react-redux"
import axios from "axios"
import { showError } from "../../store/actions/alertActions"

const ForgotPassword = () => {
  const dispatch = useDispatch()
  return (
    <Box  p={3} textAlign={"center"} bgcolor="#fff" boxShadow={'0px 0px 17px 5px #dbdada'} minWidth={"350px"} >
      <Typography textAlign={"center"} variant="h5" fontWeight={"bold"} pb={1} >Rate Me</Typography>
      <Form
        onSubmit={(data) => {
          return axios.post("/users/forgot-password",data).then(({data}) =>{

          }).catch((err) => {
            let message = err && err.response && err.response.data ? err.response.data.error : err.message;
            dispatch(showError(message))
          })
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
            const { invalid , submitting }  = props;
            return (
              <form onSubmit={props.handleSubmit} action="">
                <Field name="email" type="email" placeholder="Enter email address" component={TextInput} autoFocus />
                <Button type="submit" disabled={ submitting || invalid } >Reset Password { submitting && <CircularProgress size={20} style={{"marginLeft" : "10px"}} />  } </Button>
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
