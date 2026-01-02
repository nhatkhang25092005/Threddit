import {COLOR} from '../color'
import { getTheme } from '../helper/getTheme'
const baseProps = {
  MuiTextField:{
    styleOverrides:{
      root:{
        width:'100%'
      }
    }
  }
}

export const textfieldProps = (mode) => {
  const t = getTheme(mode)
  return{
    ...baseProps,
    MuiInputBase:{
      styleOverrides:{
        input:({theme})=>({
          ...theme.typography.normal,
          color:COLOR.textfield.text.placeholder.dark,
          width:"100%"
        })
      }
    },
    MuiInputLabel:{
      styleOverrides:{
        root:({theme})=>({
          ...theme.typography.normal,
          marginBottom:'4px',
          color:COLOR.textfield.text.label.default[t],
          '&.Mui-focused':{color:COLOR.textfield.text.label.focus[t]},
        })
      }
    },
    MuiInput:{
      styleOverrides:{
        root:{
          '&:before':{borderBottomColor:COLOR.textfield.border.default},
          '&:after':{borderBottomColor:COLOR.textfield.border.after[t]}
        }
      }
    }
  }
}