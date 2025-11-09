// Material
import { Box, Typography } from "@mui/material";
import PushPinIcon from "@mui/icons-material/PushPin";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import NorthIcon from "@mui/icons-material/North";
import SouthIcon from "@mui/icons-material/South";

// Custom
import BlockContent from "./BlockContent";
import OptionsMenu from "./OptionsMenu";
import ArrowButton from "./ArrowButton";
import CommentButton from "./CommentButton";
import MakerButton from "./MakerButton";
import ShareButton from "./ShareButton";
import EditableContent from "./EditableContent";

//
export default function Post({
  item,
  index,
  createdPostsLength,
  deletePost,
  startEditing,
  pinProps,
  editingPostId,
  editContent,
  setEditContent,
  saveEdit,
  cancelEditing,
  loading,
  adjustSavePostAfterUnsave = null,
  isOwner = false
}) {
  return (
    <BlockContent
      key={index}
      customStyle={{
        px: "1rem",
        ...(index === createdPostsLength - 1 ? { borderBottom: "none" } : undefined)
      }}

      // Header of content block
      header={
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyItems: "start",
            pb: "0px",
            gap: "1rem",
            alignItems: "center",
            mb: "1rem",
            py: "1rem",
            mx: "1rem",
          }}
        >
          <Typography variant="h6" fontWeight={"bold"}>
            {item.author.username}
          </Typography>
          <Typography variant="sub"> {item.createdAt}</Typography>
          {item.isPinned && <PushPinIcon sx={{ color: "#d9ff41ff" }} />}
          <OptionsMenu
            functionList={[
              (isOwner ? { label: "xóa", icon: <DeleteIcon />, callback: () => deletePost(item.id)} : undefined),
              (isOwner ? { label: "sửa", icon: <EditIcon />, callback: () => startEditing(item.id, item.content)}: undefined ),
              pinProps(item)
            ]}
            sx={{ ml: "auto" }}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
          />
        </Box>
      }

      // Footer of content block
      footer={
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            gap: "1rem",
            justifyItems: "start",
            mx: "1rem",
          }}
        >
          <OptionsMenu
            sx={{ borderRadius: "50px" }}
            symbol={<ArrowButton data={item.upvoteNumber - item.downvoteNumber} sx={{ width: "130px" }} />}
            functionList={[
              { label: "upvote", icon: (<NorthIcon />), callback: null },
              { label: "downvote", icon:(<SouthIcon />), callback: null},
            ]}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
            transformOrigin={{
              vertical: "left",
              horizontal: "right",
            }}
          />
          <CommentButton data={item.commentNumber} sx={{ width: "130px" }} />
          <MakerButton
            data={item.saveNumber}
            sx={{ width: "130px" }}
            marked={item.isSave ? true : false}
            postId={item.id}
            onClick = {adjustSavePostAfterUnsave ? ()=>adjustSavePostAfterUnsave(item.id) : undefined}
          />
          <ShareButton />
        </Box>
      }
      footerStyle={{
        py: "1rem",
        mb: "1rem",
        ...(index === createdPostsLength - 1
          ? { mb: "0", borderBottom: "None" }
          : { borderBottom: "solid #BCBDBF 1px" }),
      }}
    >
      <EditableContent
        loading={loading}
        isEditing={editingPostId === item.id}
        content={item.content}
        editContent={editContent}
        onEditChange={setEditContent}
        onSave={() => saveEdit(item.id)}
        onCancel={cancelEditing}
      />
    </BlockContent>
  );
}
