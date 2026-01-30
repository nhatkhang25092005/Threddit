import { responsive } from "../../utils/responsive"
export const style = {
  read_all_btn:{
    btn:{
      px:'2px'
    },
    loading_container:{
      display:'flex',
      flexDirection:'row',
      alignItems:'center',
      gap:'0.3rem',
    },
  },
  popover:{
    container:{
      display:'flex',
      flexDirection:'column',
    },
    header:{
      display:'flex',
      flexDirection:'row',
      justifyContent:'space-between',
      alignItems:'center'
    },
    tabs_controller:{
      bgcolor:'transparent',
      p:0,
      boxShadow:'none',
      '& .MuiTouchRipple-root': {
        display: 'none'
      }
    }
  },
  page:{
    container:{
      display:'flex',
      flexDirection:"column",
      ...responsive.width()
    },
    tabs_controller:{
      bgcolor:'transparent',
      p:0,
      boxShadow:'none',
      '& .MuiTouchRipple-root': {
        display: 'none'
      }
    },
    surface:{
      width:'100%',
      mt:'1rem',
      position:'relative'
    }
  },

  notification:{
    container:(mode)=>({
      display:'flex',
      flexDirection:'row',
      gap:1,
      mt:'1rem',
      width:'100%',
      height:'5rem',
      position:'relative',
      cursor:'pointer',
      p:'0.4rem',
      borderRadius:'0.5rem',
      transition:'ease 0.2s',
      '&:hover':{
          bgcolor:mode === 'dark' ? '#ffffff3f': '#c3c3c3',
          '& .horizon-menu':{
            opacity:'1'
          }
        }
    }),
    circle_icon:{color:'#a0ff48', position:'absolute', right:'0.2rem'},
    avatar:{width:'3.5rem', height:'3.5rem'},
    content:{
      container:{
        display:'flex',
        height:'4.5rem',
        flexDirection:'column',
        flex:1,
      },
      time:(isRead)=>({
        fontSize:"12px",
        color:isRead ? '#b5b5b5' : '#64e8ff',
        fontWeight:'bold'
      }),
      message:(isRead, mode)=>({
        width: '100%',
        pt:'1px',
        overflow: 'hidden',
        height:'3.5rem',
        display: '-webkit-box',
        WebkitLineClamp: 3,
        WebkitBoxOrient: 'vertical',
        textOverflow: 'ellipsis',
        wordBreak: 'break-word',
        fontSize:'13px',
        color:isRead
          ? (mode === 'dark' ?'#b5b5b5' : '#5d5c5c')
          : (mode === 'dark' ? 'white' : 'black')
      }),
      menu:{ // style syntax, not sx
        marginTop:'auto',
        marginBottom:'auto',
        marginRight:'0.3rem',
        opacity:'0',
      }
    }
  }
}