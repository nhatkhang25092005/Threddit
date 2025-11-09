import {Box, Button, Typography} from "@mui/material"
import NorthIcon from '@mui/icons-material/North';
import SouthIcon from '@mui/icons-material/South';
export default function ArrowButton ({data,sx}){
    return(
        <Box sx={{
            display:"flex", 
            flexDirection:"row",
            gap:"3px",
            height:"100%",
            width:"100%",
            bgcolor:"#302F30",
            px:"auto",
            alignItems:"center",
            justifyContent:"center",
            borderRadius:"50px",
            cursor:"pointer",
            "&:hover":{
                backgroundColor:"#1b1b1bff"
            },
            ...sx}}>
            <NorthIcon/>
            <Typography>{data}</Typography>
            <SouthIcon/>
        </Box>
    )
}