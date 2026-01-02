import { getTheme } from "../helper/getTheme"
import {COLOR} from '../color'
export const formLabelProps = (mode) => {
  const theme = getTheme(mode)
  return {
    MuiFormLabel: {
      styleOverrides:{
        root:{
          color:{color:COLOR.form_label[theme]},
          '&.Mui-focused':{color: COLOR.form_label[theme]}
        }
      }
    }
  }
}