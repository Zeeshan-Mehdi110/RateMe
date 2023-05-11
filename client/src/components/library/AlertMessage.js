import { Alert, Box, Snackbar } from "@mui/material";
import { connect } from "react-redux";
import { clearAlert } from "../../store/actions/alertActions";

const AlertMessage = ({alert,clearAlert}) => {
  let variant = null;
  for(let key in alert)
  if(alert[key])
  variant = key;

  if(!variant) return null;
  return (
    <Box>
      <Snackbar open={true} anchorOrigin={{"vertical":"top","horizontal":"center"}} autoHideDuration={5000} onClose={clearAlert} >
        <Alert severity={variant}>{alert[variant]}</Alert>
      </Snackbar>
    </Box>
  )
}

const mapStateToProps = (state) => {
  return {
      alert: state.alert
    }
}

const wrapper = connect(mapStateToProps,{clearAlert})

export default wrapper(AlertMessage);