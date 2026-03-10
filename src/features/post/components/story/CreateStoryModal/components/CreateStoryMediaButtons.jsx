import { Box, ButtonBase, Typography } from "@mui/material";
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";
import { useStoryMediaButtonsData } from "../hooks";
import { getMediaActionStatusLabel, STORY_MEDIA_ACTIONS } from "../utils";
import { style } from "../../style";
import { story } from "../../../../../../constant/text/vi/story";
const FORM_TEXT = story.createStoryModal.formPanel
const sx = style.createStoryModal.mediaButtons;

export default function CreateStoryMediaButtons() {
  const {
    activeMediaKind,
    handleOpenPicker,
    handleRemoveMedia,
    hasMedia,
    loading,
  } = useStoryMediaButtonsData();

  return (
    <Box sx={sx.container}>
      <Typography fontWeight='bold'>{FORM_TEXT.media.eyebrow}</Typography>
      <Box sx={sx.mediaButtons}>
        {STORY_MEDIA_ACTIONS.map((item) => {
          const isActive = activeMediaKind === item.kind;
          const isDisabled = hasMedia && !isActive || loading;
          const isRemove = hasMedia && isActive;
          const Icon = isRemove ? DeleteOutlineRoundedIcon : item.Icon;
          const cardState = { isActive, isDisabled, isRemove };

          return (
            <ButtonBase
              key={item.kind}
              disabled={isDisabled}
              onClick={() => (isRemove ? handleRemoveMedia() : handleOpenPicker(item.kind))}
              sx={sx.actionCard(cardState, item.accent)}
            >
              <Box sx={sx.actionInner}>
                <Box sx={sx.actionTop}>
                  <Box sx={sx.actionIconWrap(cardState, item.accent)}>
                    <Icon fontSize="small" />
                  </Box>

                  <Box component="span" sx={sx.actionBadge(cardState)}>
                    {getMediaActionStatusLabel(cardState)}
                  </Box>
                </Box>

                <Box>
                  <Typography sx={sx.actionTitle}>
                    {isRemove ? item.removeLabel : item.label}
                  </Typography>
                  <Typography sx={sx.actionCaption}>{item.caption}</Typography>
                </Box>
              </Box>
            </ButtonBase>
          );
        })}
      </Box>
    </Box>
  );
}
