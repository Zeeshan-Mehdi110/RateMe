import { Avatar, Box, Button, IconButton, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material'
import { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { loadDepartments } from '../../store/actions/departmentActions'
import { connect } from 'react-redux';
import AddIcon from '@mui/icons-material/Add';
import RefreshIcon from '@mui/icons-material/Refresh';
import EditIcon from '@mui/icons-material/Edit';
function Employees({ departments, loadDepartments }) {
  const { deptId } = useParams()
  useEffect(() => {
    // if (departments.length === 0)
    //   loadDepartments()
  }, []);
  return (
    <Box>
      <Box display='flex' justifyContent='space-between'>
        <Typography variant='h5'>Employees</Typography>
        <Box>
          <Button component={Link} to={`/admin/departments/edit/${deptId}`} variant='outlined' sx={{ mr: 1 }} startIcon={<EditIcon />}> Edit Department</Button>
          <Button component={Link} to="/admin/employees/add" variant='outlined' startIcon={<AddIcon />}> Add Employees</Button>
        </Box>
      </Box>
    </Box>
  )
}
export default Employees
