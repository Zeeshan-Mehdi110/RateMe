import { Box } from '@mui/material';
import Header from '../library/Header';
import SearchEmployees from './SearchEmployees';
import About from './About';

export default function Home() {


  return (
    <Box>
      <Header />
      <SearchEmployees />
      <About />
    </Box>
  )

};