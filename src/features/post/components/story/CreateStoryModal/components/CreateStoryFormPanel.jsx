import { Box, Button, CircularProgress, Typography } from "@mui/material";
import { story } from "../../../../../../constant/text/vi/story";
import {
  STORY_DURATION_RULES,
  formatStoryDuration,
  isTimedStoryMedia,
} from "../storyComposer";
import { useStoryFormPanelData } from "../hooks";
import CreateStoryMediaButtons from "./CreateStoryMediaButtons";
import CreateStoryTextEditor from "./CreateStoryTextEditor";
import {
  STORY_DEFAULT_FILE_ICON,
  STORY_FILE_ICON_BY_KIND,
} from "../utils"
import { style } from "../../style";
import Surface from "../../../../../../components/common/Surface";

const FORM_TEXT = story.createStoryModal.formPanel;
const LOADING_DURATION_TEXT = story.createStoryModal.loadingDuration;
const sx = style.createStoryModal.formPanel;

export default function CreateStoryFormPanel({
  onClose,
  submitLabel = FORM_TEXT.footer.submitButton,
  closeLabel = FORM_TEXT.footer.closeButton,
}) {
  const {
    canSubmit,
    handleSubmit,
    media,
    loading,
    sourceDurationSeconds,
  } = useStoryFormPanelData(onClose)

  const sourceDurationLabel = isTimedStoryMedia(media?.kind)
    ? (sourceDurationSeconds ? formatStoryDuration(sourceDurationSeconds) : LOADING_DURATION_TEXT)
    : FORM_TEXT.fileSummary.staticSourceDuration(STORY_DURATION_RULES.staticSeconds);
  const SummaryIcon = STORY_FILE_ICON_BY_KIND[media?.kind] || STORY_DEFAULT_FILE_ICON;
  const mediaFileName = media?.file?.name || FORM_TEXT.fileSummary.defaultTitle;

  return (
    <Box sx={sx.column}>
      <Surface sx={sx.panel}>
        <CreateStoryTextEditor/>
        <CreateStoryMediaButtons/>

        {media ? (
          <Box sx={sx.fileSummary}>
            <Box sx={sx.fileSummaryIcon}>
              <SummaryIcon fontSize="small" />
            </Box>

            <Box sx={sx.fileSummaryMeta}>
              <Typography noWrap sx={sx.fileSummaryTitle} title={mediaFileName}>
                {mediaFileName}
              </Typography>
              <Typography noWrap sx={sx.fileSummaryCaption}>
                {media.contentType || media.file?.type || FORM_TEXT.fileSummary.unknownType}
                {isTimedStoryMedia(media.kind)
                  ? ` | ${FORM_TEXT.fileSummary.durationCaption(sourceDurationLabel)}`
                  : ` | ${FORM_TEXT.fileSummary.staticCaption}`}
              </Typography>
            </Box>
          </Box>
        ) : null}
      </Surface>

      <Box sx={sx.footer}>
        <Box sx={sx.actionRow}>
          <Button variant="secondary" sx={sx.secondaryButton} onClick={onClose}>
            {closeLabel}
          </Button>
          <Button
            disabled={!canSubmit || loading}
            variant="primary"
            sx={sx.primaryButton}
            onClick={handleSubmit}
          >
            {loading ? <CircularProgress size={20} color="inherit"/> : submitLabel}
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
