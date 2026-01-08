import {
  CheckCircle,
  CheckCircle2,
  CircleCheck,
  CircleCheckBig
} from 'lucide-react'

import {Box} from '@mui/material'

import { useThemeContext } from '../../../theme/ThemeContext'
export default function Ok({type = 1, sx, onClick}){
  const {mode} = useThemeContext()
  const t = {
    1 : CheckCircle,
    2 : CheckCircle2,
    3 : CircleCheck,
    4 : CircleCheckBig
  }
  const Component = t[type]
  return (
    <Box
      component={Component}
      onMouseDown={onClick}
      sx={{
        cursor: 'pointer',
        color: mode === 'dark' ? 'white' : 'black',
        transition: 'transform 0.1s ease-in-out',
        '&:hover': {
          transform: 'scale(1.2)',
        },
        ...sx
      }}
    />
  )
}