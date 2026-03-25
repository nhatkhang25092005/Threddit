import { COLOR } from "../color"
import { getTheme } from "../helper/getTheme"

export const pickerProps = (mode) => {
  const theme = getTheme(mode)

  return {
    MuiPickersInputBase: {
      styleOverrides: {
        root: {
          '& .MuiPickersOutlinedInput-notchedOutline': {
            borderColor: COLOR.textfield.border.default[theme],
          },
          '&.Mui-focused .MuiPickersOutlinedInput-notchedOutline': {
            border: `solid ${COLOR.textfield.border.focus[theme]} 1px`,
          },
        },
        input:{
          '&.Mui-focused':{
            borderColor:COLOR.textfield.border.focus[theme]
          }
        }
      },
    },
  }
}
