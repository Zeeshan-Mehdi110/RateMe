import { Button } from '@mui/material'
import { Link } from 'react-router-dom'

const Departments = () => {
  return (
    <div>
      <Button
        component={Link}
        to="/admin/departments/edit/646cba384179a0f8078805df"
      >
        Edit Department
      </Button>
    </div>
  )
}

export default Departments
