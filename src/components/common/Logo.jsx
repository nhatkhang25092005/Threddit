import { useThemeContext } from "../../theme/ThemeContext"
import logoDark from '../../assets/icons/logo_dark.png'
import logoLight from '../../assets/icons/logo_light.png'

export default function Logo(){
  const {mode} = useThemeContext()
  console.log(mode)
  return(
    <img
      style={{height:'50%',width:'50%',marginTop:'5rem'}}
      src={mode === 'dark' ? logoDark : logoLight}
      alt="logo"
    />
  )
}