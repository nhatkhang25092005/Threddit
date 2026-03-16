import { Box, Divider } from "@mui/material";
import Surface from "../../../../../components/common/Surface";
import { CreatePostModalHeader } from "../CreatePostModal/components";
import {
  CreateSharePostCloseAlert,
  CreateSharePostFormPanel,
  CreateSharePostMentionDialog,
  CreateSharePostPreview,
} from "./components";
import { CreateShareComposerProvider, useShareHeaderData } from "./hooks";
import { style } from "./style";
import { SHARE_MODAL_TITLE } from "./utils";

const sx = style.modal;

function CreateSharePostModalContent() {
  const { handleAttemptClose } = useShareHeaderData();

  return (
    <Surface variant="modal" sx={sx.surface}>
      <CreatePostModalHeader sx={sx} onClose={handleAttemptClose} title={SHARE_MODAL_TITLE} />
      <Divider sx={sx.divider} />

      <Box sx={sx.content}>
        <CreateSharePostFormPanel />
      </Box>

      <CreateSharePostMentionDialog />
      <CreateSharePostCloseAlert />
    </Surface>
  );
}

export default function CreateSharePostModal({ onClose, postId }) {
  return (
    <CreateShareComposerProvider options={{ onClose, postId }}>
      <CreateSharePostModalContent />
    </CreateShareComposerProvider>
  );
}
