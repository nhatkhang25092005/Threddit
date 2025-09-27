import {Typography} from "@mui/material"
import Column from "../layout/Column"
export default function Notfound(){
    return(
    <Column>
        <Typography variant="h2" sx={{fontWeight:"bold"}}>
            404
        </Typography>
        <Typography variant="h5" sx={{whiteSpace: "pre-line", textAlign:"center",mt:"1rem", fontWeight:"bold"}}>Trang không tồn tại?{'\n'} Có vẻ như bạn đang bị lạc ~~</Typography>
    </Column>
    )
}