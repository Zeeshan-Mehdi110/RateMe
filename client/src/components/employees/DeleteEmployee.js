import { Box, Button, IconButton, Popover, Typography } from '@mui/material'
import React from 'react'
import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch } from 'react-redux';


export default function DeleteEmployee({ employeeId, name, deleteEmployee }) {

  const [anchorEl, setAnchorEl] = React.useState(null);
  const dispatch = useDispatch();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

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
          <Button onClick={() => { deleteEmployee(employeeId) }} sx={{ ml: 2 }} variant="contained" color="error">Delete</Button>
        </Box>
      </Popover>
    </>
  )
}