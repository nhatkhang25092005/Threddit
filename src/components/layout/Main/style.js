export const style = {
  logo:{
    marginTop:'0px'
  },
  bottom_navigation:{
    flexDirection: "column",
    width: "100%",
    height: "70%",
    alignItems:'flex-start',
    backgroundColor: "transparent",
    "& .MuiBottomNavigationAction-root": {
      minWidth: "auto",
      color: "#ffffffff",
      "& svg": {
        width: 40,
        minWidth: "auto",
        height: 40,
        minHeight: "auto",
        transition: "0.2s",
        fill: "white",
      },
      "&:hover svg": {
        color: "#fff",
        transform: "scale(1.5)",
      },
    },
    "& .Mui-selected": {
      bgcolor: "#bcbdbf39",
    },
  }
}