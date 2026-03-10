import { Box } from "@mui/material";
import { useStoryMediaInputsData } from "../hooks";
import { STORY_MEDIA_KIND } from "../storyComposer";
import { STORY_INPUT_ACCEPT } from "../utils";

const STORY_MEDIA_INPUT_KINDS = [STORY_MEDIA_KIND.IMAGE, STORY_MEDIA_KIND.VIDEO, STORY_MEDIA_KIND.SOUND];

export default function CreateStoryMediaInputs() {
  const { handleSelectMedia, inputRefsByKind } = useStoryMediaInputsData();

  return STORY_MEDIA_INPUT_KINDS.map((kind) => (
    <Box
      key={kind}
      component="input"
      ref={inputRefsByKind[kind]}
      type="file"
      accept={STORY_INPUT_ACCEPT[kind]}
      onChange={(event) => handleSelectMedia(kind, event)}
      sx={{ display: "none" }}
    />
  ));
}
