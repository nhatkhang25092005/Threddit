export const style = {
  createPostComponent:{
    surface:{
      width:'100%',
      display:'flex',
      pb:'1rem',
      flexDirection:'row',
      gap:'1rem',
      alignItems:'flex-start'
    },
    avatar:{
      width:'3rem',
      height:'3rem'
    },
    textField:{
      "& .MuiInputBase-root": {
        height: '2rem',
        borderRadius:'999rem',
        bgcolor:'#ffffff35'
      },
      "& .MuiInputBase-input": {
        cursor: "pointer",
      }
    },
    container_1:{
      display:'flex',
      flexDirection:'column',
      width:'100%',
      gap:'0.3rem',
      alignItems:'center'
    },
    container_2:{
      display:'flex',
      flexDirection:'row',
      width:'100%',
      gap:'0.3rem',
      alignItems:'center',
      justifyContent:'flex-start'
    },
    icon:{
      width:'1rem',
      height:'1rem'
    },
    actionIconButton:{
      width:'2rem',
      height:'2rem',
      p:0
    }
  },
  createPostModal:{
    surface:{
      mx:'auto',
      my:{
        xs:'0.5rem',
        sm:'1rem',
        md:'2rem'
      },
      width:{
        xs:'calc(100vw - 1rem)',
        sm:'31.25rem'
      },
      maxWidth:'31.25rem',
      maxHeight:{
        xs:'calc(100dvh - 1rem)',
        sm:'calc(100dvh - 2rem)',
        md:'calc(100dvh - 4rem)'
      },
      padding:0,
      borderRadius:'0.9rem',
      display:'flex',
      flexDirection:'column',
      overflow:'hidden'
    },
    header:{
      position:'relative',
      display:'flex',
      alignItems:'center',
      justifyContent:'center',
      minHeight:'3.75rem',
      padding:'0 1rem'
    },
    headerTitle:{
      fontWeight:700,
      fontSize:'1.2rem',
      lineHeight:1.2
    },
    closeButton:{
      position:'absolute',
      right:'0.8rem',
      top:'50%',
      transform:'translateY(-50%)',
      width:'2.25rem',
      height:'2.25rem',
      backgroundColor:(theme)=>theme.palette.mode === 'dark' ? '#3A3B3C' : '#E4E6EB',
      '&:hover':{
        backgroundColor:(theme)=>theme.palette.mode === 'dark' ? '#4E4F50' : '#D8DADF'
      }
    },
    closeIcon:{
      fontSize:'1.25rem',
      color:(theme)=>theme.palette.mode === 'dark' ? '#E4E6EB' : '#1C1E21'
    },
    divider:{
      borderColor:(theme)=>theme.palette.mode === 'dark' ? '#3E4042' : '#DADDE1'
    },
    body:{
      padding:'1rem',
      display:'flex',
      flexDirection:'column',
      gap:'0.9rem',
      
      flex:'1 1 auto',
      minHeight:0,
      overflowY:'auto',
      overflowX:'hidden',
      overscrollBehavior:'contain',
      '&::-webkit-scrollbar':{
        width:'0.4rem'
      },
      '&::-webkit-scrollbar-thumb':{
        borderRadius:'999rem',
        backgroundColor:(theme)=>theme.palette.mode === 'dark' ? '#acacac' : '#CED0D4'
      }
    },
    authorRow:{
      display:'flex',
      alignItems:'flex-start',
      gap:'0.75rem'
    },
    avatar:{
      width:'2.5rem',
      height:'2.5rem'
    },
    authorMeta:{
      display:'flex',
      flexDirection:'column',
      gap:'0.35rem',
      alignItems:'flex-start'
    },
    authorName:{
      fontWeight:600,
      fontSize:'0.95rem',
      lineHeight:1.2
    },
    audienceButton:{
      minWidth:'unset',
      borderRadius:'0.45rem',
      padding:'0.15rem 0.45rem',
      color:(theme)=>theme.palette.mode === 'dark' ? '#E4E6EB' : '#050505',
      backgroundColor:(theme)=>theme.palette.mode === 'dark' ? '#3A3B3C' : '#E4E6EB',
      border:'1px solid',
      borderColor:(theme)=>theme.palette.mode === 'dark' ? '#4E4F50' : '#DADDE1',
      fontWeight:600,
      fontSize:'0.75rem',
      lineHeight:1.2,
      textTransform:'none',
      '&:hover':{
        backgroundColor:(theme)=>theme.palette.mode === 'dark' ? '#4E4F50' : '#D8DADF'
      },
      '& .MuiButton-startIcon, & .MuiButton-endIcon':{
        margin:0
      },
      '& .MuiButton-startIcon':{
        marginRight:'0.25rem'
      },
      '& .MuiButton-endIcon':{
        marginLeft:'0.15rem'
      }
    },
    audienceIcon:{
      fontSize:'0.95rem'
    },
    audienceArrow:{
      fontSize:'0.95rem'
    },
    editor:(isHaveImage)=>({
      width:'100%',
      minHeight:isHaveImage ?'3rem' :'10rem',
      resize:'none',
      border:'none',
      outline:'none',
      overflow:'hidden',
      padding:0,
      margin:0,
      backgroundColor:'transparent',
      color:'inherit',
      fontFamily:'inherit',
      fontSize: isHaveImage ? '1.0rem' : '1.5rem',
      lineHeight:1.35,
      '&::placeholder':{
        color:(theme)=>theme.palette.mode === 'dark' ? '#B0B3B8' : '#65676B',
        opacity:1
      },
      '&::-webkit-scrollbar':{
        width:'0.35rem'
      },
      '&::-webkit-scrollbar-thumb':{
        borderRadius:'999rem',
        backgroundColor:(theme)=>theme.palette.mode === 'dark' ? '#4E4F50' : '#CED0D4'
      }
    }),
    addToPostContainer:{
      display:'flex',
      alignItems:'center',
      justifyContent:'space-between',
      gap:'0.75rem',
      padding:'0.4rem 0.65rem',
      border:'1px solid',
      borderColor:(theme)=>theme.palette.mode === 'dark' ? '#3E4042' : '#DADDE1',
      borderRadius:'0.65rem',
      boxShadow:(theme)=>theme.palette.mode === 'dark'
        ? '0 1px 2px rgba(255,255,255,0.05)'
        : '0 1px 2px rgba(0,0,0,0.08)'
    },
    addToPostLabel:{
      fontSize:'0.9rem',
      fontWeight:600,
      lineHeight:1.2
    },
    actionList:{
      display:'flex',
      alignItems:'center',
      gap:'0.15rem',
      flexWrap:'wrap',
      justifyContent:'flex-end'
    },
    actionIconButton:{
      display:'flex',
      alignItems:'center',
      width:'2rem',
      height:'2rem'
    },
    emojiPopoverPaper:{
      borderRadius:'0.8rem',
      zIndex:1400,
      border:'1px solid',
      borderColor:(theme)=>theme.palette.mode === 'dark' ? '#3E4042' : '#DADDE1',
      boxShadow:(theme)=>theme.palette.mode === 'dark'
        ? '0 10px 28px rgba(0,0,0,0.45)'
        : '0 10px 28px rgba(0,0,0,0.14)',
      backgroundColor:(theme)=>theme.palette.mode === 'dark' ? '#242526' : '#ffffff',
      overflow:'visible'
    },
    emojiPicker:{
      width:'18rem',
      maxWidth:'calc(100vw - 2rem)',
      padding:'0.65rem'
    },
    emojiPickerTitle:{
      fontSize:'0.8rem',
      fontWeight:700,
      lineHeight:1.2,
      mb:'0.45rem',
      color:(theme)=>theme.palette.mode === 'dark' ? '#E4E6EB' : '#1C1E21'
    },
    emojiGrid:{
      display:'grid',
      gridTemplateColumns:'repeat(8, minmax(0, 1fr))',
      gap:'0.2rem'
    },
    emojiButton:{
      width:'2rem',
      height:'2rem',
      borderRadius:'0.45rem',
      '&:hover':{
        backgroundColor:(theme)=>theme.palette.mode === 'dark' ? '#3A3B3C' : '#F2F3F5'
      }
    },
    emojiChar:{
      fontSize:'1.15rem',
      lineHeight:1
    },
    photoIcon:{
      color:'#45BD62',
      fontSize:'1.35rem'
    },
    tagIcon:{
      color:'#1877F2',
      fontSize:'1.35rem'
    },
    locationIcon:{
      color:'#F5533D',
      fontSize:'1.35rem'
    },
    gifIcon:{
      color:'#8E44FF',
      fontSize:'1.35rem'
    },
    moreIcon:{
      color:(theme)=>theme.palette.mode === 'dark' ? '#B0B3B8' : '#65676B',
      fontSize:'1.35rem'
    },
    submitButton:{
      marginTop:'0.1rem',
      minHeight:'2.25rem',
      borderRadius:'0.5rem',
      fontWeight:700,
      textTransform:'none',
      boxShadow:'none',
      '&:hover':{
        bgcolor:'rgb(218, 218, 218)',
        boxShadow:'none'
      }
    },
    img:{
      width: "100%",
      maxHeight: "20rem",
      objectFit: "cover",
      borderRadius: "0.6rem",
      mt: "0.75rem",
      border: "1px solid",
      borderColor: (theme) =>
        theme.palette.mode === "dark" ? "#3E4042" : "#DADDE1",
    }
  },
  post: {
    card: {
      width: "100%",
      maxWidth: "42rem",
      padding: 0,
      overflow: "hidden",
      my: "1rem",
    },
    section: {
      px: "1rem",
    },
    header: {
      py: "0.8rem",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      gap: "0.65rem",
    },
    authorWrap: {
      display: "flex",
      alignItems: "center",
      gap: "0.65rem",
      minWidth: 0,
      flex: 1,
    },
    avatar: {
      width: "2.5rem",
      height: "2.5rem",
    },
    authorMeta: {
      display: "flex",
      flexDirection: "column",
      minWidth: 0,
    },
    authorName: {
      fontSize: "0.95rem",
      fontWeight: 700,
      lineHeight: 1.2,
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis",
    },
    subMeta: {
      mt: "0.15rem",
      display: "flex",
      alignItems: "center",
      gap: "0.35rem",
      color: (theme) => (theme.palette.mode === "dark" ? "#B0B3B8" : "#65676B"),
      fontSize: "0.78rem",
      lineHeight: 1.1,
    },
    text: {
      pb: "0.7rem",
      whiteSpace: "pre-wrap",
      wordBreak: "break-word",
      lineHeight: 1.45,
      fontSize: "0.97rem",
    },
    media:{
      mediaBlock: {
        width: "100%",
        my: "0.2rem",
        overflow: "hidden",
      },
      mediaGrid: (count) => ({
        width: "100%",
        display: "grid",
        gap: "2px",
        height:'100%',
        gridTemplateColumns: count === 1 ? "1fr" : "repeat(2, minmax(0, 1fr))",
        gridAutoRows: count === 1
          ? "auto"
          : {
              xs: "7.3rem",
              sm: "9.8rem",
              md: "12rem",
            },
      }),
      videoPlayOverlay:{
        position:'absolute',
        top:'50%',
        cursor:'pointer',
        transition:'transform 0.2s ease',
        "&:hover": {
          transform: "translate(-50%, -50%) scale(1.15)"
        },
        left:'50%',
        transform:'translate(-50%, -50%)'
      },
      mediaTile: (count, index) => ({
        position: "relative",
        overflow: "hidden",

        backgroundColor: "#000000",
        ...(count === 1 && {
          height: "100%",
          // maxHeight: {
          //   xs: "21rem",
          //   sm: "30rem",
          // },
        }),
        ...(count === 2 && {
          width:'100%',
          
        }),
        ...(count === 3 && index === 0 && {
          gridRow: "1 / span 2",
        }),
        ...((count === 3 && index > 0) || count >= 4
          ? {
              aspectRatio: "1/1",
              height:'100%',
              width:'100%',
              objectFit:'cover'
            }
          : {}),
      }),
      mediaElement: {
        display: "block",
        width: "100%",
        height: "100%",
        objectFit: "cover",
        position:'relative',
        backgroundColor: "#000000",
      },
      mediaMoreOverlay: {
        position: "absolute",
        inset: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "rgba(0,0,0,0.55)",
        backdropFilter: "blur(1px)",
        zIndex: 2,
      },
      mediaMoreText: {
        color: "#ffffff",
        fontWeight: 700,
        fontSize: {
          xs: "1.5rem",
          sm: "2rem",
        },
        lineHeight: 1,
        textShadow: "0 2px 8px rgba(0,0,0,0.5)",
      },
      audioList: {
        display: "flex",
        flexDirection: "column",
        gap: "0.35rem",
        py: "0.4rem",
        px: "0.4rem",
      },
      audioMedia: {
        display: "block",
        width: "100%",
        height: "2.35rem",
        borderRadius: "999rem",
        bgcolor:'white',
        border:(t)=> t.palette.mode==='dark'
          ? 'solid white 1px'
          : 'solid black 1px'
      },
    },
    stats: {
      py: "0.55rem",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      color: (theme) => (theme.palette.mode === "dark" ? "#B0B3B8" : "#65676B"),
      fontSize: "0.86rem",
    },
    reactWrap: {
      display: "flex",
      alignItems: "center",
      gap: "0.35rem",
    },
    reactIcon: {
      fontSize: "1rem",
      color: "#1877F2",
    },
    statsRight: {
      display: "flex",
      alignItems: "center",
      gap: "0.75rem",
    },
    actionsRow: {
      py: "0.2rem",
      display: "grid",
      gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
      gap: "0.25rem",
    },
  },
  loadingGetPost:{
    list:{
      width:'100%',
      display:'flex',
      flexDirection:'column',
      gap:'1rem',
      mt:'1rem'
    },
    card:{
      position:'relative',
      width:'100%',
      maxWidth:'42rem',
      borderRadius:'0.95rem',
      overflow:'hidden',
      border:'1px solid',
      borderColor:(theme)=>theme.palette.mode === 'dark' ? '#3E4042' : '#DADDE1',
      background:(theme)=>theme.palette.mode === 'dark'
        ? 'linear-gradient(140deg, #1C1D21 0%, #25272B 100%)'
        : 'linear-gradient(140deg, #FFFFFF 0%, #F7F9FC 100%)',
      boxShadow:(theme)=>theme.palette.mode === 'dark'
        ? '0 10px 22px rgba(0,0,0,0.22)'
        : '0 10px 22px rgba(27,39,51,0.08)',
      p:'0.9rem 1rem',
      '&::after':{
        content:'""',
        position:'absolute',
        top:0,
        left:'-40%',
        width:'40%',
        height:'100%',
        transform:'skewX(-12deg)',
        background:'linear-gradient(90deg, transparent, rgba(255,255,255,0.23), transparent)',
        animation:'loadingGetPostShimmer 1.75s ease-in-out infinite'
      },
      '@keyframes loadingGetPostShimmer':{
        '0%':{
          left:'-45%'
        },
        '100%':{
          left:'130%'
        }
      }
    },
    header:{
      display:'flex',
      alignItems:'center',
      gap:'0.75rem'
    },
    avatar:{
      width:'2.6rem',
      height:'2.6rem',
      flexShrink:0,
      bgcolor:(theme)=>theme.palette.mode === 'dark' ? '#3D4046' : '#D9DEE7'
    },
    authorMeta:{
      width:'100%',
      display:'flex',
      flexDirection:'column',
      gap:'0.2rem'
    },
    displayName:{
      width:'40%',
      minWidth:'8.5rem',
      height:'1rem',
      transform:'scale(1)',
      transformOrigin:'left',
      bgcolor:(theme)=>theme.palette.mode === 'dark' ? '#4A4F57' : '#DEE4ED'
    },
    subMeta:{
      width:'28%',
      minWidth:'5.2rem',
      height:'0.8rem',
      transform:'scale(1)',
      transformOrigin:'left',
      bgcolor:(theme)=>theme.palette.mode === 'dark' ? '#3B3F46' : '#E7EBF2'
    },
    body:{
      mt:'0.95rem',
      display:'grid',
      gap:'0.42rem'
    },
    lineWide:{
      height:'0.78rem',
      width:'96%',
      transform:'scale(1)',
      transformOrigin:'left',
      bgcolor:(theme)=>theme.palette.mode === 'dark' ? '#484D54' : '#E1E7F0'
    },
    lineMedium:{
      height:'0.78rem',
      width:'82%',
      transform:'scale(1)',
      transformOrigin:'left',
      bgcolor:(theme)=>theme.palette.mode === 'dark' ? '#434850' : '#E7ECF4'
    },
    lineShort:{
      height:'0.78rem',
      width:'57%',
      transform:'scale(1)',
      transformOrigin:'left',
      bgcolor:(theme)=>theme.palette.mode === 'dark' ? '#3F444B' : '#EDF1F7'
    },
    mediaWrap:{
      mt:'0.9rem',
      display:'grid',
      gap:'0.35rem',
      gridTemplateColumns:{
        xs:'1fr',
        sm:'1.5fr 1fr'
      },
      minHeight:{
        xs:'12rem',
        sm:'10.8rem'
      }
    },
    mediaMain:{
      width:'100%',
      height:{
        xs:'10rem',
        sm:'100%'
      },
      bgcolor:(theme)=>theme.palette.mode === 'dark' ? '#30343B' : '#E3E8F1'
    },
    mediaSide:{
      display:'grid',
      gridTemplateColumns:{
        xs:'repeat(2, minmax(0, 1fr))',
        sm:'1fr'
      },
      gap:'0.35rem',
      minHeight:{
        xs:'5rem',
        sm:'100%'
      }
    },
    mediaSub:{
      width:'100%',
      height:'100%',
      minHeight:{
        xs:'4.8rem',
        sm:'5rem'
      },
      bgcolor:(theme)=>theme.palette.mode === 'dark' ? '#3B4048' : '#E9EDF4'
    },
    reactionRow:{
      mt:'0.75rem',
      display:'flex',
      alignItems:'center',
      justifyContent:'space-between'
    },
    reactionLeft:{
      width:'26%',
      minWidth:'5rem',
      height:'0.72rem',
      transform:'scale(1)',
      transformOrigin:'left',
      bgcolor:(theme)=>theme.palette.mode === 'dark' ? '#49505A' : '#DDE4EE'
    },
    reactionRight:{
      width:'20%',
      minWidth:'3.4rem',
      height:'0.72rem',
      transform:'scale(1)',
      transformOrigin:'right',
      bgcolor:(theme)=>theme.palette.mode === 'dark' ? '#454C56' : '#E7ECF4'
    },
    actionRow:{
      mt:'0.75rem',
      borderTop:'1px solid',
      borderColor:(theme)=>theme.palette.mode === 'dark' ? '#3A3F46' : '#E3E7EE',
      pt:'0.65rem',
      display:'grid',
      gridTemplateColumns:'repeat(3, minmax(0, 1fr))',
      gap:'0.35rem'
    },
    actionItem:{
      width:'100%',
      height:'1.75rem',
      borderRadius:'0.55rem',
      bgcolor:(theme)=>theme.palette.mode === 'dark' ? '#343941' : '#E8ECF3'
    }
  },
  noPost:{
    wrapper:{
      position:'relative',
      width:'100%',
      maxWidth:'42rem',
      py:0,
      px:{
        xs:'0.3rem',
        sm:0
      }
    },
    glow:{
      position:'absolute',
      inset:'1.1rem 0.8rem',
      borderRadius:'1.25rem',
      filter:'blur(28px)',
      opacity:0.55,
      pointerEvents:'none',
      background:(theme)=>theme.palette.mode === 'dark'
        ? 'radial-gradient(circle at 35% 30%, rgba(43,121,255,0.35), transparent 58%), radial-gradient(circle at 75% 75%, rgba(77,214,160,0.28), transparent 60%)'
        : 'radial-gradient(circle at 35% 30%, rgba(43,121,255,0.22), transparent 58%), radial-gradient(circle at 75% 75%, rgba(33,178,130,0.18), transparent 60%)'
    },
    card:{
      position:'relative',
      zIndex:1,
      overflow:'hidden',
      borderRadius:'0.4rem',
      border:'1px solid',
      borderColor:(theme)=>theme.palette.mode === 'dark' ? '#3A3F46' : '#D7DEE8',
      background:(theme)=>theme.palette.mode === 'dark'
        ? 'linear-gradient(140deg, #1B1E22 0%, #23272D 100%)'
        : 'linear-gradient(140deg, #FFFFFF 0%, #F4F8FD 100%)',
      boxShadow:(theme)=>theme.palette.mode === 'dark'
        ? '0 14px 30px rgba(0,0,0,0.26)'
        : '0 12px 30px rgba(35,60,85,0.11)',
      display:'flex',
      flexDirection:'column',
      alignItems:'center',
      textAlign:'center',
      py:{
        xs:'1.5rem',
        sm:'1.9rem'
      },
      px:{
        xs:'1rem',
        sm:'1.35rem'
      },
      '&::before':{
        content:'""',
        position:'absolute',
        top:'-55%',
        left:'-22%',
        width:'58%',
        height:'220%',
        transform:'rotate(18deg)',
        pointerEvents:'none',
        background:'linear-gradient(90deg, transparent, rgba(255,255,255,0.22), transparent)',
        animation:'noPostShine 3.6s linear infinite'
      },
      '@keyframes noPostShine':{
        '0%':{
          transform:'translateX(-50%) rotate(18deg)'
        },
        '100%':{
          transform:'translateX(245%) rotate(18deg)'
        }
      }
    },
    iconWrap:{
      position:'relative',
      width:'4.3rem',
      height:'4.3rem',
      mb:'0.9rem'
    },
    iconBadge:{
      width:'100%',
      height:'100%',
      borderRadius:'1.1rem',
      display:'grid',
      placeItems:'center',
      border:'1px solid',
      borderColor:(theme)=>theme.palette.mode === 'dark' ? '#4A5360' : '#C7D7EA',
      background:(theme)=>theme.palette.mode === 'dark'
        ? 'linear-gradient(145deg, #5e6267 0%, #000000 100%)'
        : 'linear-gradient(145deg, #e7e7e7 0%, #ffffff 100%)',
      boxShadow:(theme)=>theme.palette.mode === 'dark'
        ? '0 8px 18px rgba(0,0,0,0.25)'
        : '0 8px 18px rgba(1, 1, 1, 0.2)'
    },
    mainIcon:{
      fontSize:'2rem',
      color:(theme)=>theme.palette.mode === 'dark' ? 'white' : 'black'
    },
    sparkleLeft:{
      position:'absolute',
      top:'-0.45rem',
      left:'-0.7rem',
      fontSize:'1.1rem',
      color:(theme)=>theme.palette.mode === 'dark' ? '#dcdcdc' : '#22282e',
      animation:'noPostSparkle 1.9s ease-in-out infinite'
    },
    sparkleRight:{
      position:'absolute',
      right:'-0.66rem',
      bottom:'-0.2rem',
      fontSize:'0.95rem',
      color:(theme)=>theme.palette.mode === 'dark' ? '#ffffff' : '#000000',
      animation:'noPostSparkle 1.9s ease-in-out infinite 0.5s'
    },
    '@keyframes noPostSparkle':{
      '0%':{
        transform:'translateY(0) scale(0.95)',
        opacity:0.7
      },
      '50%':{
        transform:'translateY(-0.28rem) scale(1.08)',
        opacity:1
      },
      '100%':{
        transform:'translateY(0) scale(0.95)',
        opacity:0.7
      }
    },
    title:{
      fontSize:{
        xs:'1.08rem',
        sm:'1.2rem'
      },
      fontWeight:800,
      lineHeight:1.2,
      letterSpacing:'0.01em',
      color:(theme)=>theme.palette.mode === 'dark' ? '#F1F5FA' : '#1E2B3B'
    },
    message:{
      mt:'0.5rem',
      maxWidth:'31rem',
      fontSize:{
        xs:'0.9rem',
        sm:'0.95rem'
      },
      lineHeight:1.5,
      color:(theme)=>theme.palette.mode === 'dark' ? '#AEB9C8' : '#5A6B80'
    }
  }
}
