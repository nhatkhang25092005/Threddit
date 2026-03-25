import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import {Box} from "@mui/material"
import { useTheme } from "@mui/material/styles";
export default function LeftArrow({sx, onClick}){
  const theme = useTheme()
  return(
    <Box
      onClick = {onClick}
      sx={{
        cursor:'pointer',
        transition:'transform 0.1s ease',
        "&:hover":{
          transform:"scale(1.5)"
        },
        ...sx
      }}
    >
      <KeyboardBackspaceIcon 
      sx={{color:theme.palette.mode === 'dark' ? 'white' : 'black'}}/>
    </Box>
  )
}
