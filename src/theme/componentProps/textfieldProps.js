import {COLOR} from '../color'
const baseProps = {
  MuiTextField:{
    styleOverrides:{
      root:{
        width:'100%'
      }
    }
  }
}

export const textfieldProps = {
  ...baseProps,
  MuiInputBase:{
    styleOverrides:{
      input:({theme})=>({
        ...theme.typography.normal,
        color:COLOR.textfield.text.value[theme.palette.mode],
        width:"100%"
      })
    }
  },
  MuiOutlinedInput: {
    styleOverrides: {
      root: ({ theme }) => ({
        borderRadius: "0.9rem",
        backgroundColor: COLOR.textfield.background.default[theme.palette.mode],
        '& .MuiOutlinedInput-notchedOutline': {
          borderColor: COLOR.textfield.border.default[theme.palette.mode],
        },
        '&:hover .MuiOutlinedInput-notchedOutline': {
          borderColor: COLOR.textfield.border.focus[theme.palette.mode],
        },
        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
          borderColor: COLOR.textfield.border.focus[theme.palette.mode],
        },
      }),
      input: ({ theme }) => ({
        color: COLOR.textfield.text.value[theme.palette.mode],
        '&::placeholder': {
          color: COLOR.textfield.text.placeholder[theme.palette.mode],
          opacity: 1,
        },
      }),
    },
  },
  MuiInputLabel:{
    styleOverrides:{
      root:({theme})=>({
        ...theme.typography.normal,
        marginBottom:'4px',
        color:COLOR.textfield.text.label.default[theme.palette.mode],
        '&.Mui-focused':{color:COLOR.textfield.text.label.focus[theme.palette.mode]},
      })
    }
  },
  MuiInput:{
    styleOverrides:{
      root:({theme})=>({
        '&:before':{borderBottomColor:COLOR.textfield.border.default[theme.palette.mode]},
        '&:after':{borderBottomColor:COLOR.textfield.border.after[theme.palette.mode]}
      })
    },
    variants:[
      {
        props:{variant:'loading'},
        style:({theme})=>({
          '&:before':{borderBottomColor:COLOR.textfield.border.default[theme.palette.mode]},
          '&:after':{borderBottomColor:COLOR.textfield.border.after[theme.palette.mode]}
        })
      }
    ]
  }
}
