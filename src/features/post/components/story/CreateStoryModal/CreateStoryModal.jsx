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

export default function CreateStoryModal({
  onClose,
  composerOptions = undefined,
  headerTitle = undefined,
  headerSubtitle = undefined,
  closeAriaLabel = undefined,
  submitLabel = undefined,
  closeLabel = undefined,
}) {
  return (
    <Surface variant="modal" sx={sx.modal.surface}>
      <CreateStoryComposerProvider options={composerOptions}>
        <CreateStoryModalHeader
          onClose={onClose}
          title={headerTitle}
          subtitle={headerSubtitle}
          closeAriaLabel={closeAriaLabel}
        />
        <Divider sx={sx.modal.divider} />

        <Box sx={sx.modal.content}>
          <CreateStoryPreview />
          <CreateStoryFormPanel
            onClose={onClose}
            submitLabel={submitLabel}
            closeLabel={closeLabel}
          />
        </Box>

        <CreateStoryMediaInputs />
        <CreateStoryMentionDialog />
      </CreateStoryComposerProvider>
    </Surface>
  );
}
