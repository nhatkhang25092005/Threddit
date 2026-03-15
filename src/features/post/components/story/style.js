export const style = {
  storyCard : {
    container:(story)=>({
      width: '6rem',
      aspectRatio: '9 / 16',
      height: '100%',
      flex: '0 0 auto',
      borderRadius: '0.85rem',
      overflow: 'hidden',
      position: 'relative',
      cursor: 'pointer',
      scrollSnapAlign: 'start',
      background: story?.gradient || 'linear-gradient(160deg, #4A5A6A 0%, #1B2735 100%)',
      border: '1px solid rgba(255,255,255,0.16)',
      boxShadow: '0 2px 10px rgba(0,0,0,0.22)',
      transform: 'translateZ(0)',
      transition: 'transform 0.2s ease, box-shadow 0.2s ease',
      '&:hover': {
        boxShadow: '0 6px 16px rgba(0,0,0,0.28)',
        transform: 'translateY(-2px)',
      },
    }),
    mediaWrap:(hasText)=>({
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      height: hasText ? '64%' : '100%',
      overflow: 'hidden',
    }),
    media:{
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      display: 'block',
      backgroundColor: '#111316',
    },
    audioPreview:{
      width: '100%',
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
      background:
        'linear-gradient(140deg, rgba(23,128,109,0.95) 0%, rgba(42,157,143,0.95) 48%, rgba(31,69,91,0.9) 100%)',
      '&::before': {
        content: '""',
        position: 'absolute',
        left: '18%',
        right: '18%',
        bottom: '22%',
        height: '0.34rem',
        borderRadius: '999rem',
        background:
          'repeating-linear-gradient(90deg, rgba(255,255,255,0.35) 0 7px, rgba(255,255,255,0.08) 7px 13px)',
      },
    },
    audioPreviewIcon:{
      color: '#ffffff',
      fontSize: { xs: '1.15rem', sm: '1.4rem' },
      filter: 'drop-shadow(0 3px 10px rgba(0,0,0,0.35))',
      zIndex: 1,
    },
    videoBadge:{
      position: 'absolute',
      top: '0.45rem',
      right: '0.45rem',
      width: { xs: '1.2rem', sm: '1.45rem' },
      height: { xs: '1.2rem', sm: '1.45rem' },
      borderRadius: '999rem',
      backgroundColor: 'rgba(0,0,0,0.55)',
      border: '1px solid rgba(255,255,255,0.45)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 2,
    },
    videoBadgeIcon:{
      fontSize: { xs: '0.86rem', sm: '1rem' },
      color: '#ffffff',
    },
    overlay:(hasMedia, hasText)=>({
      position: 'absolute',
      inset: 0,
      background: hasMedia
        ? (hasText
          ? 'linear-gradient(180deg, rgba(5,8,12,0.02) 28%, rgba(5,8,12,0.74) 100%)'
          : 'linear-gradient(180deg, rgba(0,0,0,0.08) 0%, rgba(0,0,0,0.36) 100%)')
        : 'linear-gradient(160deg, rgba(10,18,28,0.3) 0%, rgba(10,18,28,0.7) 100%)',
      zIndex: 1,
    }),
    typeBadge:{
      position: 'absolute',
      top: '0.34rem',
      left: '0.34rem',
      borderRadius: '999rem',
      px: '0.34rem',
      py: '0.14rem',
      display: 'inline-flex',
      alignItems: 'center',
      gap: '0.18rem',
      backgroundColor: 'rgba(0,0,0,0.48)',
      border: '1px solid rgba(255,255,255,0.36)',
      backdropFilter: 'blur(2px)',
      zIndex: 3,
    },
    typeBadgeIcon:{
      fontSize: { xs: '0.56rem', sm: '0.68rem' },
      color: '#ffffff',
    },
    typeBadgeText:{
      color: '#ffffff',
      fontSize: { xs: '0.45rem', sm: '0.52rem' },
      fontWeight: 700,
      textTransform: 'uppercase',
      letterSpacing: '0.02em',
      lineHeight: 1,
    },
    contentWrap:(hasMedia)=>({
      position: 'absolute',
      left: '0.5rem',
      right: '0.5rem',
      bottom: '0.42rem',
      top: hasMedia ? 'auto' : '1.85rem',
      zIndex: 3,
    }),
    text:(hasMedia)=>({
      color: '#ffffff',
      fontSize: { xs: '0.5rem', sm: '0.66rem' },
      fontWeight: 700,
      lineHeight: 1.28,
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      display: '-webkit-box',
      WebkitBoxOrient: 'vertical',
      WebkitLineClamp: hasMedia ? 3 : 6,
      textShadow: '0 2px 8px rgba(0,0,0,0.45)',
    })
  },

  pinnedStoryContainer:{
    surface:{
      width: '100%',
      p: '0.9rem',
    },
    title:{
      mb: '0.7rem',
      fontWeight: 700,
    },
    wrapper:{
      position: 'relative',
    },
    iconButton:(direction)=>({
      position: 'absolute',
      top: '50%',
      [direction]: '-0.55rem',
      transform: 'translateY(-50%)',
      zIndex: 5,
      width: '2rem',
      height: '2rem',
      border: '1px solid',
      borderColor: (theme) => (theme.palette.mode === 'dark' ? '#3A3B3C' : '#D0D7DE'),
      bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#242526' : '#ffffff'),
      boxShadow: '0 2px 10px rgba(0,0,0,0.22)',
      '&:hover': {
        bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#303233' : '#F7F9FB'),
      },
      '&.Mui-disabled': {
        opacity: 0,
        pointerEvents: 'none',
      },
    }),
    list:{
      py:'0.4rem',
      display: 'flex',
      gap: '0.65rem',
      overflowX: 'auto',
      overflowY: 'hidden',
      pb: '0.25rem',
      px: '0.15rem',
      scrollSnapType: 'x mandatory',
      '&::-webkit-scrollbar': {
        height: '0.35rem',
      },
      '&::-webkit-scrollbar-thumb': {
        borderRadius: '999rem',
        backgroundColor: (theme) => (theme.palette.mode === 'dark' ? '#4A4C4F' : '#CBD2D9'),
      },
    }
  },

  storyList:{
    root:{
      position:'fixed',
      inset:0,
      minHeight:'100dvh',
      height:'100dvh',
      zIndex:(theme)=>theme.zIndex.modal + 1,
      isolation:'isolate',
      overflow:'hidden',
      background:'radial-gradient(circle at top, rgba(92,148,255,0.16), transparent 36%), linear-gradient(180deg, #0A0C11 0%, #080A0F 100%)',
    },
    orb:(top, right, color)=>({
      position:'absolute',
      top,
      right,
      width:'24rem',
      height:'24rem',
      borderRadius:'999rem',
      background:color,
      filter:'blur(90px)',
      opacity:0.18,
      pointerEvents:'none',
    }),
    shell:{
      position:'relative',
      zIndex:1,
      width:'100%',
      minHeight:'100dvh',
      height:'100dvh',
      boxSizing:'border-box',
      display:'flex',
      flexDirection:'column',
      px:{
        xs:'0.4rem',
        sm:'0.7rem',
        md:'1rem'
      },
      py:{
        xs:'0.4rem',
        md:'0.7rem'
      },
    },
    friendSidebar:{
      position:'absolute',
      top:'1rem',
      left:'1rem',
      bottom:'1rem',
      zIndex:2,
      width:'15rem',
      display:{
        xs:'none',
        lg:'flex'
      },
      pointerEvents:'none',
    },
    friendSidebarCard:{
      width:'100%',
      height:'100%',
      pointerEvents:'auto',
      display:'flex',
      flexDirection:'column',
      gap:'0.4rem',
      p:'0.95rem',
      borderRadius:'1.4rem',
      border:'1px solid rgba(255,255,255,0.12)',
      background:'linear-gradient(180deg, rgba(12,16,24,0.86) 0%, rgba(8,10,15,0.94) 100%)',
      boxShadow:'0 28px 72px rgba(0,0,0,0.3)',
      backdropFilter:'blur(18px)',
      overflow:'hidden',
    },
    friendSidebarEyebrow:{
      color:'rgba(126,231,200,0.88)',
      fontSize:'0.7rem',
      fontWeight:800,
      lineHeight:1.1,
      letterSpacing:'0.08em',
      textTransform:'uppercase',
    },
    friendSidebarTitle:{
      color:'#F8FAFC',
      fontSize:'1.05rem',
      fontWeight:900,
      lineHeight:1.15,
    },
    friendSidebarSubtitle:{
      color:'rgba(226,232,240,0.68)',
      fontSize:'0.78rem',
      lineHeight:1.45,
    },
    friendSidebarList:{
      mt:'0.35rem',
      flex:1,
      minHeight:0,
      display:'flex',
      flexDirection:'column',
      gap:'0.55rem',
      overflowY:'auto',
      pr:'0.2rem',
      '&::-webkit-scrollbar':{
        width:'0.34rem',
      },
      '&::-webkit-scrollbar-thumb':{
        borderRadius:'999rem',
        backgroundColor:'rgba(255,255,255,0.18)',
      },
    },
    friendSidebarLoading:{
      minHeight:'5.5rem',
      display:'flex',
      flexDirection:'column',
      alignItems:'center',
      justifyContent:'center',
      gap:'0.7rem',
      borderRadius:'1rem',
      border:'1px solid rgba(255,255,255,0.1)',
      background:'rgba(255,255,255,0.04)',
    },
    friendSidebarLoadingText:{
      color:'rgba(226,232,240,0.74)',
      fontSize:'0.8rem',
      lineHeight:1.4,
    },
    friendSidebarItem:(isActive = false)=>({
      width:'100%',
      display:'flex',
      alignItems:'center',
      justifyContent:'space-between',
      gap:'0.7rem',
      p:'0.72rem',
      borderRadius:'1rem',
      border:'1px solid',
      borderColor:isActive ? 'rgba(126,231,200,0.4)' : 'rgba(255,255,255,0.08)',
      background:isActive
        ? 'linear-gradient(135deg, rgba(126,231,200,0.14) 0%, rgba(240,246,162,0.08) 100%)'
        : 'rgba(255,255,255,0.04)',
      textAlign:'left',
      transition:'transform 0.18s ease, border-color 0.18s ease, background-color 0.18s ease',
      '&:hover':{
        transform:'translateX(3px)',
        borderColor:isActive ? 'rgba(126,231,200,0.48)' : 'rgba(255,255,255,0.16)',
        background:isActive
          ? 'linear-gradient(135deg, rgba(126,231,200,0.18) 0%, rgba(240,246,162,0.1) 100%)'
          : 'rgba(255,255,255,0.07)',
      }
    }),
    friendSidebarAvatar:(isActive = false)=>({
      width:'2.9rem',
      height:'2.9rem',
      flexShrink:0,
      border:'2px solid',
      borderColor:isActive ? 'rgba(126,231,200,0.65)' : 'rgba(255,255,255,0.18)',
      boxShadow:isActive
        ? '0 0 0 4px rgba(126,231,200,0.12)'
        : '0 10px 18px rgba(0,0,0,0.18)',
    }),
    friendSidebarMeta:{
      flex:1,
      minWidth:0,
      display:'flex',
      flexDirection:'column',
      gap:'0.08rem',
    },
    friendSidebarName:{
      color:'#F8FAFC',
      fontSize:'0.84rem',
      fontWeight:800,
      lineHeight:1.25,
      whiteSpace:'nowrap',
      overflow:'hidden',
      textOverflow:'ellipsis',
    },
    friendSidebarUsername:{
      color:'rgba(226,232,240,0.7)',
      fontSize:'0.72rem',
      lineHeight:1.35,
      whiteSpace:'nowrap',
      overflow:'hidden',
      textOverflow:'ellipsis',
    },
    friendSidebarTime:{
      color:'rgba(226,232,240,0.56)',
      fontSize:'0.68rem',
      lineHeight:1.3,
    },
    friendSidebarBadgeWrap:{
      display:'flex',
      flexDirection:'column',
      alignItems:'center',
      gap:'0.32rem',
      flexShrink:0,
    },
    friendSidebarCountBadge:(isActive = false)=>({
      minWidth:'1.5rem',
      px:'0.28rem',
      py:'0.16rem',
      borderRadius:'999rem',
      backgroundColor:isActive ? 'rgba(126,231,200,0.18)' : 'rgba(255,255,255,0.08)',
      color:isActive ? '#7EE7C8' : '#F8FAFC',
      fontSize:'0.68rem',
      fontWeight:800,
      lineHeight:1,
      textAlign:'center',
    }),
    friendSidebarDot:(isActive = false)=>({
      fontSize:'0.78rem',
      color:isActive ? '#7EE7C8' : 'rgba(255,255,255,0.28)',
    }),
    header:{
      display:'flex',
      alignItems:{
        xs:'flex-start',
        md:'center'
      },
      justifyContent:'space-between',
      gap:'0.85rem',
      flexWrap:'nowrap',
      minWidth:0,
      flexShrink:0,
    },
    headerText:{
      minWidth:0,
      flex:1,
    },
    eyebrow:{
      color:'rgba(226,232,240,0.7)',
      fontSize:'0.78rem',
      fontWeight:800,
      lineHeight:1.1,
      letterSpacing:'0.08em',
      textTransform:'uppercase',
    },
    title:{
      mt:'0.3rem',
      color:'#F8FAFC',
      fontSize:{
        xs:'1.35rem',
        md:'1.8rem'
      },
      fontWeight:900,
      lineHeight:1.1,
    },
    subtitle:{
      mt:'0.28rem',
      color:'rgba(226,232,240,0.7)',
      fontSize:'0.92rem',
      lineHeight:1.45,
      display:{
        xs:'none',
        sm:'block'
      },
    },
    closeButton:{
      minWidth:'unset',
      px:'0.9rem',
      py:'0.58rem',
      borderRadius:'999rem',
      border:'1px solid rgba(255,255,255,0.16)',
      color:'#F8FAFC',
      backgroundColor:'rgba(255,255,255,0.06)',
      textTransform:'none',
      fontWeight:700,
      flexShrink:0,
      '&:hover':{
        backgroundColor:'rgba(255,255,255,0.12)',
      },
    },
    viewerWrap:{
      flex:1,
      width:'100%',
      height:'100%',
      display:'flex',
      alignItems:'center',
      justifyContent:'center',
      minHeight:0,
      overflow:'hidden',
    },
    emptyState:{
      width:'100%',
      maxWidth:'32rem',
      mx:'auto',
      p:{
        xs:'1.2rem',
        md:'1.6rem'
      },
      borderRadius:'1.4rem',
      border:'1px solid rgba(255,255,255,0.12)',
      background:'rgba(12,16,24,0.8)',
      textAlign:'center',
      boxShadow:'0 28px 80px rgba(0,0,0,0.28)',
    },
    emptyTitle:{
      color:'#F8FAFC',
      fontSize:'1.18rem',
      fontWeight:800,
      lineHeight:1.2,
    },
    emptyText:{
      mt:'0.6rem',
      color:'rgba(226,232,240,0.72)',
      fontSize:'0.92rem',
      lineHeight:1.55,
    },
    thumbRail:{
      display:'flex',
      gap:{
        xs:'0.5rem',
        sm:'0.65rem'
      },
      overflowX:'auto',
      overflowY:'hidden',
      py:'0.1rem',
      px:{
        xs:'0.05rem',
        md:'0.12rem'
      },
      mx:'auto',
      width:'min(100%, 48rem)',
      minWidth:0,
      flexShrink:0,
      '&::-webkit-scrollbar':{
        height:'0.4rem',
      },
      '&::-webkit-scrollbar-thumb':{
        borderRadius:'999rem',
        backgroundColor:'rgba(255,255,255,0.22)',
      },
    },
  },

  createStoryModal:{
    modal:{
      surface:{
        mx:'auto',
        my:{
          xs:'0.5rem',
          sm:'1rem',
          md:'1.5rem'
        },
        width:{
          xs:'calc(100vw - 1rem)',
          md:'min(58rem, calc(100vw - 2rem))'
        },
        maxWidth:'58rem',
        maxHeight:{
          xs:'calc(100dvh - 1rem)',
          md:'calc(100dvh - 3rem)'
        },
        p:0,
        overflow:'hidden',
        display:'flex',
        flexDirection:'column',
        borderRadius:'0.5rem',
        border:'solid 1px #b0b0b0',
        background:(theme)=>theme.palette.mode === 'dark'
          ? 'linear-gradient(180deg, #17191C 0%, #111315 100%)'
          : 'linear-gradient(180deg, #FFFFFF 0%, #F6F8FB 100%)',
        boxShadow:(theme)=>theme.palette.mode === 'dark'
          ? '0 24px 70px rgba(0,0,0,0.48)'
          : '0 24px 70px rgba(15,23,42,0.18)'
      },
      divider:{
        borderColor:(theme)=>theme.palette.mode === 'dark' ? '#2B2F34' : '#E5EAF0'
      },
      content:{
        display:'grid',
        gridTemplateColumns:{
          xs:'1fr',
          md:'minmax(0, 23rem) minmax(0, 1fr)'
        },
        gap:'1rem',
        width:'100%',
        maxWidth:'100%',
        p:{
          xs:'1rem',
          md:'1.1rem'
        },
        overflowX:'hidden',
        overflowY:'auto',
        minHeight:0,
        '& > *':{
          minWidth:0,
          maxWidth:'100%'
        },
        '&::-webkit-scrollbar':{
          width:'0.38rem'
        },
        '&::-webkit-scrollbar-thumb':{
          borderRadius:'999rem',
          backgroundColor:(theme)=>theme.palette.mode === 'dark' ? '#454A52' : '#CCD4DE'
        }
      }
    },
    header:{
      container:{
        position:'relative',
        display:'flex',
        alignItems:'center',
        justifyContent:'space-between',
        gap:'1rem',
        px:{
          xs:'1rem',
          md:'1.2rem'
        },
        py:'0.95rem'
      },
      textWrap:{
        display:'flex',
        flexDirection:'column',
        gap:'0.18rem'
      },
      title:{
        fontSize:{
          xs:'1.05rem',
          md:'1.2rem'
        },
        fontWeight:800,
        lineHeight:1.2
      },
      subtitle:{
        fontSize:'0.82rem',
        lineHeight:1.35,
        color:(theme)=>theme.palette.mode === 'dark' ? '#A7B0BC' : '#657284'
      },
      closeButton:{
        width:'2.3rem',
        height:'2.3rem',
        flexShrink:0,
        border:'1px solid',
        borderColor:(theme)=>theme.palette.mode === 'dark' ? '#36393E' : '#DBE1E8',
        backgroundColor:(theme)=>theme.palette.mode === 'dark' ? '#23262B' : '#F3F5F7',
        '&:hover':{
          backgroundColor:(theme)=>theme.palette.mode === 'dark' ? '#2D3138' : '#E9EDF2'
        }
      },
      closeIcon:{
        fontSize:'1.15rem',
        color:(theme)=>theme.palette.mode === 'dark' ? '#F5F7FA' : '#18212C'
      }
    },
    preview:{
      column:{
        display:'flex',
        flexDirection:'column',
        gap:'0.85rem',
      },
      panel:{
        display:'flex',
        flexDirection:'column',
        gap:'0.85rem',
        p:{
          xs:'0.9rem',
          md:'1rem'
        },
        width:'100%',
        
        borderRadius:'0.95rem',
      },
      sectionEyebrow:{
        fontSize:'0.74rem',
        fontWeight:800,
        lineHeight:1.1,
        textTransform:'uppercase',
        letterSpacing:'0.08em',
        color:(theme)=>theme.palette.mode === 'dark' ? '#8FA1B5' : '#55708D'
      },
      metaRow:{
        display:'flex',
        flexWrap:'wrap',
        gap:'0.45rem'
      },
      metaPill:{
        display:'inline-flex',
        alignItems:'center',
        gap:'0.35rem',
        px:'0.65rem',
        py:'0.38rem',
        borderRadius:'999rem',
        fontSize:'0.76rem',
        fontWeight:700,
        lineHeight:1,
        border:'1px solid',
        borderColor:(theme)=>theme.palette.mode === 'dark' ? '#3A4048' : '#D3DDE8',
        backgroundColor:(theme)=>theme.palette.mode === 'dark' ? 'rgba(49,54,61,0.72)' : 'rgba(255,255,255,0.8)'
      },
      stage:{
        display:'flex',
        justifyContent:'center',
        
      },
      phone:{
        width:'100%',
        maxWidth:{
          xs:'17.5rem',
          sm:'18.5rem'
        },
        display:'flex',
        flexDirection:'column',
        gap:'0.75rem'
      },
      canvasWrap:{
        position:'relative',
        p:'0.25rem',
        borderRadius:'1.55rem',
        background:(theme)=>theme.palette.mode === 'dark'
          ? 'linear-gradient(160deg, #E7EDF4 0%, #C9D4E0 100%)'
          : 'linear-gradient(160deg, #20252B 0%, #0E1012 100%)',
        boxShadow:(theme)=>theme.palette.mode === 'dark'
          ? '0 18px 40px rgba(0,0,0,0.42)'
          : '0 18px 40px rgba(27,39,51,0.16)'
      },
      canvas:{
        position:'relative',
        width:'100%',
        aspectRatio:'9 / 16',
        overflow:'hidden',
        borderRadius:'1.3rem',
        backgroundColor:'#0A0B0B',
        border:'1px solid rgba(255,255,255,0.08)'
      },
      playbackControls:{
        display:'flex',
        alignItems:'center',
        gap:'0.7rem',
        p:'0.55rem 0.7rem',
        px:'2rem',
        borderRadius:'2rem',
        border:'1px solid',
        borderColor:(theme)=>theme.palette.mode === 'dark' ? '#2E3238' : '#DCE3EB',
        backgroundColor:(theme)=>theme.palette.mode === 'dark' ? 'rgba(18,20,24,0.92)' : 'rgba(255,255,255,0.94)',
        boxShadow:(theme)=>theme.palette.mode === 'dark'
          ? '0 8px 18px rgba(0,0,0,0.2)'
          : '0 8px 18px rgba(27,39,51,0.08)'
      },
      playbackToggle:{
        width:'2.05rem',
        height:'2.05rem',
        flexShrink:0,
        border:'1px solid',
        borderColor:(theme)=>theme.palette.mode === 'dark' ? '#39414C' : '#D8E0EA',
        backgroundColor:(theme)=>theme.palette.mode === 'dark' ? '#20252C' : '#F5F8FC',
        color:(theme)=>theme.palette.mode === 'dark' ? '#F5F7FA' : '#18212C',
        '&:hover':{
          backgroundColor:(theme)=>theme.palette.mode === 'dark' ? '#29303A' : '#EDF2F8'
        }
      },
      playbackTimeline:{
        flex:1,
        minWidth:0
      },
      playbackSlider:{
        px:'0.05rem',
        color:'#ffffff',
        my:'-10px',
        '& .MuiSlider-thumb':{
          width:'0.72rem',
          height:'0.72rem',
          boxShadow:'0 0 0 4px rgba(94,139,255,0.12)'
        },
        '& .MuiSlider-rail':{
          opacity:1,
          backgroundColor:(theme)=>theme.palette.mode === 'dark' ? '#2E3641' : '#D3DBE5'
        },
        '& .MuiSlider-track':{
          border:'none'
        }
      },
      playbackTimeRow:{
        mt:'0.24rem',
        display:'flex',
        justifyContent:'space-between',
        gap:'0.6rem'
      },
      playbackTimeValue:{
        fontSize:'0.72rem',
        lineHeight:1.25,
        color:(theme)=>theme.palette.mode === 'dark' ? '#8FA1B5' : '#61798F'
      },
      media:{
        width:'100%',
        height:'100%',
        objectFit:'cover',
        display:'block'
      },
      placeholder:{
        position:'absolute',
        inset:0,
        display:'flex',
        flexDirection:'column',
        alignItems:'center',
        justifyContent:'center',
        gap:'0.8rem',
        px:'1.2rem',
        textAlign:'center',
        background:'radial-gradient(circle at top, rgba(120,134,153,0.16), transparent 46%), #0A0B0B'
      },
      placeholderIcon:{
        width:'3.25rem',
        height:'3.25rem',
        borderRadius:'1rem',
        display:'grid',
        placeItems:'center',
        border:'1px solid rgba(255,255,255,0.12)',
        background:'rgba(255,255,255,0.06)',
        color:'#F6F7F8'
      },
      placeholderText:{
        color:'#F6F7F8',
        fontSize:'0.92rem',
        fontWeight:700,
        lineHeight:1.4
      },
      canvasText:{
        position:'absolute',
        inset:0,
        display:'flex',
        alignItems:'center',
        justifyContent:'center',
        textAlign:'center',
        px:'1.2rem',
        py:'1.5rem',
        color:'#FFFFFF',
        fontSize:{
          xs:'1.12rem',
          sm:'1.25rem'
        },
        fontWeight:800,
        lineHeight:1.45,
        whiteSpace:'pre-wrap',
        wordBreak:'break-word'
      },
      audioCanvas:{
        position:'absolute',
        inset:0,
        display:'flex',
        flexDirection:'column',
        alignItems:'center',
        justifyContent:'center',
        gap:'0.9rem',
        px:'1.25rem',
        color:'#FFFFFF',
        textAlign:'center',
        background:'radial-gradient(circle at top, rgba(63,109,100,0.34), transparent 44%), #0A0B0B'
      },
      audioIconWrap:{
        width:'4rem',
        height:'4rem',
        borderRadius:'1.2rem',
        display:'grid',
        placeItems:'center',
        border:'1px solid rgba(255,255,255,0.14)',
        background:'linear-gradient(145deg, rgba(255,255,255,0.12), rgba(255,255,255,0.04))'
      },
      audioCanvasTitle:{
        fontSize:'1rem',
        fontWeight:800,
        lineHeight:1.3
      },
      audioCanvasSubtitle:{
        fontSize:'0.84rem',
        lineHeight:1.45,
        color:'rgba(255,255,255,0.72)'
      },
      textModeIcon:{
        position:'absolute',
        top:'1rem',
        left:'50%',
        transform:'translateX(-50%)',
        color:'rgba(255,255,255,0.6)'
      },
      belowText:{
        p:'0.85rem 0.9rem',
        borderRadius:'0.9rem',
        border:'1px solid',
        borderColor:(theme)=>theme.palette.mode === 'dark' ? '#2E3238' : '#DCE3EB',
        backgroundColor:(theme)=>theme.palette.mode === 'dark' ? 'rgba(26,29,33,0.92)' : 'rgba(255,255,255,0.94)'
      },
      belowTextLabel:{
        fontSize:'0.72rem',
        fontWeight:800,
        lineHeight:1.1,
        textTransform:'uppercase',
        letterSpacing:'0.08em',
        color:(theme)=>theme.palette.mode === 'dark' ? '#85A3C2' : '#5F7895'
      },
      belowTextValue:{
        mt:'0.45rem',
        fontSize:'0.92rem',
        lineHeight:1.55,
        whiteSpace:'pre-wrap',
        wordBreak:'break-word'
      },
      soundPanel:{
        position:'relative',
        display:'flex',
        alignItems:'center',
        gap:'0.75rem',
        p:'0.85rem 0.9rem',
        borderRadius:'0.95rem',
        border:'1px solid',
        borderColor:(theme)=>theme.palette.mode === 'dark' ? '#274A42' : '#B9DED5',
        background:(theme)=>theme.palette.mode === 'dark'
          ? 'linear-gradient(140deg, rgba(18,42,37,0.92) 0%, rgba(15,31,28,0.96) 100%)'
          : 'linear-gradient(140deg, #E7F6F2 0%, #DDF1EB 100%)'
      },
      soundPanelIcon:{
        width:'2.55rem',
        height:'2.55rem',
        borderRadius:'0.85rem',
        display:'grid',
        placeItems:'center',
        backgroundColor:'rgba(67, 153, 127, 0.16)',
        color:(theme)=>theme.palette.mode === 'dark' ? '#8DE0C4' : '#1E7C63'
      },
      soundMeta:{
        minWidth:0,
        flex:1
      },
      soundTitle:{
        fontSize:'0.9rem',
        fontWeight:700,
        lineHeight:1.3,
        whiteSpace:'nowrap',
        overflow:'hidden',
        textOverflow:'ellipsis'
      },
      soundCaption:{
        mt:'0.2rem',
        fontSize:'0.8rem',
        lineHeight:1.35,
        color:(theme)=>theme.palette.mode === 'dark' ? '#A6CBBE' : '#3C6E61'
      },
      soundWave:{
        width:'4.4rem',
        height:'1.8rem',
        borderRadius:'999rem',
        background:'repeating-linear-gradient(90deg, rgba(67,153,127,0.9) 0 4px, rgba(67,153,127,0.24) 4px 8px)',
        opacity:0.9
      },
    },
    formPanel:{
      column:{
        display:'flex',
        flexDirection:'column',
        gap:'0.9rem',
        width:'100%',
        minWidth:0,
        maxWidth:'100%'
      },
      panel:{
        display:'flex',
        flexDirection:'column',
        gap:'0.85rem',
        width:'100%',
        minWidth:0,
        maxWidth:'100%',
        overflowX:'hidden',
        borderRadius:'0.95rem',
      },
      textEditor:{
        container:{
          display:'flex',
          flexDirection:'column',
          gap:'0.75rem'
        },
        title:{
          fontWeight:'bold'
        },
        toolbar:{
          display:'flex',
          flexDirection:{
            xs:'column',
            sm:'row'
          },
          alignItems:{
            xs:'stretch',
            sm:'center'
          },
          justifyContent:'space-between',
          gap:'0.75rem'
        },
        toolbarLabel:{
          fontSize:'0.72rem',
          fontWeight:800,
          lineHeight:1.1,
          textTransform:'uppercase',
          letterSpacing:'0.08em',
          color:(theme)=>theme.palette.mode === 'dark' ? '#8FA1B5' : '#55708D'
        },
        actionList:{
          display:'flex',
          alignItems:'center',
          gap:'0.5rem',
          flexShrink:0
        },
        actionButton:{
          width:'2.45rem',
          height:'2.45rem',
          borderRadius:'0.8rem',
          border:'1px solid',
          borderColor:(theme)=>theme.palette.mode === 'dark' ? '#343942' : '#D6DEE8',
          backgroundColor:(theme)=>theme.palette.mode === 'dark' ? '#181B20' : '#F8FAFC',
          '&:hover':{
            backgroundColor:(theme)=>theme.palette.mode === 'dark' ? '#232831' : '#EFF3F8'
          }
        },
        tagIcon:{
          color:'#5E8BFF',
          fontSize:'1.25rem'
        },
        emojiAction:{
          width:'2.45rem',
          height:'2.45rem',
          display:'flex',
          alignItems:'center',
          justifyContent:'center',
          borderRadius:'0.8rem',
          border:'1px solid',
          borderColor:(theme)=>theme.palette.mode === 'dark' ? '#343942' : '#D6DEE8',
          backgroundColor:(theme)=>theme.palette.mode === 'dark' ? '#181B20' : '#F8FAFC',
          cursor:'pointer',
          '&:hover':{
            backgroundColor:(theme)=>theme.palette.mode === 'dark' ? '#232831' : '#EFF3F8'
          },
        },
        editorWrap:{
          position:'relative',
          overflow:'visible',
          borderRadius:'0.95rem',
          border:'1px solid',
          borderColor:(theme)=>theme.palette.mode === 'dark' ? '#333840' : '#D7E0EA',
          backgroundColor:(theme)=>theme.palette.mode === 'dark' ? '#111316' : '#F7F9FC',
          transition:'border-color 0.2s ease, box-shadow 0.2s ease',
          '&:focus-within':{
            borderColor:'#5E8BFF',
            boxShadow:'0 0 0 3px rgba(94,139,255,0.12)'
          }
        },
        editor:{
          width:'100%',
          minHeight:'7.3rem',
          resize:'none',
          border:'none',
          outline:'none',
          overflow:'hidden',
          display:'block',
          padding:'0.95rem',
          margin:0,
          backgroundColor:'transparent',
          color:'inherit',
          fontFamily:'inherit',
          fontSize:'0.97rem',
          lineHeight:1.55,
          '&::placeholder':{
            color:(theme)=>theme.palette.mode === 'dark' ? '#98A4B3' : '#6E7D90',
            opacity:1
          }
        },
        helperText:{
          fontSize:'0.83rem',
          lineHeight:1.45,
          color:(theme)=>theme.palette.mode === 'dark' ? '#A7B0BC' : '#617184'
        },
        helperRow:{
          display:'flex',
          flexWrap:'wrap',
          justifyContent:'flex-end',
          alignItems:'center',
          gap:'0.75rem'
        },
        counter:{
          flexShrink:0,
          fontSize:'0.78rem',
          lineHeight:1.2,
          color:(theme)=>theme.palette.mode === 'dark' ? '#8E99A8' : '#6A788B'
        }
      },
      infoGrid:{
        display:'grid',
        gridTemplateColumns:{
          xs:'1fr',
          sm:'repeat(3, minmax(0, 1fr))'
        },
        gap:'0.65rem'
      },
      fileSummary:{
        display:'flex',
        alignItems:'center',
        gap:'0.75rem',
        width:'100%',
        p:'0.8rem 0.9rem',
        overflow:'hidden',
        minWidth:0,
        borderRadius:'0.9rem',
        border:'1px solid',
        borderColor:(theme)=>theme.palette.mode === 'dark' ? '#30353C' : '#DAE2EA',
        backgroundColor:(theme)=>theme.palette.mode === 'dark' ? '#121519' : '#F8FAFD'
      },
      fileSummaryIcon:{
        width:'2.5rem',
        height:'2.5rem',
        borderRadius:'0.8rem',
        display:'grid',
        placeItems:'center',
        flexShrink:0,
        backgroundColor:(theme)=>theme.palette.mode === 'dark' ? '#1D2430' : '#EAF1F8'
      },
      fileSummaryMeta:{
        flex:1,
        minWidth:0,
        maxWidth:'100%',
        overflow:'hidden',
      },
      fileSummaryTitle:{
        display:'block',
        maxWidth:'100%',
        overflow:'hidden',
        fontSize:'0.9rem',
        fontWeight:700,
        lineHeight:1.3,
        whiteSpace:'nowrap',
        textOverflow:'ellipsis'
      },
      fileSummaryCaption:{
        mt:'0.2rem',
        display:'block',
        maxWidth:'100%',
        fontSize:'0.8rem',
        lineHeight:1.45,
        overflow:'hidden',
        whiteSpace:'nowrap',
        textOverflow:'ellipsis',
        color:(theme)=>theme.palette.mode === 'dark' ? '#9CA6B4' : '#6F7E90'
      },
      footer:{
        display:'flex',
        flexDirection:{
          xs:'column-reverse',
          sm:'row'
        },
        mx:'auto',
        justifyContent:'space-between',
        alignItems:{
          xs:'stretch',
          sm:'center'
        },
        width:'100%',
        gap:'0.75rem'
      },
      footerNote:{
        fontSize:'0.8rem',
        lineHeight:1.4,
        color:(theme)=>theme.palette.mode === 'dark' ? '#8E99A8' : '#6A788B'
      },
      actionRow:{
        display:'flex',
        gap:'0.6rem',
        width:'100%',
        px:'3rem'
      },
      secondaryButton:{
        flex:1,
        width:'100%',
        minHeight:'2.55rem',
        px:'1rem',
        borderRadius:'0.75rem',
        fontWeight:700,
        textTransform:'none',
        border:'1px solid',
        borderColor:(theme)=>theme.palette.mode === 'dark' ? '#373C44' : '#D6DEE8',
        color:(theme)=>theme.palette.mode === 'dark' ? '#EEF2F7' : '#18212C',
        backgroundColor:(theme)=>theme.palette.mode === 'dark' ? '#1A1E23' : '#F8FAFC',
        '&:hover':{
          backgroundColor:(theme)=>theme.palette.mode === 'dark' ? '#232831' : '#EFF3F8'
        }
      },
      primaryButton:{
        flex:1,
        width:'100%',
        minHeight:'2.55rem',
        px:'1.1rem',
        borderRadius:'0.75rem',
        fontWeight:800,
        textTransform:'none',
        boxShadow:'none',
      }
    },
    mediaButtons:{
      container:{
        display:'flex',
        flexDirection:'column',
        gap:'0.65rem'
      },
      mediaButtons:{
        display:'flex',
        flexDirection:'row',
        gap:'1rem'
      },
      actionCard:(state, accent)=>({
        width:'100%',
        textAlign:'left',
        borderRadius:'0.95rem',
        border:'1px solid',
        borderColor: state.isRemove
          ? 'rgba(220, 83, 72, 0.44)'
          : (state.isActive ? accent : ((theme)=>theme.palette.mode === 'dark' ? '#31363D' : '#D8E0EA')),
        background: state.isRemove
          ? 'linear-gradient(180deg, rgba(78,22,22,0.45) 0%, rgba(38,14,14,0.56) 100%)'
          : (state.isActive
            ? `linear-gradient(180deg, ${accent}20 0%, ${accent}10 100%)`
            : ((theme)=>theme.palette.mode === 'dark'
              ? 'linear-gradient(180deg, #171A1E 0%, #121417 100%)'
              : 'linear-gradient(180deg, #FFFFFF 0%, #F6F8FB 100%)')),
        opacity: state.isDisabled ? 0.48 : 1,
        cursor: state.isDisabled ? 'not-allowed' : 'pointer',
        transition:'transform 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease',
        '&:hover': state.isDisabled ? {} : {
          transform:'translateY(-2px)',
          boxShadow:'0 12px 22px rgba(16,24,40,0.14)'
        }
      }),
      actionInner:{
        display:'flex',
        flexDirection:'column',
        gap:'0.75rem',
        p:'0.9rem'
      },
      actionTop:{
        display:'flex',
        alignItems:'flex-start',
        justifyContent:'space-between',
        gap:'0.6rem'
      },
      actionIconWrap:(state, accent)=>({
        width:'2.6rem',
        height:'2.6rem',
        borderRadius:'0.88rem',
        display:'grid',
        placeItems:'center',
        color: state.isRemove ? '#F5B7B1' : accent,
        backgroundColor: state.isRemove ? 'rgba(220, 83, 72, 0.16)' : `${accent}18`,
        border:'1px solid',
        borderColor: state.isRemove ? 'rgba(220, 83, 72, 0.22)' : `${accent}30`
      }),
      actionTitle:{
        fontSize:'0.92rem',
        fontWeight:700,
        lineHeight:1.25
      },
      actionCaption:{
        fontSize:'0.78rem',
        lineHeight:1.45,
        color:(theme)=>theme.palette.mode === 'dark' ? '#A4AEBA' : '#6B7B8F'
      },
      actionBadge:(state)=>({
        flexShrink:0,
        px:'0.5rem',
        py:'0.22rem',
        borderRadius:'999rem',
        fontSize:'0.68rem',
        fontWeight:800,
        lineHeight:1,
        textTransform:'uppercase',
        letterSpacing:'0.06em',
        color: state.isRemove ? '#FFD8D3' : (state.isActive ? '#D6E6FF' : '#7B8898'),
        backgroundColor: state.isRemove
          ? 'rgba(220, 83, 72, 0.22)'
          : (state.isActive ? 'rgba(94, 139, 255, 0.2)' : 'rgba(124, 140, 158, 0.12)')
      })
    }
  }
}
