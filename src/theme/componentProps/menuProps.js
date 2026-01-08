import {COLOR} from '../color'
export const menuProps = {
  MuiMenu:{
    variants:[
      {
        props:{variant:'default'},
        style:({theme})=>({
          '& .MuiPaper-root':{
            minWidth: '180px',
            borderRadius: '6px',
            backgroundColor:COLOR.background.surface.menu.default[theme.palette.mode],
            boxShadow:`4px 4px 4px ${COLOR.shadow.menu.default[theme.palette.mode]}`,
          }
        })
      }
    ]
  }
}