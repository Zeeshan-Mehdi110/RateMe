import { Box, CircularProgress } from '@mui/material'
import React from 'react'

const AppPreLoader = ({ loader }) => {
  return (
    <Box display='flex' justifyContent='center' height='100%' alignItems='center'>
      <Box display={"flex"} textAlign={'center'} >
        {/* <CircularProgress /> */}
        <img src={loader} alt="loadeing..." />
      </Box>
    </Box>
  )
}

export default AppPreLoader
