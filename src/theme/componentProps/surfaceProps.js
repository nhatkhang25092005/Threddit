import { COLOR } from "../color"
const baseAuthProps = {
  minHeight: '100vh',
  maxHeight:'fit-content',
  width: '35vw',
  paddingTop:'3rem',
  paddingBottom:'2rem',
  borderRadius:'0px',
  paddingLeft:'2rem',
  paddingRight:'2rem',
  position:'relative',
  overflow:'hidden',
  overflowY:'auto',
  overflowX:'hidden'
}

const baseDefaultProps = {
  height:'fit-content',
  width:'fit-content',
  padding:'1rem',
}

export const surfaceProps = {
  MuiPaper:{
    variants:[
      {
        props:{variant:'auth'},
        style: ({theme}) => ({
          ...baseAuthProps,
          backgroundColor: COLOR.background.surface.auth[theme.palette.mode],
        })
      },
      {
        props:{variant:'default'},
        style:({theme})=>({
          backgroundColor:COLOR.background.surface.default[theme.palette.mode].bg,
          boxShadow: `1px 1px 0px 2px ${COLOR.background.surface.default[theme.palette.mode].shadow}`,
          ...baseDefaultProps
        })
      },
      {
        props:{variant:'navigate'},
        style:({theme})=>({
          backgroundColor:COLOR.background.surface.navigate[theme.palette.mode],
          display: "flex",
          flexDirection: "column",
          alignItems: "flexStart",
          height: "100%",
          borderRadius:0,
          left: 0,
          top: 0,
          position:'fixed',
          zIndex:"20",
        })
      }
    ],
  }
}