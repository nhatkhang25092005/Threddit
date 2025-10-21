import {Button, Typography} from "@mui/material"
import SmsOutlinedIcon from '@mui/icons-material/SmsOutlined';
export default function CommentButton({data,sx}){
    return(
    <Button variant="interact" sx={{display:"flex", flexDirection:"row", gap:"3px",...sx}}>
        <SmsOutlinedIcon/>
        <Typography>{data}</Typography>
    </Button>)
}