import { Box, Grid, Typography } from "@mui/material";
import Slider from "react-slick";
import department1 from "../../static/state3.jpeg"
const About = () => {
  let settings = {
    dots: true,
    infinite: true,
    speed: 500,
    autoplay: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    appendDots: dots => (
      <div
        style={{
          color: '#FB2E86',
          bottom: '10px',
          fontSize: '20px'
        }}
      >
        <ul style={{ margin: "0px", fontSize: '20px' }}> {dots} </ul>
      </div>
    )
  };
  return (
    <Slider {...settings} >
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
        <Grid item md={6} xs={12} >
          <img src={department1} style={{ "maxWidth": '100%' }} />
        </Grid>
      </Grid>
    </Slider>
  )
}

export default About