import {
  Avatar,
  Box,
  Button,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography
} from '@mui/material'
import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { loadDepartments } from '../../store/actions/departmentActions'
import { connect } from 'react-redux'
import AddIcon from '@mui/icons-material/Add'
import RefreshIcon from '@mui/icons-material/Refresh'
import EditIcon from '@mui/icons-material/Edit'

function Employees() {
  useEffect(() => {
  }, [])
  return (
    <Box>
      Employees
    </Box>
  )
}

export default Employees
