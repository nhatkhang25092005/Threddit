import { useThemeContext } from "../../theme/ThemeContext";
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import {Box} from "@mui/material"
export default function LeftArrow({sx, onClick}){
  const {mode} = useThemeContext()
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
      sx={{color:mode === 'dark' ? 'white' : 'black'}}/>
    </Box>
  )
}