import { Box, Button, IconButton, Popover, Typography } from '@mui/material'
import React from 'react'
import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch } from 'react-redux';
import { deleteDepartment } from '../../store/actions/departmentActions';
import axios from 'axios';
import { showError, showSuccess } from '../../store/actions/alertActions';
import { hideProgressBar, showProgressBar } from '../../store/actions/progressBarAction';

export default function DeleteEmployee({ employeeId, name }) {

  const [anchorEl, setAnchorEl] = React.useState(null);
  const dispatch = useDispatch();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const deleteEmployee = () => {
    dispatch(showProgressBar())
    axios
      .post('api/employees/delete', { id: employeeId })
      .then(({ data }) => {
        if (data.success) {
          dispatch(showSuccess('Employee deleted successfully'))
          dispatch(hideProgressBar())
        }
      })
      .catch((error) => {
        dispatch(hideProgressBar())
        let message =
          error && error.response && error.response.data
            ? error.response.data.error
            : error.message
        dispatch(showError(message))
      })
  }

  const open = Boolean(anchorEl);

  return (
    <>
      <IconButton onClick={handleClick}><DeleteIcon color='error' /> </IconButton>
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <Typography sx={{ p: 2 }}>Do you want to delete <b>{name}</b>?</Typography>
        <Box textAlign="center" pb={2}>
          <Button onClick={handleClose} variant='contained' color='primary'>Close</Button>
          <Button onClick={deleteEmployee} sx={{ ml: 2 }} variant="contained" color="error">Delete</Button>
        </Box>
      </Popover>
    </>
  )
}