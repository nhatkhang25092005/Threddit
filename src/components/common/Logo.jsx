import { useThemeContext } from "../../theme/ThemeContext"
import logoDark from '../../assets/icons/logo_dark.png'
import logoLight from '../../assets/icons/logo_light.png'

export default function Logo({sx, size = null}){
  const {mode} = useThemeContext()
  const setsize = {
    small:{
      height:'1rem',
      width:'1rem'
    },
    normal:{
      height:'2rem',
      width:'2rem'
    },
    large:{
      height:'5rem',
      width:'5rem'
    }
  }
  return(
    <img
      style={{height:'50%',width:'50%',marginTop:'5rem',...sx, ...(size !== null ? setsize?.[size] : null )}}
      src={mode === 'dark' ? logoDark : logoLight}
      alt="logo"
    />
  )
}