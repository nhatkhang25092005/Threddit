import { FileEdit } from 'lucide-react'
import { useTheme } from '@mui/material/styles'
export default function Edit({onClick}){
  const theme = useTheme()
  return (
    <FileEdit
      onClick={onClick}
      color={theme.palette.mode === 'dark' ? '#fff' : '#000'}
      style={{
        cursor:'pointer',
        transition:'0.2s'
      }}
      onMouseEnter={(e)=>(e.currentTarget.style.opacity = 0.7)}
      onMouseLeave={(e)=>(e.currentTarget.style.opacity = 1.0)}
    />
  )
}
