import { AppBar, Box, Tab, Tabs, Toolbar, Typography, } from "@mui/material";
import { Link } from "react-router-dom";
import { useState } from "react";
import StarsIcon from '@mui/icons-material/Stars'


const Header = () => {
  const [value, setValue] = useState();


  return (
    <AppBar color="primary" position="sticky" sx={{ "width": "100%" }} >
      <Toolbar>
        <Box display={"flex"} alignItems={"center"} >
          <Link to="/" style={{ color: "white", "marginRight": "10px" }}>
            <StarsIcon />
          </Link>
          <Typography
            variant="h6"
            component={Link}
            to={"/"}
            sx={{
              mr: 2,
              display: 'flex',
              fontFamily: 'Josefin Sans',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none'
            }}
          >
            RateMe
          </Typography>
        </Box>
        <Box marginRight={"auto"} marginLeft="auto">
          {/* Autocomplete code */}
        </Box>
        <Box display="flex">
          <Tabs onChange={(e, val) => setValue(val)} value={value} textColor="#FFFFFF">
            <Tab component={Link} to="/" label="Home" sx={{ "fontFamily": "Josefin Sans" }} />
            <Tab component={Link} to="/admin/signin" label="Admin" sx={{ "fontFamily": "Josefin Sans" }} />
          </Tabs>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
