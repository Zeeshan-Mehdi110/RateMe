import { Box, Grid, Typography } from "@mui/material";
import department1 from "../../static/state3.jpeg"
import department2 from "../../static/state.jpeg"
const About = () => {

  return (
    <>
      <Grid container sx={{ display: 'flex !important', padding: { xs: "20px", sm: "0px" }, 'backgroundColor': '#F2F0FF', "marginTop": "36px" }}>
        <Grid item md={6} xs={12} sx={{ display: 'flex', textAlign: "center", 'alignItems': 'center' }} >
          <Box dipslay="flex" alignItems="center" >
            <Typography variant="subtitle1" component="div" sx={{ 'color': '#FB2E86', 'fontFamily': 'Lato', 'fontStyle': 'normal', 'fontWeight': '700', 'fontSize': '16px', 'lineHeight': '28px' }}>
              Users can give feedback by scanning a QR code.
            </Typography>
            <Typography component="div" sx={{ 'fontFamily': 'Josef Sans', "fontSize": { xs: "28px", md: "40px" }, 'fontWeight': 'bold', 'lineHeight': '70px', 'letterSpacing': '1.5' }}>
              Feedback System for Government Departments
            </Typography>
            <Typography my={3} component="div" sx={{ 'color': '#8A8FB9', 'fontFamily': 'Lato', 'fontStyle': 'normal', 'fontWeight': '600', 'fontSize': '16px', 'lineHeight': '28px' }}>
              This project is a feedback system that allows local users to give feedback on the services provided by government departments. The feedback is collected by scanning a QR.
            </Typography>
          </Box>
        </Grid>
        <Grid item md={6} xs={12} textAlign={"center"} >
          <img src={department1} style={{ "maxWidth": '100%' }} />
        </Grid>
      </Grid>
      <Grid container sx={{ display: 'flex !important', paddingX: { xs: "20px", "md": "0px" }, "flexDirection": { xs: "column-reverse", md: "row" }, 'backgroundColor': '#F2F0FF' }}>
        <Grid item md={6} xs={12} textAlign={"center"} sx={{ "marginTop": { xs: "25px", sm: "0px" } }} >
          <img src={department2} style={{ "maxWidth": '100%' }} />
        </Grid>
        <Grid item md={6} xs={12} sx={{ display: 'flex', textAlign: "center", 'alignItems': 'center' }} >
          <Box dipslay="flex" alignItems="center" >
            <Typography component="div" sx={{ 'fontFamily': 'Josef Sans', "fontSize": { xs: "28px", md: "40px" }, 'fontWeight': 'bold', 'lineHeight': '70px', 'letterSpacing': '1.5' }}>
              Features
            </Typography>
            <Typography component="ul" sx={{ 'color': '#FB2E86', "textAlign": "justify", 'fontFamily': 'Lato', 'fontStyle': 'normal', 'fontWeight': '700', 'fontSize': '16px', 'lineHeight': '28px' }}>
              <Typography component="li" fontFamily="Josefin Sans" >
                Public can give feedback by scanning a QR code.
              </Typography>
              <Typography component="li" fontFamily="Josefin Sans" >
                Feedback is stored in a database for analysis.
              </Typography>
              <Typography component="li" fontFamily="Josefin Sans" >
                Public can also give rating to employees.
              </Typography>
              <Typography component="li" fontFamily="Josefin Sans">
                Admins can add , edit and delete new employee and Departments.
              </Typography>
              <Typography component="li" fontFamily="Josefin Sans">
                Admins and employees List is also availble with pagination.
              </Typography>
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </>
  )
}

export default About