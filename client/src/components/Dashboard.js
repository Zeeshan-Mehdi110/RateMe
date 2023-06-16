import { Box, Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CorporateFareIcon from '@mui/icons-material/CorporateFare';
import { hideProgressBar, showProgressBar } from "../store/actions/progressBarAction";
import { showError } from "../store/actions/alertActions";
import { userTypes } from "../utils/constants";
import StarHalfIcon from '@mui/icons-material/StarHalf';
import PeopleIcon from '@mui/icons-material/People';
import axios from "axios";

function Dashbord() {
  const dispatch = useDispatch();
  const loggedInUserTypes = useSelector(state => state.auth.user.type)
  const [stats, setStats] = useState({
    departments: 0,
    employees: 0,
    ratings: 0
  })
  useEffect(() => {
    dispatch(showProgressBar());
    axios.get('/api/employees/dashboard').then(result => {
      setStats(result.data.stats)
      dispatch(hideProgressBar())
    }).catch(error => {
      let message = error && error.response && error.response.data ? error.response.data.error : error.message;
      dispatch(hideProgressBar())
      dispatch(showError(message))
    })
  }, [])
  return (
    <Box>
      <Grid container spacing={2}>

        {
          loggedInUserTypes === userTypes.USER_TYPE_SUPER &&
          <Grid item md={4} xs={12}>
            <Box textAlign="center" backgroundColor="#ececec" p={3} borderRadius={2} sx={{ fontSize: "30px" }}>
              <CorporateFareIcon sx={{ fontSize: "inherit" }} />
              <br />
              departments
              <br />
              {stats.departments}
            </Box>
          </Grid>
        }

        <Grid item md={4} xs={12}>
          <Box textAlign="center" backgroundColor="#ececec" p={3} borderRadius={2} sx={{ fontSize: "30px" }}>
            <PeopleIcon sx={{ fontSize: "inherit" }} />
            <br />
            Employees
            <br />
            {stats.employees}
          </Box>
        </Grid>

        <Grid item md={4} xs={12}>
          <Box textAlign="center" backgroundColor="#ececec" p={3} borderRadius={2} sx={{ fontSize: "30px" }}>
            <StarHalfIcon sx={{ fontSize: "inherit" }} />
            <br />
            Ratings
            <br />
            {stats.ratings}
          </Box>
        </Grid>

      </Grid>

    </Box>
  )
}

export default Dashbord;