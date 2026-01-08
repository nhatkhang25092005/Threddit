export const style = {
  hub:{
    container:{
      position:'relative',
      overflow:'hidden'
    },
    slide_container:(condition)=>({
      position : condition ? 'relative' : 'absolute',
      width:'100%'
    })
  },
  request:{

  },
  verify:{
    otp_container:{
      width:'100%',
      p:'1rem',
      px:'2rem'
    }
  }
}