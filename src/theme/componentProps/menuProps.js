import {COLOR} from '../color'
export const menuProps = {
  MuiMenu:{
    variants:[
      {
        props:{variant:'default'},
        style:({theme})=>({
          '& .MuiPaper-root':{
            minWidth: '180px',
            borderRadius: '14px',
            backgroundColor:COLOR.background.surface.menu.default[theme.palette.mode],
            border:`1px solid ${COLOR.app.border}`,
            boxShadow:`0 16px 32px ${COLOR.shadow.menu.default[theme.palette.mode]}`,
          }
        })
      }
    ]
  }
}
