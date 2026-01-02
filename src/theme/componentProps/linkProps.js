import {COLOR} from '../color'
import {getTheme} from '../helper/getTheme'
export const linkProps = (mode = 'dark') => {
  const theme = getTheme(mode)
  return {
    MuiLink:{
      variants:[
        {
          props:{variant:'primary'},
          style:{
            color: COLOR.link.primary.default[theme],
            cursor:'pointer',
            textDecoration:'none',
            '&:hover':{
              color: COLOR.link.primary.hover[theme],
              textDecoration:'underline',
              textDecorationColor:COLOR.link.primary.hover[theme]
            }
          }
        },
        {
          props:{variant:'secondary'},
          style:{
            color:COLOR.link.secondary.default[theme],
            cursor:'pointer',
            textDecoration:'none',
            fontStyle:'italic',
            '&:hover':{
              color:COLOR.link.secondary.hover[theme],
              textDecoration:'underline',
              textDecorationColor:COLOR.link.secondary.hover[theme]
            }
          }
        }
      ]
    }
  }
}