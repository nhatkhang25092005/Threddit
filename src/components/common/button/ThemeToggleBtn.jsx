import {useThemeContext} from '@/theme/ThemeContext'
import {Sun, Moon} from 'lucide-react'
import {Button} from '@mui/material'
export default function ThemeToggleBtn({sx}){
  const {mode, toggleTheme} = useThemeContext()
  return(
    <Button onClick={toggleTheme} variant='primary' sx={sx}>
      {mode === 'light' ? <Moon size={20} color='white'/> : <Sun size={20} color='black'/>}
    </Button>
  )
}