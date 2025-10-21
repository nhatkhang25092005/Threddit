import {Button, Typography} from "@mui/material"
import NorthIcon from '@mui/icons-material/North';
import SouthIcon from '@mui/icons-material/South';
export default function ArrowButton ({data,sx}){
    return(
        <Button variant="interact" sx={{display:"flex", flexDirection:"row",gap:"3px",...sx}}>
            <NorthIcon/>
            <Typography>{data}</Typography>
            <SouthIcon/>
        </Button>
    )
}