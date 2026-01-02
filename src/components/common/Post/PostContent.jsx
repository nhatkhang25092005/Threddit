import { memo } from "react"
import EditableContent from "../EditableContent"
import { Box } from "@mui/material"

const contentStyle = {
    height:'100%'
}

const PostContent = memo(({
    content,
    isEditing,
    editContent,
    loading,
    onContentChange,
    onSave,
    onCancel
})=>{
    return(
        <Box sx={contentStyle}>
            <EditableContent
                loading={loading}
                isEditing={isEditing}
                content={content}
                editContent={editContent}
                onEditChange={onContentChange}
                onSave={onSave}
                onCancel={onCancel}
            />
        </Box>
    )
})

PostContent.displayName = 'PostContent'
export default PostContent