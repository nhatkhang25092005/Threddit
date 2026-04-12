export const authLayout = {
  page:{
    display:'grid',
    gridTemplateColumns:{
      xs:'1fr',
      md:'minmax(0, 1fr) 420px',
    },
    gridTemplateRows:{
      xs:'minmax(0, 0.3fr) 1fr',
      md:'1fr',
    },
    minHeight:'100dvh',
  },

  symbol:{
    display:'flex',
    justifyContent:'center',
    alignItems:'center'
  }
}