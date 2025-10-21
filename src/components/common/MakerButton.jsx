import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined';
import {Button, Typography} from "@mui/material"
export default function MakerButton({data, sx}){
    return(
        <Button variant='interact' sx={{display:"flex", flexDirection:"row", gap:"3px", ...sx}}>
            <BookmarkBorderOutlinedIcon/>
            <Typography>{data}</Typography>
        </Button>
    )
}