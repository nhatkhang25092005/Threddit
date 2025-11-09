import { Box, TextField, IconButton } from "@mui/material";
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import {CircularProgress} from "@mui/material";

export default function EditableContent({
    isEditing, 
    content, 
    editContent, 
    onEditChange, 
    onSave,
    onCancel,
    loading
}) {
    // If editing, show a text field with save and cancel buttons
    if (isEditing) {
        return (
            <Box>
                <TextField
                    multiline
                    fullWidth
                    minRows={3}
                    maxRows={10}
                    value={editContent}
                    onChange={(e)=>onEditChange(e.target.value)}
                    autoFocus
                    sx={{
                        '& ,MuiOutlinedInput-root': {
                            color:"white",
                            "& fieldset": { borderColor:"#bcbcbf" },
                            "&:hover fieldset": { borderColor:"white" },
                            "&.Mui-focused fieldset": { borderColor:"white" },
                        },
                    }}
                />
                <Box sx={{display:'flex', gap:1, justifyContent:"flex-end"}}>
                    {loading 
                    ? 
                        <CircularProgress size={24} sx={{alignSelf:"center"}}/>
                    :
                        <IconButton
                            onClick={onSave}
                            sx={{color:"#4CAF50"}}
                            size="small"
                        >
                            <CheckIcon/>
                        </IconButton>}
                    <IconButton
                        onClick={onCancel}
                        sx={{color:"#F44336"}}
                        size="small"
                    >
                        <CloseIcon/>
                    </IconButton>
                </Box>  
            </Box>
        )
    }
    // If not editing, just display the content
    return <Box display="flex" alignItems="center">{content}</Box>;
  
}