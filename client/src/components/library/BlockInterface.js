import { Box } from '@mui/material'
import { useSelector } from 'react-redux'

const BlockInterface = () => {
  const loading = useSelector((state) => state.progressBar.loading)
  return (
    loading && (
      <Box
        height={'100%'}
        width={'100%'}
        bgcolor={'#ffffff8a'}
        position={'absolute'}
        top={'0px'}
        left={'0px'}
        zIndex={1}
      ></Box>
    )
  )
}

export default BlockInterface
