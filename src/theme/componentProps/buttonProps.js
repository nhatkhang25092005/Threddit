import {COLOR} from '../color'
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
          },
          boxShadow:`4px 4px 4px ${COLOR.button.google.shadow[theme.palette.mode]}`,
          '&:hover':{
            backgroundColor:COLOR.button.google.hover,
          }
        })
      },
      {
        props:{variant:'warning'},
        style:({theme})=>({
          color:COLOR.button.warning[theme.palette.mode].text,
          backgroundColor:COLOR.button.warning[theme.palette.mode].bg,
          boxShadow:`4px 4px 4px ${COLOR.button.warning[theme.palette.mode].shadow}`,
        })
      },
      {
        props:{variant:'dialog'},
        style:({theme})=>({
          backgroundColor:COLOR.button.dialog.bg[theme.palette.mode],
          transition:'transform 0.1s ease-in-out',
          '&:hover':{
            transform:'scale(1.02)'
          }
        })
      }
    ]
  }
}