export const style = {
  header:{
    container:{
      position:'relative',
    },
    skeleton:{
      bg:{
        height: '18rem',
        mt:'-2rem',
        width:'100%',
        borderEndEndRadius:'0.5rem',
        borderEndStartRadius:'0.5rem'
      }
    },
    fade:{
      bg:{width:'100%', mt:'-2rem'}
    },
    info_container:{
      container:{
        px:'1rem',
        position:'absolute',
        width:"100%",
        bottom:'-6rem',
        display:'flex',
        flexDirection:'row'
      },
      base_info:{
        container:{
          display:'flex',
          flexDirection:'column',
          justifyContent:'flex-end',
          alignItems:'flex-start',
          pb:'1rem',
          width: '100%',
          flexGrow: 1
        }
      },
      avatar:(hasStory)=>({
        width:'9rem',
        border: hasStory === true ? 'solid white 2px' : null,
        height:'9rem',
      }),

      bg_avatar:(mode)=>({
        width:'10rem',
        height:'10rem',
        backgroundColor:mode === 'dark' ? '#0A0B0B' : 'white'
      }),

      create_feed_button:{
        height:'fit-content',
        width:'7rem',
        my:'auto',
        display:'flex',
        flexDirection:'row',
        gap:'0.2rem',
        p:'0rem',
        pr:'1rem',
        textTransform:'none',
        '&:hover':{bgcolor:'#d8d8d8'}
      },

      edit_button:{
        height:'fit-content',
        width:'7rem',
        my:'auto',
        p:0,
        ml:2
      }
    }
  },
  container:{
    height:'100vh',
    width:'55rem',
    display:'flex',
    flexDirection:'column',
    padding:'0px',
    mb:'10rem',
    mx:'auto'
  },

  body:{
    tabs_controller:{
      width:'100%',
      height:'fit-content',
      mt:'7rem',
      padding:'0',
      mb:3
    },

    main_profile:{
      container:{
        width:'100%',
        height:'fit-content',
        flexDirection:'row',
        alignItems:'flex-start',
        justifyContent:'space-between',
        display:'flex',
        px:'0',
        margin:'0'
      },
      surface:{
        width:'30%',
        display:'flex',
        flexDirection:'column',
        alignItems:'start',
        gap:2
      },
      title:{
        fontWeight:'bold'
      },
      
      block:{
        display:'flex',
        flexDirection:'row',
        alignItems:'center',
        width:'100%',
        gap:'0.5rem'
      },

      button:{
        textTransform:'none',
        mx:'auto'
      }
    }
  },

  modal:{
    confirm_background:{
      surface:{
        maxHeight:'40rem',
        mx:'auto',
        display:'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap:'1rem',
        flexDirection:'column',
        mt:'3rem',
        width:'58rem',
        position:'relative'
      },
      card_media_container:{
        height:'18rem', overflow:'hidden', width:"100%"
      },
      card_media:{
        borderRadius:"0.5rem",
        width: '100%',
        height: '100%',
      },
      button_container:{
        display:'flex',
        flexDirection:'row',
        gap:4
      },
      update_button:{
        width:"10rem", mx:"auto",textTransform:'none'
      },
      close_icon:{
        position:'absolute',
        right:'1rem',
        top:'1rem'
      }
    },

    edit_bio:{
      surface:{
        mx:'auto',
        mt:'8rem',
        display:'flex',
        flexDirection:'column',
        gap:3
      },
      block:{
        display:'flex',
        flexDirection:'row',
        alignItems:'center',
        gap:'1rem',
        width:'100%'
      },

      submit_button:{
        textTransform:'none'
      }
    }
  }
}