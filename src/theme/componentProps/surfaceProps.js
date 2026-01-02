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
  backgroundColor:'transparent'
}

export const surfaceProps = {
  dark:{
    MuiPaper:{
      variants:[
        {
          props:{variant:'auth'},
          style:{
            ...baseAuthProps,
            backgroundColor: COLOR.background.surface.auth.dark,
          }
        },
        {
          props:{variant:'default'},
          style:{
            border:'2px solid white',
            ...baseDefaultProps
          }
        }
      ]}
    },

  light:{
    MuiPaper:{
    variants:[
      {
        props:{variant:'auth'},
        style:{
          backgroundColor: COLOR.background.surface.auth.light,
          ...baseAuthProps
        }
      },
      {
        props:{variant:'default'},
        style:{
          ...baseDefaultProps,
          border:'black solid 2px',
        }
      }
    ]}
  }
}