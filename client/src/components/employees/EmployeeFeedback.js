import { Box, Pagination, Rating, Typography } from "@mui/material"
import { hideProgressBar, showProgressBar } from "../../store/actions/progressBarAction";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { showError } from "../../store/actions/alertActions";
import moment from "moment/moment";

const EmployeeFeedback = ({ employeeId }) => {
  const dispatch = useDispatch()
  const [page, setPage] = useState(1);
  const [ratings, setRatings] = useState([]);
  const [numOfPages, setNumOfPages] = useState(1)


  const loadRatigs = () => {
    dispatch(showProgressBar());
    axios.post('/api/employees/ratings', { employeeId, page }).then(result => {
      setRatings(result.data.ratings)
      setNumOfPages(result.data.numOfPages)
      dispatch(hideProgressBar())
    }).catch((err) => {
      let message =
        err && err.response && err.response.data
          ? err.response.data.error
          : err.message
      dispatch(hideProgressBar())
      dispatch(showError(message))
    })
  }
  useEffect(() => {
    loadRatigs()
  }, [page]);
  return (
    <Box mt={4} >
      <Typography variant="h5" gutterBottom >Recent Feedback</Typography>
      {
        ratings.map(rating => (
          <Box key={rating._id} bgcolor={"#ececec"} p={3} borderRadius={2} mb={2} >
            <Typography>
              {rating.name} <span style={{ "color": "#7a7a7a", "marginLeft": "15px" }} >({moment(rating.createdOn).fromNow()})</span>
            </Typography>
            {
              rating.phone && <Typography color={"#7a7a7a"} >{rating.phone}</Typography>
            }
            <Rating value={rating.rating} readOnly />
            {
              rating.message && <Typography sx={{ "mt": 2 }} >{rating.message}</Typography>
            }
          </Box>
        ))
      }
      <Box mt={3} display={"flex"} justifyContent={"center"} >
        <Pagination count={numOfPages} page={page} color='primary' onChange={(event, value) => { setPage(value) }} />
      </Box>
    </Box>
  )
}

export default EmployeeFeedback