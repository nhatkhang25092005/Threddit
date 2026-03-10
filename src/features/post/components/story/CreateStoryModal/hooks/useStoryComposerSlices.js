import { STORY_LIMITS, STORY_MEDIA_KIND } from "../storyComposer";
import { useStoryComposerContext } from "./storyComposerContext";

export function useStoryPreviewData() {
  const {
    handleMediaMetadata,
    media,
    mode,
    playbackSeconds,
    sourceDurationSeconds,
    text,
  } = useStoryComposerContext();

  return {
    handleMediaMetadata,
    media,
    mode,
    playbackSeconds,
    sourceDurationSeconds,
    text,
  };
}

export function useStoryFormPanelData(onClose) {
  const {
    canSubmit,
    handleSubmit,
    media,
    loading,
    sourceDurationSeconds,
  } = useStoryComposerContext();

  return {
    canSubmit,
    handleSubmit : ()=>handleSubmit(onClose),
    media,
    loading,
    sourceDurationSeconds,
  };
}

export function useStoryTextEditorData() {
  const { handleOpenMentionList, mention, loading } = useStoryComposerContext();

  return {
    handleOpenMentionList,
    mention,
    loading,
    textLimit: STORY_LIMITS.textCharacters,
  };
}

export function useStoryMediaButtonsData() {
  const { handleOpenPicker, handleRemoveMedia, media, loading } = useStoryComposerContext();

  return {
    loading,
    activeMediaKind: media?.kind || STORY_MEDIA_KIND.NONE,
    handleOpenPicker,
    handleRemoveMedia,
    hasMedia: Boolean(media),
  };
}

export function useStoryMediaInputsData() {
  const { handleSelectMedia, inputRefsByKind } = useStoryComposerContext();

  return {
    handleSelectMedia,
    inputRefsByKind,
  };
}

export function useStoryMentionDialogData() {
  const { handleCloseMentionList, isMentionListOpen, mention } = useStoryComposerContext();

  return {
    handleCloseMentionList,
    isMentionListOpen,
    mention,
  };
}
