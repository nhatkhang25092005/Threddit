import {memo} from 'react'
import {Box} from '@mui/material'
const PostFooter = memo(({children, isLastPost, hasComments})=>{
  const borderStyle = (isLastPost || hasComments)
    ? { borderBottom: "none" }
    : { borderBottom: "solid #BCBDBF 1px" };
  
  return(
    <Box
      sx={{
      py: "1rem",
      mb: isLastPost || hasComments ? "0" : "1rem",
      ...borderStyle
    }}
    >
      {children}
    </Box>
  )
})

PostFooter.displayName = 'PostFooter'
export default PostFooter