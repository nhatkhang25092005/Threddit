export const buttonTheme = {
  styleOverrides: {
    contained: {
      backgroundColor: "#fff", 
      color:"#0A0B0B",
      height:"50px",
      fontWeight:"bold"
    },

    text:{
      color:"#fff",
      "&:hover":{
        backgroundColor:"inherit",
      },
      height:'50px',
    }
  },

  variants:[
    {
      props:{variant:"interact"},
      style:{
        borderRadius:"50px",
        backgroundColor:"#302F30",
        "&:hover":{
          backgroundColor:"#1b1b1bff"
        }
      }
    },
    {
      props:{variant:"darker"},
      style:{
        backgroundColor:"#8c8c8cff",
        height:"50px",
        fontWeight:"bold"
      }
    },
    {
      props:{variant:"text"},
      style:{
        fontWeight:"bold",
        textTransform:"none",
        boxShadow:"none",
        padding: 0, 
        color:'white',
        minWidth: "auto", 
        "&:hover": {
          color:"white",
          textDecoration: "underline", 
        },
        "&:active": {
          color:'white'
        },
        "& .MuiTouchRipple-root": {
          display: "none", 
          backgroundColor:"none"
        }
      }
    }
  ]
};
