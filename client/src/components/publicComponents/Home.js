import { Box } from '@mui/material';
import Header from '../library/Header';
import SearchEmployees from './SearchEmployees';
import About from './About';
import Footer from '../library/Footer';

export default function Home() {


  return (
    <Box>
      <Header />
      <SearchEmployees />
      <About />
      <Footer />
    </Box>
  )

};