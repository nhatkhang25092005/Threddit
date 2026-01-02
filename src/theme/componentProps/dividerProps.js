import {COLOR} from '../color'
export const dividerProps = {
  dark:{
    MuiDivider:{
      styleOverrides:{
        root:{
          backgroundColor:COLOR.divider.dark,
          height:'2px',
          width:'100%',
          border:'none'
        }
      },
      variants:[
        {
          props:{variant:'thick'},
          style:{
            width:'100%',
            height:'2px',
            backgroundColor:COLOR.divider.dark
          }
        },
        {
          props:{variant:'dashed'},
          style:{
            backgroundImage:`linear-gradient(to right, ${COLOR.divider.dark} 50%, transparent 50%)`,
            backgroundSize:'10px 2px',
            backgroundRepeat:"repeat-x",
            backgroundColor:'transparent',
            height:'2px'
          }
        }
      ]
    }
  },
  light:{
    MuiDivider:{
      styleOverrides:{
        root:{
          backgroundColor: COLOR.divider.light,
          height: '1px',
          width:'100%',
          border: 'none'
        }
      },
      variants:[
        {
          props: {variant: 'thick'},
          style: {
            height: '2px',
            backgroundColor: COLOR.divider.light
          }
        },
        {
          props: {variant: 'dashed'},
          style: {
            backgroundImage: `linear-gradient(to right, ${COLOR.divider.light} 50%, transparent 50%)`,
            backgroundSize: '10px 1px',
            backgroundRepeat: 'repeat-x',
            backgroundColor: 'transparent',
            height: '1px'
          }
        }
      ]
    }
  }
}