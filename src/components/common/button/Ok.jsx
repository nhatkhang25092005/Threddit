import {
  CheckCircle,
  CheckCircle2,
  CircleCheck,
  CircleCheckBig
} from 'lucide-react'

import {Box} from '@mui/material'
import { useTheme } from '@mui/material/styles'
export default function Ok({type = 1, sx, onClick}){
  const theme = useTheme()
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
        color: theme.palette.mode === 'dark' ? 'white' : 'black',
        transition: 'transform 0.1s ease-in-out',
        '&:hover': {
          transform: 'scale(1.2)',
        },
        ...sx
      }}
    />
  )
}
