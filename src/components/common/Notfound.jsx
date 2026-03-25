import {Typography} from "@mui/material"
import { common } from "../../constant/text/vi/common.text"
import Column from "../layout/Column"
export default function Notfound(){
    return(
    <Column>
        <Typography variant="h2" sx={{fontWeight:"bold"}}>
            404
        </Typography>
        <Typography variant="h5" sx={{whiteSpace: "pre-line", textAlign:"center",mt:"1rem", fontWeight:"bold"}}>{common.notFound.title}{'\n'} {common.notFound.description}</Typography>
    </Column>
    )
}
