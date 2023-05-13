import { Box, CircularProgress } from '@mui/material'
import React from 'react'

const AppPreLoader = ({ message }) => {
  return (
    <Box  display='flex' justifyContent='center'  height='100%'  alignItems='center'>
      <Box display={"flex"} textAlign={'center'} >
        <CircularProgress />
        <h2>{message}</h2>
      </Box>
    </Box>
  )
}

export default AppPreLoader
