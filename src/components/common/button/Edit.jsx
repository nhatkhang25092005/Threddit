import {useThemeContext} from '../../../theme/ThemeContext'
import { FileEdit } from 'lucide-react'
export default function Edit({onClick}){
  const {mode} = useThemeContext()
  return (
    <FileEdit
      onClick={onClick}
      color={mode === 'dark' ? '#fff' : '#000'}
      style={{
        cursor:'pointer',
        transition:'0.2s'
      }}
      onMouseEnter={(e)=>(e.currentTarget.style.opacity = 0.7)}
      onMouseLeave={(e)=>(e.currentTarget.style.opacity = 1.0)}
    />
  )
}