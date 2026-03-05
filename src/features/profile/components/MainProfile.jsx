import { memo } from 'react'

import {style} from '../style'
import { Box } from '@mui/material'

import PostContainer from './PostContainer';
import Introduce from './Introduce';
import PinnedStoryContainer from '../../post/components';

const sx = style.body.main_profile

const MainProfile = memo(function MainProfile(){
  return(
    <Box sx={sx.container}>
      <Box sx={sx.leftColumn}>
        <Introduce/>
        <PinnedStoryContainer/>
      </Box>

      <Box sx={sx.rightColumn}>
        <PostContainer/>
      </Box>
    </Box>
  )
})

export default MainProfile
