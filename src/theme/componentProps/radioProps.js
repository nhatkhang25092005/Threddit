import { getTheme } from "../helper/getTheme"
import {COLOR} from '../color'
export const radioProps = (mode) => {
  const theme = getTheme(mode)
  return{
    MuiRadio:{
      styleOverrides:{
        root:{
          color:COLOR.radio[theme],
          "&.Mui-checked": {
            color: COLOR.radio[theme]
          },

          "&.Mui-focusVisible": {
            outline: "2px solid white",
            outlineOffset: "2px",
          },
        }
      }
    }
  }
}