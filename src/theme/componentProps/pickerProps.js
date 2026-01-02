import { getTheme } from "../helper/getTheme"

export const pickerProps = (mode) => {
  const theme = getTheme(mode)

  return {
    MuiPickersInputBase: {
      styleOverrides: {
        root: {
          '& .MuiPickersOutlinedInput-notchedOutline': {
            borderColor: 'red',
          },
          '&.Mui-focused .MuiPickersOutlinedInput-notchedOutline': {
            border: 'solid red 1px',
          },
        },
        input:{
          '&.Mui-focused':{
            borderColor:'white'
          }
        }
      },
    },
  }
}
