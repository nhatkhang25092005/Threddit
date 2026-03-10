import { useLayoutEffect } from "react";
import { Box, IconButton, Typography } from "@mui/material";
import PersonAddAlt1RoundedIcon from "@mui/icons-material/PersonAddAlt1Rounded";
import Emoji from "../../../reaction/Emoji";
import { story } from "../../../../../../constant/text/vi/story";
import { style } from "../../style";
import { useStoryTextEditorData } from "../hooks";
import { resizeStoryTextarea } from "../utils";

const FORM_TEXT = story.createStoryModal.formPanel;
const sx = style.createStoryModal.formPanel.textEditor;

export default function CreateStoryTextEditor() {
  const {
    handleOpenMentionList,
    mention,
    textLimit,
    loading
  } = useStoryTextEditorData();
  const textLength = String(mention?.value || "").length;

  useLayoutEffect(() => {
    resizeStoryTextarea(mention?.bind?.ref?.current);
  }, [mention?.bind?.ref, mention?.value]);

  return (
    <Box sx={sx.container}>
      <Box sx={sx.toolbar}>

        <Typography sx={sx.title}>{FORM_TEXT.content.title}</Typography>

        <Box sx={sx.actionList}>
          <IconButton
            onClick={handleOpenMentionList}
            aria-label={FORM_TEXT.content.mentionButton}
            title={FORM_TEXT.content.mentionButton}
            sx={sx.actionButton}
            disabled = {loading}
          >
            <PersonAddAlt1RoundedIcon sx={sx.tagIcon} />
          </IconButton>

          <IconButton
            sx={sx.emojiAction}
            aria-label={FORM_TEXT.content.emojiButton}
            title={FORM_TEXT.content.emojiButton}
            disabled = {loading}
          >
            <Emoji mention={mention}/>
          </IconButton>
        </Box>
      </Box>

      <Box sx={sx.editorWrap}>
        <Box
          component="textarea"
          placeholder={FORM_TEXT.content.textareaPlaceholder}
          maxLength={textLimit}
          sx={sx.editor}
          {...mention?.bind}
          disabled={loading}
        />
        {mention?.overlay}
      </Box>

      <Box sx={sx.helperRow}>
        <Typography sx={sx.counter}>
          {textLength}/{textLimit}
        </Typography>
      </Box>
    </Box>
  );
}
