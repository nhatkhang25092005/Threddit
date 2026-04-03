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
      button_container:{
        display:'flex',
        flexDirection:'column',
        gap:1,
        pt:'4.5rem',
        alignItems:'flex-end',
      },
      contract_buttons:{
        display:'flex',
        flexDirection:'row',
        gap:1,
        alignItems:'center',
        justifyContent:'center',
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
      avatar:(haveStory)=>(haveStory
        ? {
            width:'8.5rem',
            height:'8.5rem',
            cursor:'pointer',
            transition: 'transform 0.2s ease',
            '&:hover': {
              transform: 'scale(0.98)',
            },
          }
        : {
            width:'9rem',
            height:'9rem',
          }
      ),

      bg_avatar:(mode)=>({
        width:'10rem',
        height:'10rem',
        backgroundColor:mode === 'dark' ? '#071120' : 'white'
      }),

      create_feed_button:{
        height:'fit-content',
        width:'auto',
        minWidth:'8.5rem',
        maxWidth:'100%',
        my:'auto',
        display:'inline-flex',
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center',
        gap:'0.4rem',
        px:'1rem',
        py:'0.18rem',
        minHeight:'2rem',
        whiteSpace:'nowrap',
        flexShrink:0,
        textTransform:'none',
        '&:hover':{bgcolor:'#d8d8d8'}
      },
      follow_button:{
        btn_container:{
          my:'auto',
          height:'fit-content',
          textTransform:'none',
          py:0,
          maxWidth:'100%',
          width:'auto',
          ml:2,
          minWidth:'unset',
          whiteSpace: 'nowrap',
          alignItems: 'center',
        },
        content_box:{
          alignItems: 'center',
          display: 'inline-flex',
          gap: 1,
          whiteSpace: 'nowrap'
        }
      },

      friend_button: {
        btn_container: {
          my: 'auto',
          height: 'fit-content',
          textTransform: 'none',
          py: 0,
          px: 2,
          maxWidth: '100%',
          width: 'auto',
          ml: 1,
          minWidth: 'unset',
          whiteSpace: 'nowrap',
          alignItems: 'center',
          borderRadius: 999,
          '&:hover': {
            backgroundColor: 'action.hover'
          }
        },

        content_box: {
          alignItems: 'center',
          display: 'inline-flex',
          gap: 0.75,               // gap nhỏ hơn follow
          whiteSpace: 'nowrap',
          opacity: 0.9             // nhìn dịu hơn follow
        }
      },

      edit_button:{
        height:'fit-content',
        width:'auto',
        minWidth:'8.5rem',
        maxWidth:'100%',
        my:'auto',
        display:'inline-flex',
        alignItems:'center',
        justifyContent:'center',
        px:'1rem',
        py:'0.18rem',
        minHeight:'2rem',
        whiteSpace:'nowrap',
        flexShrink:0,
        textTransform:'none',
        ml:0
      }
    }
  },
  container:{
    minHeight:'100%',
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
        flexDirection:{xs:'column', md:'row'},
        alignItems:'flex-start',
        justifyContent:'space-between',
        display:'flex',
        px:'0',
        gap:'1rem',
        margin:'0'
      },
      leftColumn:{
        display:'flex',
        flexDirection:'column',
        width:{xs:'100%', md:'41%'},
        gap:'1rem',
        position:{xs:'static', md:'sticky'},
        top:'-1rem',
        alignSelf:'flex-start',
        minWidth:0
      },
      stickyProfileOverlay:{
        position:'absolute',
        top:0,
        left:0,
        right:0,
        zIndex:5,
        pointerEvents:'none',
        px:'0.2rem'
      },
      stickyProfileCard:{
        display:'flex',
        alignItems:'center',
        gap:'0.75rem',
        p:'0.6rem 0.75rem',
        borderRadius:'0.75rem',
        bgcolor:(t)=>(t.palette.mode === 'dark' ? 'rgba(12, 12, 12, 0.9)' : 'rgba(255, 255, 255, 0.92)'),
        border:(t)=>(`1px solid ${t.palette.mode === 'dark' ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)'}`),
        backdropFilter:'blur(6px)'
      },
      stickyProfileAvatar:{
        width:'2.25rem',
        height:'2.25rem'
      },
      stickyProfileMeta:{
        minWidth:0
      },
      stickyProfileName:{
        fontSize:'0.9rem',
        fontWeight:700,
        lineHeight:1.2,
        whiteSpace:'nowrap',
        overflow:'hidden',
        textOverflow:'ellipsis'
      },
      stickyProfileUsername:{
        fontSize:'0.8rem',
        color:'text.secondary',
        whiteSpace:'nowrap',
        overflow:'hidden',
        textOverflow:'ellipsis'
      },
      rightColumn:{
        width:{xs:'100%', md:'59%'},
        minWidth:0
      },
      surface:{
        width:'100%',
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
    },

    block:{
      modalSx:(t, fadeSlideIn) => ({
        mx: "auto",
        mt: "5rem",
        width: { xs: "92vw", sm: "26rem" },
        borderRadius: "1.25rem",
        overflow: "hidden",
        animation: `${fadeSlideIn} 0.25s cubic-bezier(.22,.68,0,1.2) both`,
        background:
          t.palette.mode === "dark"
            ? "#071120"
            : "linear-gradient(160deg,#ffffff 0%,#f5f5f8 100%)",
        border: `1px solid ${
          t.palette.mode === "dark"
            ? "rgba(255,255,255,0.07)"
            : "rgba(0,0,0,0.08)"
        }`,
        boxShadow: "0 32px 64px rgba(0,0,0,0.3)",
        p: 0,
        position: "relative",
      }),

      closeBtnSx:{
        position: "absolute",
        top: "1rem",
        right: "1rem",
        width: 32,
        height: 32,
        borderRadius: "50%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        bgcolor: "action.hover",
        transition: "background 0.15s, transform 0.15s",
        "&:hover": {
          bgcolor: "action.selected",
          transform: "scale(1.1)",
        },
      },
      bodySx:{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "1.25rem",
        px: "2rem",
        pt: "2rem",
        pb: "1.5rem",
      },
      avatarWrapperSx:{
        position: "relative",
      },
      avatarSx:{
        width: 72,
        height: 72,
        border: "3px solid",
        borderColor: "background.paper",
        boxShadow: "0 4px 16px rgba(0,0,0,0.2)",
      },
      blockIconWrapperSx:(pulse)=>({
        position: "absolute",
        bottom: -4,
        right: -4,
        width: 28,
        height: 28,
        borderRadius: "50%",
        bgcolor: "#ef4444",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        border: "2px solid",
        borderColor: "background.paper",
        animation: `${pulse} 2s ease-in-out infinite`,
      }),
      textWrapperSx:{
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        gap: "0.4rem",
      },
      titleSxL:{
        fontWeight: 700,
        fontSize: "1.1rem",
        lineHeight: 1.3,
      },
      descriptionSx:{
        color: "text.secondary",
        fontSize: "0.85rem",
        lineHeight: 1.6,
        maxWidth: "20rem",
      },
      dividerSx:{
        width: "100%",
        opacity: 0.5,
      },
      consequencesBoxSx:{
        width: "100%",
        bgcolor: "action.hover",
        borderRadius: "0.75rem",
        px: "1.25rem",
        py: "0.9rem",
        display: "flex",
        flexDirection: "column",
        gap: "0.5rem",
      },
      dotSx:{
        width: 6,
        height: 6,
        borderRadius: "50%",
        bgcolor: "#ef4444",
        flexShrink: 0,
      },
      consequenceTextSx: {
        fontSize: "0.82rem",
        color: "text.secondary",
      },
      actionsWrapperSx:{
        display: "flex",
        gap: "0.75rem",
        width: "100%",
        mt: "0.25rem",
      },
      cancelBtnSx:{
        borderRadius: "0.75rem",
        textTransform: "none",
        fontWeight: 500,
        py: "0.65rem",
        borderColor: "divider",
        color: "text.primary",
        "&:hover": { borderColor: "text.secondary" },
      },
      confirmBtnSx:{
        borderRadius: "0.75rem",
        textTransform: "none",
        fontWeight: 600,
        py: "0.65rem",
        background: "linear-gradient(135deg,#ef4444,#dc2626)",
        color: "#fff",
        boxShadow: "0 4px 14px rgba(239,68,68,0.4)",
        "&:hover": {
          background: "linear-gradient(135deg,#dc2626,#b91c1c)",
          boxShadow: "0 6px 20px rgba(239,68,68,0.5)",
          transform: "translateY(-1px)",
        },
        "&:active": { transform: "translateY(0)" },
        transition: "all 0.2s ease",
      },
      consequenceItemSx : {
        display: "flex",
        alignItems: "center",
        gap: "0.6rem",
      }
    }
  }
}
