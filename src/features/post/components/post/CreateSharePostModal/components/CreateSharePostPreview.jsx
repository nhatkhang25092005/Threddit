import { Box } from "@mui/material";
import SharedPostPreviewCard from "../../SharePost/SharedPostPreviewCard";
import { resolveSharedPost } from "../../SharePost/sharedPost.utils";
import { useSharePreviewData } from "../hooks";
import { style } from "../style";

const sx = style;

export default function CreateSharePostPreview() {
  const { post } = useSharePreviewData();
  const previewPost = resolveSharedPost(post) ?? post;

  return (
    <Box sx={sx.modal.previewWrap}>
      <SharedPostPreviewCard post={previewPost} sx={sx.preview} />
    </Box>
  );
}
