import {COLOR} from '../color'

const BASE = {
  borderRadius:'50%',
  width:"3rem",
  minWidth : '3rem',
  height:'3rem',
  marginLeft:'auto',
  marginRight:'auto',
  padding:'0.8em',
  marginTop:'auto',
  '& svg':{
    width: '2rem',
    height: '2rem',
    display: 'block'
  }
}

export const buttonProps = {
  MuiButton:{
    variants:[
      {
        props:{variant:'primary'},
        style:({theme}) =>({
          backgroundColor:COLOR.button.primary.default.bg[theme.palette.mode],
          color:COLOR.button.primary.default.text[theme.palette.mode],
          fontWeight:'bold',
          boxShadow:`4px 4px 4px ${COLOR.button.primary.default.shadow[theme.palette.mode]}`,
        
          '&.Mui-disabled':{
            backgroundColor:COLOR.button.primary.disable.bg[theme.palette.mode],
            color:COLOR.button.primary.disable.text[theme.palette.mode]
          }
        })
      },
      {
        props:{variant:'google'},
        style:({theme})=>({
          backgroundColor:COLOR.button.google.bg,
          ...BASE,
          boxShadow:`4px 4px 4px ${COLOR.button.google.shadow[theme.palette.mode]}`,
          '&:hover':{
            backgroundColor:COLOR.button.google.hover,
          }
        })
      }
    ]
  }
}