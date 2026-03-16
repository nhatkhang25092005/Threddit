import { Button, CircularProgress } from "@mui/material";
import {
  CreatePostModalActionBar,
  CreatePostModalAuthor,
  CreatePostModalEditor,
} from "../../CreatePostModal/components";
import { useShareFormPanelData } from "../hooks";
import { style } from "../style";
import {
  SHARE_ACTION_BAR_LABEL,
  SHARE_EDITOR_PLACEHOLDER,
  SHARE_SUBMIT_LABEL,
} from "../utils";
import CreateSharePostPreview from "./CreateSharePostPreview";

const sx = style.modal;

export default function CreateSharePostFormPanel() {
  const {
    avatarUrl,
    canSubmit,
    displayName,
    handleOpenMentionList,
    handleSubmit,
    loading,
    mention,
  } = useShareFormPanelData();

  return (
    <>
      <CreatePostModalAuthor
        sx={sx}
        avatarUrl={avatarUrl}
        displayName={displayName}
      />

      <CreatePostModalEditor
        sx={sx}
        mention={mention}
        loading={loading}
        hasMedia={false}
        displayName={displayName}
        placeholder={SHARE_EDITOR_PLACEHOLDER}
        editorSx={sx.compactEditor}
      />
      
      <CreateSharePostPreview />

      <CreatePostModalActionBar
        sx={sx}
        mention={mention}
        onOpenMentionList={handleOpenMentionList}
        label={SHARE_ACTION_BAR_LABEL}
        showImageUpload={false}
        showVideoUpload={false}
        showSoundUpload={false}
      />

      <Button
        disabled={!canSubmit}
        variant="primary"
        fullWidth
        sx={sx.submitButton}
        onClick={handleSubmit}
      >
        {loading ? <CircularProgress size={20} color="inherit" /> : SHARE_SUBMIT_LABEL}
      </Button>
    </>
  );
}
