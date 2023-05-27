import { Box, Button, IconButton, Popover, Typography } from '@mui/material'
import React from 'react'
import DeleteIcon from '@mui/icons-material/Delete'
import { deleteDepartment } from '../../store/actions/departmentActions'
import { useDispatch } from 'react-redux'

export default function DeleteDepartment({ departmentId, name }) {
  const [anchorEl, setAnchorEl] = React.useState(null)
  const dispatch = useDispatch()

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const open = Boolean(anchorEl)

  const deleteDept = () => {
    dispatch(deleteDepartment(departmentId))
  }

  return (
    <>
      <IconButton onClick={handleClick}>
        <DeleteIcon sx={{ color: 'red' }} />{' '}
      </IconButton>
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
      >
        <Typography sx={{ p: 2 }}>
          All department data including employees and their rating will be
          deleted. Do you want to delete this <b>{name}</b> department?
        </Typography>
        <Box textAlign="center" pb={2}>
          <Button onClose={handleClose}>Close</Button>
          <Button
            onClick={deleteDept}
            sx={{ ml: 2 }}
            variant="contained"
            color="error"
          >
            Delete
          </Button>
        </Box>
      </Popover>
    </>
  )
}
