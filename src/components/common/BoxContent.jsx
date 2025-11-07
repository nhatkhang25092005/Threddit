import {Box} from "@mui/material"
/**
 * Used to Wrap block content inside a box with padding and border radius
 */
export default function BoxContent({children, customStyle, debug =false}) {
    const style = {
        border:"solid #A6A6A6 1px",
        borderRadius:"8px",
        px:"1rem",
        py:'2rem',
        width:"100%",
        ...customStyle,
        ...(debug && {border:"solid red 1px"})
    }
    return(<Box sx={style}>
        {children}
    </Box>)
}