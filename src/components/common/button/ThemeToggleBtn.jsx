import {useThemeContext} from '@/theme/ThemeContext'
import {Sun, Moon} from 'lucide-react'
import {Box, Button, Typography} from '@mui/material'
import { useTheme } from '@mui/material/styles'
export default function ThemeToggleBtn({sx, label, labelSx, iconWrapSx}){
  const {toggleTheme} = useThemeContext()
  const theme = useTheme()

  const icon = theme.palette.mode === 'light'
    ? <Moon size={20} color='currentColor'/>
    : <Sun size={20} color='currentColor'/>

  if (label) {
    return(
      <Box component='button' type='button' onClick={toggleTheme} sx={sx}>
        <Box sx={iconWrapSx}>
          {icon}
        </Box>
        <Typography sx={labelSx}>{label}</Typography>
      </Box>
    )
  }

  return(
    <Button onClick={toggleTheme} variant='primary' sx={sx}>
      {icon}
    </Button>
  )
}
