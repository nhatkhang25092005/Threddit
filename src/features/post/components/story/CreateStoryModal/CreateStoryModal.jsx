import { Box, Divider } from "@mui/material";
import Surface from "../../../../../components/common/Surface";
import { style } from "../style";
import { CreateStoryComposerProvider } from "./hooks";
import {
  CreateStoryFormPanel,
  CreateStoryMediaInputs,
  CreateStoryMentionDialog,
  CreateStoryModalHeader,
  CreateStoryPreview,
} from "./components"

const sx = style.createStoryModal;

export default function CreateStoryModal({ onClose }) {
  return (
    <Surface variant="modal" sx={sx.modal.surface}>
      <CreateStoryComposerProvider>
        <CreateStoryModalHeader onClose={onClose} />
        <Divider sx={sx.modal.divider} />

        <Box sx={sx.modal.content}>
          <CreateStoryPreview />
          <CreateStoryFormPanel onClose={onClose} />
        </Box>

        <CreateStoryMediaInputs />
        <CreateStoryMentionDialog />
      </CreateStoryComposerProvider>
    </Surface>
  );
}
